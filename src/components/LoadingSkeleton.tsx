import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  type: "course" | "resource";
  count?: number;
}

const LoadingSkeleton = ({ type, count = 6 }: LoadingSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="glass-heavy rounded-2xl overflow-hidden animate-pulse"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Image skeleton */}
          <Skeleton className="h-48 w-full bg-muted/50" />
          
          <div className="p-6 space-y-4">
            {/* Category badge skeleton */}
            <Skeleton className="h-6 w-20 rounded-full bg-muted/50" />
            
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4 bg-muted/50" />
            
            {/* Description skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-muted/40" />
              <Skeleton className="h-4 w-5/6 bg-muted/40" />
            </div>
            
            {type === "course" && (
              /* Duration and students skeleton */
              <div className="flex gap-4">
                <Skeleton className="h-5 w-24 bg-muted/30" />
                <Skeleton className="h-5 w-20 bg-muted/30" />
              </div>
            )}
            
            {/* Button skeleton */}
            <Skeleton className="h-10 w-full rounded-lg bg-primary/20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
