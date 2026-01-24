import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CourseCard from "@/components/CourseCard";
import ResourceCard from "@/components/ResourceCard";
import { useFavorites, generateId } from "@/hooks/useFavorites";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import course images
import earnMoneyFacebookImg from "@/assets/courses/earn-money-facebook.jpg";
import ethicalHacking10hrImg from "@/assets/courses/ethical-hacking-10hr.jpg";
import viralCrimeStoryImg from "@/assets/courses/viral-crime-story.jpg";
import androidKaliLinuxImg from "@/assets/courses/android-kali-linux.jpg";
import udemyCoursesImg from "@/assets/courses/udemy-courses.jpg";

// Import resource images
import bmwRawClipsImg from "@/assets/resources/bmw-raw-clips.jpg";
import instagramHooksImg from "@/assets/resources/instagram-hooks.jpg";

// All courses data
const allCourses = [
  {
    title: "1000+ Udemy Courses Collection",
    description: "Massive collection of premium Udemy courses covering programming, business, design, marketing, and personal development.",
    category: "Education",
    duration: "Unlimited",
    students: "10K+",
    image: udemyCoursesImg,
    link: "https://mega.nz/folder/t69gha4L#IE4bFM_UtjvsANNF0FojLQ/folder/dm0VFL5A",
  },
  {
    title: "A to Z Prompt Engineering",
    description: "Master the art of crafting effective AI prompts for ChatGPT, Midjourney, and other AI tools to maximize results.",
    category: "AI",
    duration: "5 weeks",
    students: "4.3K",
    image: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?w=800&auto=format&fit=crop",
    link: "https://mega.nz/folder/AgwVTT7T#1Xu0AM-LANE4D3bL0EQUBg",
  },
  {
    title: "Android PIN Lock Security with Kali Linux",
    description: "Learn cybersecurity techniques for Android security testing using Kali Linux. Understand vulnerabilities and protection methods.",
    category: "Security",
    duration: "4 weeks",
    students: "2.1K",
    image: androidKaliLinuxImg,
    link: "https://t.me/nextupfilebot?start=BQADAQADZBAAAo0tqUf7-Er9Ze4wZBYE",
  },
  {
    title: "Build AI Chatbots Without Coding",
    description: "Create intelligent AI chatbots without any programming knowledge. Learn no-code tools and automation to build conversational AI assistants.",
    category: "AI & No-Code",
    duration: "5 weeks",
    students: "3.6K",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1UJ7DC_9M4Dms8zRgiUhTu8pIZUtPVIkN",
  },
  {
    title: "Build Your Own App Course",
    description: "Learn to build mobile and web applications from scratch. No coding experience required - use no-code platforms to launch your app.",
    category: "App Development",
    duration: "10 weeks",
    students: "4.2K",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/10MbRN8stMzLt-xCaoFfXbIWrl9Xm9VJS",
  },
  {
    title: "Complete 3D Animation Course",
    description: "Learn 3D modeling, rigging, animation, and rendering with industry-standard tools like Blender and Maya.",
    category: "Design",
    duration: "18 weeks",
    students: "2.4K",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1O38qbnf19NgQlrUqat-ogh8qZFl_9rOM",
  },
  {
    title: "Complete Documentary Editing",
    description: "Master the art of documentary filmmaking and editing. Learn storytelling techniques, pacing, and professional post-production workflows.",
    category: "Film & Documentary",
    duration: "12 weeks",
    students: "2.1K",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1ifLL-21qkftq8ouK70WrEKSgibvGhe6_",
  },
  {
    title: "Cyber Security and Ethical Hacking",
    description: "Learn penetration testing, network security, and ethical hacking techniques to protect systems from cyber threats.",
    category: "Security",
    duration: "14 weeks",
    students: "2.8K",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/13Kpn6yYJo8UPe1uJ29QOOqTQoLjERO8v",
  },
  {
    title: "Data Science",
    description: "Master data analysis, machine learning, and statistical modeling to extract insights from complex datasets.",
    category: "Technology",
    duration: "16 weeks",
    students: "3.2K",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1CgN7DE3pNRNh_4BA_zrrMLqWz6KquwuD",
  },
  {
    title: "Dating Masterclass",
    description: "Comprehensive guide to modern dating, building confidence, and creating meaningful connections. Transform your dating life with proven strategies.",
    category: "Personal Development",
    duration: "6 weeks",
    students: "3.4K",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1JWpSngNHZ0gKqD6ZjMaWqf6BAd3vi6SB",
  },
  {
    title: "Earn Money with Facebook",
    description: "Complete guide to monetizing Facebook through ads, marketplace, groups, and content creation. Build a profitable online business.",
    category: "Business",
    duration: "6 weeks",
    students: "5.2K",
    image: earnMoneyFacebookImg,
    link: "https://drive.google.com/file/d/1wZBroBcE_7wqcLYZXgSQc2vjks2oxI45/view?usp=drivesdk",
  },
  {
    title: "Edit Like a Pro (Mobile Editing)",
    description: "Master professional video editing on your mobile device. Learn advanced techniques, transitions, and effects using smartphone apps.",
    category: "Mobile Editing",
    duration: "4 weeks",
    students: "5.8K",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1I_O0jWOeWvNZa1UJrMPPE2SypMXRC4uf",
  },
  {
    title: "Full 10 Hours Ethical Hacking Course",
    description: "Comprehensive 10-hour ethical hacking masterclass covering penetration testing, network security, web vulnerabilities, and security tools.",
    category: "Cybersecurity",
    duration: "10 hours",
    students: "4.5K",
    image: ethicalHacking10hrImg,
    link: "https://t.me/nextupfilebot?start=BQADAQADPBAAAo0tqUdfO_jUNNNOgxYE",
  },
  {
    title: "How to Get Clients on LinkedIn",
    description: "Master LinkedIn networking and client acquisition strategies. Build your personal brand and land high-value clients consistently.",
    category: "Business & Marketing",
    duration: "5 weeks",
    students: "6.1K",
    image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/18wdcSI2DJ3oMWhyUKj96wtWDRCavByWb",
  },
  {
    title: "Instagram Content Creation",
    description: "Master Instagram content creation, learn trending strategies, Reels production, and grow your audience organically.",
    category: "Social Media",
    duration: "6 weeks",
    students: "7.2K",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1I48C4OmwkAYgohpZne3OUUS8tz5xew6x",
  },
  {
    title: "Make Viral Crime Story",
    description: "Learn to create engaging true crime content for YouTube. Master storytelling, editing techniques, and audience engagement strategies.",
    category: "Content Creation",
    duration: "5 weeks",
    students: "3.8K",
    image: viralCrimeStoryImg,
    link: "https://t.me/nextupfilebot?start=BQADAQADgRAAAo0tqUehBbh3yB150RYE",
  },
  {
    title: "Master ChatGPT",
    description: "Unlock the full potential of ChatGPT with advanced techniques, use cases, and productivity workflows.",
    category: "AI",
    duration: "6 weeks",
    students: "6.8K",
    image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1pPsK7E9hvhfumcvybDhfbNEoSJs5nSax",
  },
  {
    title: "Mental Health",
    description: "Essential mental health strategies, stress management techniques, and emotional wellness practices for a balanced life.",
    category: "Wellness",
    duration: "8 weeks",
    students: "3.1K",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1SdhHuI_rujsZdLAtZMFzmAaDK36Jxl7n",
  },
  {
    title: "Motion Design (Premium Logo Design After Effects)",
    description: "Create stunning animated logos and motion graphics in After Effects. Master professional animation techniques for premium branding.",
    category: "Motion Graphics",
    duration: "8 weeks",
    students: "2.7K",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1G8EhlqQ9ObMTbYS_jDXmWoaCO1_lxStl",
  },
  {
    title: "MS Office Course",
    description: "Comprehensive training in Microsoft Word, Excel, PowerPoint, and Outlook for professional productivity.",
    category: "Productivity",
    duration: "4 weeks",
    students: "5.2K",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/12gX-aohbbIyhef8NGdX1OrDre87iUR01",
  },
  {
    title: "No Code Portfolio Website Course",
    description: "Build stunning portfolio websites without writing code. Use modern no-code tools to create professional online presence.",
    category: "No-Code",
    duration: "3 weeks",
    students: "5.4K",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1Oot-EMWNBDkVjQqhMesh6YSlRLCjC4F0",
  },
  {
    title: "Start Your Career Course",
    description: "Complete career development program covering job search strategies, interview preparation, resume building, and professional networking.",
    category: "Career",
    duration: "6 weeks",
    students: "4.5K",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1UYjUiIsyW4cx-h6xmB8x8s3TGYA--rrk",
  },
  {
    title: "The AI Creator Anthony Course",
    description: "Learn to create AI-powered content, leverage cutting-edge tools, and build automated creative workflows.",
    category: "AI & Creativity",
    duration: "6 weeks",
    students: "3.7K",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/13gVUwLEmvaQtm2Q02CJHXPhwnvt-KyAF",
  },
  {
    title: "The AI Renaissance",
    description: "Explore the transformative impact of AI on business, creativity, and society with practical applications.",
    category: "AI & Future",
    duration: "7 weeks",
    students: "3.9K",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1yFDknf3HhUR9NSzlr-oo1whgjRe1bBov",
  },
  {
    title: "Trading Course",
    description: "Master stock market trading, technical analysis, risk management, and proven strategies for consistent profits.",
    category: "Finance",
    duration: "10 weeks",
    students: "2.9K",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    link: "https://mega.nz/folder/h2hCzI7L#tNrIvQL4Zkng43T_fgASHA",
  },
  {
    title: "Ultimate Body Transformation",
    description: "Complete fitness program with workout plans, nutrition guidance, and lifestyle coaching for total body transformation.",
    category: "Health & Fitness",
    duration: "12 weeks",
    students: "4.1K",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1lQqPhg-ZQvYmq9FFlSeHIIMoJoOwgVqP",
  },
  {
    title: "Web Development Course",
    description: "Complete web development bootcamp covering HTML, CSS, JavaScript, and modern frameworks. Build professional websites from scratch.",
    category: "Web Development",
    duration: "20 weeks",
    students: "8.5K",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/18HOPJkrLjuF3smtAWdOcBmZlT82cMX1D",
  },
  {
    title: "Youtube Automation",
    description: "Build and scale a profitable YouTube channel with automation strategies, content creation, and monetization techniques.",
    category: "Business",
    duration: "8 weeks",
    students: "3.5K",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1JT6504E_J3Jggcbp53mvSkxeFjyyj6lc",
  },
];

// All resources data
const allResources = [
  {
    title: "All Sound Effects",
    description: "Comprehensive collection of high-quality sound effects for video editing, music production, and content creation. Perfect for enhancing your projects.",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1u6cDD5SpUC0M3eiDdYgalNvt58vKucgs",
  },
  {
    title: "BMW Car Raw Video Clips",
    description: "Premium collection of cinematic BMW car footage for video editing, automotive content, and professional productions. High-quality raw clips.",
    category: "Video",
    image: bmwRawClipsImg,
    link: "https://drive.google.com/drive/folders/1CqKEg7q-zwcq3wXehZbMBx2LJ6LPnwrl",
  },
  {
    title: "Ebook Abdellah",
    description: "Comprehensive educational ebook covering essential topics and strategies. Learn from expert insights and practical knowledge.",
    category: "Ebook",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1PWV29Q0NH4-2jqA8hYNw6WGShamu6HiE",
  },
  {
    title: "Instagram Viral Hook Bundle",
    description: "Collection of trending Instagram hooks, text overlays, and templates to boost engagement and create viral Reels content.",
    category: "Social Media",
    image: instagramHooksImg,
    link: "https://drive.google.com/drive/folders/1IyuR4KTZVJX80LsJlIxeJgKWe1EZFrNP",
  },
  {
    title: "Mega Thumbnail VFX Assets Pack",
    description: "Professional VFX assets and thumbnail templates to create eye-catching YouTube thumbnails and video content.",
    category: "Graphics",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1VuNLqGCORHLfRb5Q-GyHs5Ly0Ll_gkuH",
  },
  {
    title: "Memes Pack",
    description: "Curated collection of trending memes and viral content templates. Perfect for social media creators and content marketers.",
    category: "Content",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1O8Tz_6Ida0mrzgY83v_XF8B3kF4A1JdD",
  },
  {
    title: "Premium Asset Collection",
    description: "Comprehensive collection of premium assets for video editing, graphic design, and content creation.",
    category: "Assets",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1acl8L0fcWuVWtQvOBHllOXmOqUBLu0sm",
  },
  {
    title: "Senpai Spider 1 Million Minecraft Texture Pack",
    description: "Massive Minecraft texture collection with over 1 million high-quality textures for ultimate customization.",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1Z1JTqoljxO1CnZrNdfWRWQrUUqXUmx1K",
  },
  {
    title: "Visualsbylalit Editing Pack",
    description: "Premium editing pack with transitions, effects, and templates for professional video editing. Elevate your content with cinematic tools.",
    category: "Video",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
    link: "https://drive.google.com/drive/folders/1tF0AUt9RIZdENTDJJa1fktPtzTdGslN6",
  },
];

const Favorites = () => {
  const { getFavoritesByType, clearFavorites, totalCount } = useFavorites();

  const favoriteCourseIds = getFavoritesByType("course");
  const favoriteResourceIds = getFavoritesByType("resource");

  const favoriteCourses = allCourses.filter((course) =>
    favoriteCourseIds.includes(generateId(course.title))
  );

  const favoriteResources = allResources.filter((resource) =>
    favoriteResourceIds.includes(generateId(resource.title))
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass-button px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-destructive fill-current" />
              <span className="text-sm font-medium text-foreground">
                {totalCount} Saved Items
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Your Favorites
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access all your saved courses and resources in one place
            </p>
            
            {totalCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-6"
                onClick={clearFavorites}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Favorites
              </Button>
            )}
          </div>

          {totalCount === 0 ? (
            <div className="text-center py-20">
              <div className="glass-heavy rounded-2xl p-12 max-w-md mx-auto">
                <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  No favorites yet
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start exploring and save courses and resources you're interested in!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="glassPrimary" asChild>
                    <a href="/courses">Explore Courses</a>
                  </Button>
                  <Button variant="glass" asChild>
                    <a href="/resources">Browse Resources</a>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  Courses
                  <span className="glass-button px-2 py-0.5 rounded-full text-xs">
                    {favoriteCourses.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  Resources
                  <span className="glass-button px-2 py-0.5 rounded-full text-xs">
                    {favoriteResources.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="courses">
                {favoriteCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
                      <p className="text-muted-foreground">
                        No favorite courses yet. Start exploring!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteCourses.map((course, index) => (
                      <div
                        key={course.title}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CourseCard {...course} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resources">
                {favoriteResources.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
                      <p className="text-muted-foreground">
                        No favorite resources yet. Start exploring!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteResources.map((resource, index) => (
                      <div
                        key={resource.title}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ResourceCard {...resource} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Favorites;
