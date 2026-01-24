import { useState } from "react";
import CourseCard from "./CourseCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CoursesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      title: "Data Science",
      description:
        "Master data analysis, machine learning, and statistical modeling to extract insights from complex datasets.",
      category: "Technology",
      duration: "16 weeks",
      students: "3.2K",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1CgN7DE3pNRNh_4BA_zrrMLqWz6KquwuD",
    },
    {
      title: "Cyber Security and Ethical Hacking",
      description:
        "Learn penetration testing, network security, and ethical hacking techniques to protect systems from cyber threats.",
      category: "Security",
      duration: "14 weeks",
      students: "2.8K",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/13Kpn6yYJo8UPe1uJ29QOOqTQoLjERO8v",
    },
    {
      title: "Ultimate Body Transformation",
      description:
        "Complete fitness program with workout plans, nutrition guidance, and lifestyle coaching for total body transformation.",
      category: "Health & Fitness",
      duration: "12 weeks",
      students: "4.1K",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1lQqPhg-ZQvYmq9FFlSeHIIMoJoOwgVqP",
    },
    {
      title: "Youtube Automation",
      description:
        "Build and scale a profitable YouTube channel with automation strategies, content creation, and monetization techniques.",
      category: "Business",
      duration: "8 weeks",
      students: "3.5K",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1JT6504E_J3Jggcbp53mvSkxeFjyyj6lc",
    },
    {
      title: "Trading Course",
      description:
        "Master stock market trading, technical analysis, risk management, and proven strategies for consistent profits.",
      category: "Finance",
      duration: "10 weeks",
      students: "2.9K",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
      link: "https://mega.nz/folder/h2hCzI7L#tNrIvQL4Zkng43T_fgASHA",
    },
    {
      title: "The AI Creator Anthony Course",
      description:
        "Learn to create AI-powered content, leverage cutting-edge tools, and build automated creative workflows.",
      category: "AI & Creativity",
      duration: "6 weeks",
      students: "3.7K",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/13gVUwLEmvaQtm2Q02CJHXPhwnvt-KyAF",
    },
    {
      title: "MS Office Course",
      description:
        "Comprehensive training in Microsoft Word, Excel, PowerPoint, and Outlook for professional productivity.",
      category: "Productivity",
      duration: "4 weeks",
      students: "5.2K",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/12gX-aohbbIyhef8NGdX1OrDre87iUR01",
    },
    {
      title: "A to Z Prompt Engineering",
      description:
        "Master the art of crafting effective AI prompts for ChatGPT, Midjourney, and other AI tools to maximize results.",
      category: "AI",
      duration: "5 weeks",
      students: "4.3K",
      image: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?w=800&auto=format&fit=crop",
      link: "https://mega.nz/folder/AgwVTT7T#1Xu0AM-LANE4D3bL0EQUBg",
    },
    {
      title: "Mental Health",
      description:
        "Essential mental health strategies, stress management techniques, and emotional wellness practices for a balanced life.",
      category: "Wellness",
      duration: "8 weeks",
      students: "3.1K",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1SdhHuI_rujsZdLAtZMFzmAaDK36Jxl7n",
    },
    {
      title: "Master ChatGPT",
      description:
        "Unlock the full potential of ChatGPT with advanced techniques, use cases, and productivity workflows.",
      category: "AI",
      duration: "6 weeks",
      students: "6.8K",
      image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1pPsK7E9hvhfumcvybDhfbNEoSJs5nSax",
    },
    {
      title: "Complete 3D Animation Course",
      description:
        "Learn 3D modeling, rigging, animation, and rendering with industry-standard tools like Blender and Maya.",
      category: "Design",
      duration: "18 weeks",
      students: "2.4K",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1O38qbnf19NgQlrUqat-ogh8qZFl_9rOM",
    },
    {
      title: "The AI Renaissance",
      description:
        "Explore the transformative impact of AI on business, creativity, and society with practical applications.",
      category: "AI & Future",
      duration: "7 weeks",
      students: "3.9K",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1yFDknf3HhUR9NSzlr-oo1whgjRe1bBov",
    },
    {
      title: "Start Your Career Course",
      description:
        "Complete career development program covering job search strategies, interview preparation, resume building, and professional networking.",
      category: "Career",
      duration: "6 weeks",
      students: "4.5K",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1UYjUiIsyW4cx-h6xmB8x8s3TGYA--rrk",
    },
    {
      title: "Build AI Chatbots Without Coding",
      description:
        "Create intelligent AI chatbots without any programming knowledge. Learn no-code tools and automation to build conversational AI assistants.",
      category: "AI & No-Code",
      duration: "5 weeks",
      students: "3.6K",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1UJ7DC_9M4Dms8zRgiUhTu8pIZUtPVIkN",
    },
    {
      title: "Edit Like a Pro (Mobile Editing)",
      description:
        "Master professional video editing on your mobile device. Learn advanced techniques, transitions, and effects using smartphone apps.",
      category: "Mobile Editing",
      duration: "4 weeks",
      students: "5.8K",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1I_O0jWOeWvNZa1UJrMPPE2SypMXRC4uf",
    },
    {
      title: "Motion Design (Premium Logo Design After Effects)",
      description:
        "Create stunning animated logos and motion graphics in After Effects. Master professional animation techniques for premium branding.",
      category: "Motion Graphics",
      duration: "8 weeks",
      students: "2.7K",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1G8EhlqQ9ObMTbYS_jDXmWoaCO1_lxStl",
    },
    {
      title: "Build Your Own App Course",
      description:
        "Learn to build mobile and web applications from scratch. No coding experience required - use no-code platforms to launch your app.",
      category: "App Development",
      duration: "10 weeks",
      students: "4.2K",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/10MbRN8stMzLt-xCaoFfXbIWrl9Xm9VJS",
    },
    {
      title: "How to Get Clients on LinkedIn",
      description:
        "Master LinkedIn networking and client acquisition strategies. Build your personal brand and land high-value clients consistently.",
      category: "Business & Marketing",
      duration: "5 weeks",
      students: "6.1K",
      image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/18wdcSI2DJ3oMWhyUKj96wtWDRCavByWb",
    },
    {
      title: "Dating Masterclass",
      description:
        "Comprehensive guide to modern dating, building confidence, and creating meaningful connections. Transform your dating life with proven strategies.",
      category: "Personal Development",
      duration: "6 weeks",
      students: "3.4K",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1JWpSngNHZ0gKqD6ZjMaWqf6BAd3vi6SB",
    },
    {
      title: "Complete Documentary Editing",
      description:
        "Master the art of documentary filmmaking and editing. Learn storytelling techniques, pacing, and professional post-production workflows.",
      category: "Film & Documentary",
      duration: "12 weeks",
      students: "2.1K",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1ifLL-21qkftq8ouK70WrEKSgibvGhe6_",
    },
    {
      title: "Instagram Content Creation",
      description:
        "Master Instagram content creation, learn trending strategies, Reels production, and grow your audience organically.",
      category: "Social Media",
      duration: "6 weeks",
      students: "7.2K",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1I48C4OmwkAYgohpZne3OUUS8tz5xew6x",
    },
    {
      title: "Web Development Course",
      description:
        "Complete web development bootcamp covering HTML, CSS, JavaScript, and modern frameworks. Build professional websites from scratch.",
      category: "Web Development",
      duration: "20 weeks",
      students: "8.5K",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/18HOPJkrLjuF3smtAWdOcBmZlT82cMX1D",
    },
    {
      title: "No Code Portfolio Website Course",
      description:
        "Build stunning portfolio websites without writing code. Use modern no-code tools to create professional online presence.",
      category: "No-Code",
      duration: "3 weeks",
      students: "5.4K",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1Oot-EMWNBDkVjQqhMesh6YSlRLCjC4F0",
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="courses" className="py-20 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="liquid-blob w-72 h-72 bg-primary/10 -top-36 -right-36" />
      <div className="liquid-blob w-64 h-64 bg-purple-400/10 bottom-20 -left-32" style={{ animationDelay: "-4s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our carefully curated selection of courses designed to help you
            achieve your learning goals
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-muted-foreground text-lg">
                No courses found matching "{searchQuery}"
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
