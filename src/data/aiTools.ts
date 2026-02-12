export interface AITool {
  name: string;
  description: string;
  url: string;
  category: string;
}

export const aiTools: AITool[] = [
  { name: "Levity.ai", description: "Workflow automation bot", url: "https://levity.ai", category: "Automation" },
  { name: "Jasper.ai", description: "AI content writer", url: "https://jasper.ai", category: "Writing" },
  { name: "Gamma.app", description: "Clean, modern slide creation", url: "https://gamma.app", category: "Presentation" },
  { name: "Magiceraser.io", description: "Remove unwanted objects", url: "https://magiceraser.io", category: "Image Editing" },
  { name: "Socratic.org", description: "Homework help & solutions", url: "https://socratic.org", category: "Education" },
  { name: "Hex.tech", description: "Data analysis workspace", url: "https://hex.tech", category: "Data" },
  { name: "DeepLearning (h1.nu)", description: "Learn multiple skills", url: "https://h1.nu/DeepLearning", category: "Education" },
  { name: "Summarize.tech", description: "Video summarization", url: "https://summarize.tech", category: "Productivity" },
  { name: "ElevenLabs.io", description: "Natural-sounding AI voices", url: "https://elevenlabs.io", category: "Audio" },
  { name: "OpusClip.com", description: "Automatic short-form clips", url: "https://opusclip.com", category: "Video" },
  { name: "Sloyd AI", description: "3D asset creator", url: "https://sloyd.ai", category: "3D Design" },
  { name: "Figstack.com", description: "Code explanation tool", url: "https://figstack.com", category: "Development" },
  { name: "Submagic.co", description: "Captions + emojis", url: "https://submagic.co", category: "Video" },
  { name: "Munch.com", description: "Video repurposing", url: "https://munch.com", category: "Video" },
  { name: "Supernormal.com", description: "Meeting notes", url: "https://supernormal.com", category: "Productivity" },
  { name: "Cleanup.pictures", description: "Remove objects from photos", url: "https://cleanup.pictures", category: "Image Editing" },
  { name: "Voice Generator (h1.nu)", description: "AI voice generator", url: "https://h1.nu/voicegenai", category: "Audio" },
  { name: "Vizard.ai", description: "Short-form video editor", url: "https://vizard.ai", category: "Video" },
  { name: "BrieflyAI.com", description: "Idea summarizer", url: "https://brieflyai.com", category: "Productivity" },
  { name: "Scribehow.com", description: "Auto tutorials", url: "https://scribehow.com", category: "Productivity" },
  { name: "Recraft.ai", description: "Vector design", url: "https://recraft.ai", category: "Design" },
  { name: "Kaiber.ai", description: "AI animations", url: "https://kaiber.ai", category: "Video" },
];
