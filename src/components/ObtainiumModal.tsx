import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import type { MorpheApp } from "@/hooks/useMorpheReleases";

interface ObtainiumModalProps {
  app: MorpheApp | null;
  owner: string;
  repo: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Obtainium matches asset filenames against this regex on every release —
// escape anything a real slug/variant could contain so it can't break out
// of the pattern (adapted from nullcpy.github.io's createObtainiumInstructions).
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildRegex = (slug: string, variant: string, arch?: string) => {
  const base = `^${escapeRegExp(slug)}-${escapeRegExp(variant)}-v.*`;
  const suffix = arch ? `-${escapeRegExp(arch)}` : "";
  return `${base}${suffix}\\.(apk|zip)$`;
};

const buildAddUrl = (config: Record<string, unknown>) =>
  `https://apps.obtainium.imranr.dev/redirect?r=${encodeURIComponent(
    "obtainium://app/" + JSON.stringify(config)
  )}`;

const CodeRow = ({
  code,
  onAdd,
  onCopy,
}: {
  code: string;
  onAdd?: string;
  onCopy: () => void;
}) => (
  <div className="flex flex-wrap items-center gap-2 mt-2 px-3 py-2 rounded-xl bg-muted/40 border-2 border-foreground/20">
    <code className="flex-1 min-w-[140px] text-xs break-all font-mono">{code}</code>
    {onAdd && (
      <a
        href={onAdd}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-bold border-2 border-foreground/80 shadow-pop-soft hover:-translate-y-0.5 transition-transform text-[11px] shrink-0"
      >
        <PlusCircle className="w-3 h-3" strokeWidth={2.5} />
        Add to Obtainium
      </a>
    )}
    <button
      type="button"
      onClick={onCopy}
      className="px-3 py-1.5 rounded-full bg-card text-foreground font-bold border-2 border-foreground/80 text-[11px] shrink-0 hover:-translate-y-0.5 transition-transform"
    >
      Copy
    </button>
  </div>
);

const ObtainiumModal = ({ app, owner, repo, open, onOpenChange }: ObtainiumModalProps) => {
  const [includePrereleases, setIncludePrereleases] = useState(false);

  const repoUrl = `https://github.com/${owner}/${repo}`;

  const archs = useMemo(() => {
    if (!app) return [];
    return Array.from(new Set(app.assets.map((a) => a.arch))).sort();
  }, [app]);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(label);
    } catch {
      toast.error("Could not copy — copy it manually");
    }
  };

  if (!app) return null;

  // Obtainium's "id" is just a unique key within the app, not a verified
  // Play Store package ID — we don't maintain a package-ID map for this
  // catalog, so a stable slug-based ID is enough for Obtainium to track it.
  const safeId = `${owner}_${app.slug}_${app.variant}`.replace(/[^a-zA-Z0-9_]/g, "_");
  const mainRegex = buildRegex(app.slug, app.variant);
  const mainConfig = {
    id: safeId,
    name: `${app.displayName} (${app.variant})`,
    author: owner,
    url: repoUrl,
    additionalSettings: JSON.stringify({
      apkFilterRegEx: mainRegex,
      ...(includePrereleases ? { includePrereleases: true } : {}),
    }),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-2 border-foreground/80 rounded-2xl shadow-pop">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Install {app.displayName} with Obtainium
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm space-y-4">
          <p className="text-muted-foreground">
            Obtainium tracks this GitHub repo directly, so you get new Morphe
            builds the moment they're published — no manual re-download.
            Don't have it yet?{" "}
            <a
              href="https://github.com/ImranR98/Obtainium/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-wavy underline-offset-4 inline-flex items-center gap-1"
            >
              Get it on GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </p>

          <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={includePrereleases}
              onChange={(e) => setIncludePrereleases(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            Include beta / pre-release builds
          </label>

          <div>
            <p className="font-bold">Fastest way — one tap:</p>
            <CodeRow
              code={mainConfig.name}
              onAdd={buildAddUrl(mainConfig)}
              onCopy={() => copy(mainRegex, "Regex copied!")}
            />
          </div>

          {archs.length > 1 && (
            <div>
              <p className="font-bold">Only want one architecture?</p>
              {archs.map((arch) => {
                const regex = buildRegex(app.slug, app.variant, arch);
                const config = {
                  ...mainConfig,
                  id: `${safeId}_${arch}`.replace(/[^a-zA-Z0-9_]/g, "_"),
                  name: `${app.displayName} (${app.variant} · ${arch})`,
                  additionalSettings: JSON.stringify({
                    apkFilterRegEx: regex,
                    ...(includePrereleases ? { includePrereleases: true } : {}),
                  }),
                };
                return (
                  <div key={arch}>
                    <p className="text-xs font-bold text-muted-foreground mt-3">{arch}</p>
                    <CodeRow
                      code={regex}
                      onAdd={buildAddUrl(config)}
                      onCopy={() => copy(regex, "Regex copied!")}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <p className="font-bold">Or add it manually:</p>
            <ol className="list-decimal list-inside space-y-1.5 mt-2 text-muted-foreground">
              <li>Open Obtainium and tap <strong className="text-foreground">Add App</strong>.</li>
              <li>
                Paste the repository URL:
                <CodeRow code={repoUrl} onCopy={() => copy(repoUrl, "Repository URL copied!")} />
              </li>
              <li>
                Under <strong className="text-foreground">Filter APKs by regular expression</strong>, paste:
                <CodeRow code={mainRegex} onCopy={() => copy(mainRegex, "Regex copied!")} />
              </li>
              <li>
                To get beta updates, enable <strong className="text-foreground">Include Pre-releases</strong> in the app's settings inside Obtainium.
              </li>
              <li>Tap <strong className="text-foreground">Add</strong> — future Morphe builds land automatically.</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ObtainiumModal;
