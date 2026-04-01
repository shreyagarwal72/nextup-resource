export interface AITool {
  name: string;
  description: string;
  url: string;
  category: string;
}

export const aiTools: AITool[] = [
  // Image Generation
  { name: "Adobe Firefly 3", description: "AI-powered creative image generation by Adobe", url: "https://firefly.adobe.com", category: "Image Generation" },
  { name: "MidJourney V7", description: "Premium AI art & image generation", url: "https://www.midjourney.com", category: "Image Generation" },
  { name: "Stable Diffusion 3.5", description: "Open-source AI image generation", url: "https://stablediffusionweb.com", category: "Image Generation" },
  { name: "Leonardo AI", description: "AI image generation platform", url: "https://leonardo.ai", category: "Image Generation" },
  { name: "Ideogram 3.0", description: "AI image generation with text rendering", url: "https://ideogram.ai", category: "Image Generation" },
  { name: "FLUX.1", description: "Next-gen AI image model", url: "https://www.fluxai.com", category: "Image Generation" },
  { name: "Reve Image", description: "AI image generation & editing", url: "https://www.reveai.com", category: "Image Generation" },
  { name: "Recraft V3", description: "Vector design & AI image creation", url: "https://www.recraft.ai", category: "Image Generation" },
  { name: "Freepik AI", description: "AI-powered design & image generation", url: "https://www.freepik.com/ai", category: "Image Generation" },
  { name: "Imagen 4 (Google)", description: "Google's advanced AI image model", url: "https://imagen.research.google", category: "Image Generation" },

  // Text-to-Speech / Voice AI
  { name: "ElevenLabs", description: "Natural-sounding AI voices", url: "https://www.elevenlabs.io", category: "Voice AI" },
  { name: "Murf.AI", description: "AI voice generator for professionals", url: "https://www.murf.ai", category: "Voice AI" },
  { name: "FreeTTS", description: "Free text-to-speech online", url: "https://freetts.com", category: "Voice AI" },
  { name: "Uberduck", description: "AI voice synthesis & music", url: "https://uberduck.ai", category: "Voice AI" },
  { name: "OpenVoice AI", description: "Open-source voice cloning", url: "https://openvoice.tech", category: "Voice AI" },
  { name: "Zonos AI", description: "AI voice generation platform", url: "https://www.zonos.com", category: "Voice AI" },
  { name: "Speech Synthesis", description: "Web speech synthesis tools", url: "https://www.speechsynthesis.org", category: "Voice AI" },
  { name: "Hailuo AI Audio", description: "AI audio generation by Hailuo", url: "https://hailuoai.com", category: "Voice AI" },
  { name: "Text2Speech", description: "Free text to speech online", url: "https://www.text2speech.org", category: "Voice AI" },
  { name: "Play HT", description: "AI text-to-speech with realistic voices", url: "https://play.ht", category: "Voice AI" },

  // Text-to-Video AI
  { name: "Deevid AI", description: "AI video generation from text", url: "https://deevid.ai", category: "Video AI" },
  { name: "Veo 3 (Google)", description: "Google's advanced video generation AI", url: "https://deepmind.google/technologies/veo/", category: "Video AI" },
  { name: "Kling 2.1", description: "High-quality AI video generation", url: "https://kling.ai", category: "Video AI" },
  { name: "Luma Dream Machine", description: "AI video generation from text & images", url: "https://lumalabs.ai/dream-machine", category: "Video AI" },
  { name: "Hunyuan Video", description: "Tencent's AI video generation", url: "https://hunyuan.tencent.com", category: "Video AI" },
  { name: "Runway Gen-4", description: "AI-powered video editing & generation", url: "https://runwayml.com/gen-4", category: "Video AI" },
  { name: "Sora by OpenAI", description: "OpenAI's text-to-video model", url: "https://openai.com/sora", category: "Video AI" },
  { name: "Genmo AI", description: "Creative AI video generation", url: "https://www.genmo.ai", category: "Video AI" },
  { name: "Wan 2.1 AI Video", description: "AI video generation platform", url: "https://wan.ai", category: "Video AI" },
  { name: "Hailuo AI (MiniMax)", description: "MiniMax AI video generation", url: "https://minimax.ai", category: "Video AI" },
  { name: "Pika 2.2", description: "AI video generation & editing", url: "https://pika.art", category: "Video AI" },

  // Presentation AI
  { name: "Gamma App", description: "Clean, modern slide creation", url: "https://gamma.app", category: "Presentation" },
  { name: "GPTforSlides", description: "AI-powered Google Slides creation", url: "https://gptforslides.app", category: "Presentation" },
  { name: "Tome AI", description: "AI storytelling & presentation tool", url: "https://tome.app", category: "Presentation" },
  { name: "PowerMode AI", description: "AI-powered pitch deck generator", url: "https://powermode.ai", category: "Presentation" },
  { name: "SlidesAI", description: "Create presentations with AI", url: "https://www.slidesai.io", category: "Presentation" },
  { name: "Microsoft Copilot", description: "AI for PowerPoint & Office", url: "https://copilot.microsoft.com", category: "Presentation" },
  { name: "SlideSpeak AI", description: "AI presentation summarizer & creator", url: "https://slidespeak.co", category: "Presentation" },
  { name: "Beautiful AI", description: "Smart presentation design", url: "https://www.beautiful.ai", category: "Presentation" },
  { name: "Prezo AI", description: "AI presentation builder", url: "https://prezo.ai", category: "Presentation" },
  { name: "MagicSlides", description: "Create slides from any text with AI", url: "https://www.magicslides.app", category: "Presentation" },

  // Existing tools (keeping unique ones not duplicated above)
  { name: "Levity.ai", description: "Workflow automation bot", url: "https://levity.ai", category: "Automation" },
  { name: "Jasper.ai", description: "AI content writer", url: "https://jasper.ai", category: "Writing" },
  { name: "Magiceraser.io", description: "Remove unwanted objects", url: "https://magiceraser.io", category: "Image Editing" },
  { name: "Socratic.org", description: "Homework help & solutions", url: "https://socratic.org", category: "Education" },
  { name: "Hex.tech", description: "Data analysis workspace", url: "https://hex.tech", category: "Data" },
  { name: "Summarize.tech", description: "Video summarization", url: "https://summarize.tech", category: "Productivity" },
  { name: "OpusClip.com", description: "Automatic short-form clips", url: "https://opusclip.com", category: "Video" },
  { name: "Sloyd AI", description: "3D asset creator", url: "https://sloyd.ai", category: "3D Design" },
  { name: "Figstack.com", description: "Code explanation tool", url: "https://figstack.com", category: "Development" },
  { name: "Submagic.co", description: "Captions + emojis", url: "https://submagic.co", category: "Video" },
  { name: "Supernormal.com", description: "Meeting notes", url: "https://supernormal.com", category: "Productivity" },
  { name: "Cleanup.pictures", description: "Remove objects from photos", url: "https://cleanup.pictures", category: "Image Editing" },
  { name: "Vizard.ai", description: "Short-form video editor", url: "https://vizard.ai", category: "Video" },
  { name: "BrieflyAI.com", description: "Idea summarizer", url: "https://brieflyai.com", category: "Productivity" },
  { name: "Scribehow.com", description: "Auto tutorials", url: "https://scribehow.com", category: "Productivity" },
  { name: "Kaiber.ai", description: "AI animations", url: "https://kaiber.ai", category: "Video" },
  { name: "Blaze.today", description: "Writing & workflow automation", url: "https://blaze.today", category: "Writing" },
  { name: "Tactiq.io", description: "AI meeting assistant & transcription", url: "https://tactiq.io", category: "Productivity" },
  { name: "Anytype.io", description: "Privacy-first note-taking", url: "https://anytype.io", category: "Productivity" },
  { name: "Claude.ai", description: "Advanced AI chat assistant by Anthropic", url: "https://claude.ai", category: "AI Assistant" },
  { name: "PixVerse", description: "AI video generation platform", url: "https://app.pixverse.ai", category: "Video AI" },
  { name: "Phind.com", description: "AI-powered developer search engine", url: "https://phind.com", category: "Development" },
  { name: "HeyGen", description: "AI avatar video creation", url: "https://heygen.com", category: "Video AI" },
  { name: "ManyChat", description: "Chatbot & messaging automation", url: "https://manychat.com", category: "Automation" },
  { name: "Descript", description: "AI audio & video editing suite", url: "https://descript.com", category: "Audio" },
  { name: "Codeium", description: "Free AI coding assistant", url: "https://codeium.com", category: "Development" },
  { name: "DeepLearning (h1.nu)", description: "Learn multiple skills", url: "https://h1.nu/DeepLearning", category: "Education" },
  { name: "Voice Generator (h1.nu)", description: "AI voice generator", url: "https://h1.nu/voicegenai", category: "Voice AI" },
  { name: "Munch.com", description: "Video repurposing", url: "https://munch.com", category: "Video" },
];
