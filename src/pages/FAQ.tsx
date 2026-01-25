import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is Nextup Resources?",
    answer: "Nextup Resources is a platform that provides free access to premium courses, ebooks, resources, and apps. Our mission is to make quality education accessible to everyone."
  },
  {
    question: "Are all the resources really free?",
    answer: "Yes! All courses, ebooks, resources, and apps on Nextup Resources are completely free to download and use. We believe in democratizing education and making premium content accessible to all learners."
  },
  {
    question: "How do I download courses or resources?",
    answer: "Simply click on any course, ebook, resource, or app card to be redirected to the download link. Most content is hosted on platforms like Google Drive, Mega, or Telegram for easy access."
  },
  {
    question: "Are the modified apps safe to use?",
    answer: "We curate apps from trusted sources. However, we always recommend using caution with modified applications. Never login with sensitive accounts and always check permissions before installing."
  },
  {
    question: "Can I request specific courses or resources?",
    answer: "Absolutely! We welcome requests from our community. Use our Contact page to send us your suggestions, and we'll do our best to add the requested content."
  },
  {
    question: "How often is new content added?",
    answer: "We regularly update our library with new courses, resources, ebooks, and apps. Follow us on Instagram and YouTube to stay updated on the latest additions."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is required! All content is freely accessible without any registration. Just browse, click, and download."
  },
  {
    question: "Can I save my favorite items?",
    answer: "Yes! Use the heart icon on courses, ebooks, and resources to add them to your favorites. Your favorites are saved locally in your browser for easy access later."
  },
  {
    question: "Is there a mobile app available?",
    answer: "While we don't have a native app yet, our website is a Progressive Web App (PWA). You can install it on your device for offline access and an app-like experience. Visit our Install page for instructions."
  },
  {
    question: "How can I support Nextup Resources?",
    answer: "The best way to support us is by sharing our platform with friends and family, following us on social media, and providing feedback to help us improve."
  }
];

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ - Nextup Resources";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Frequently asked questions about Nextup Resources. Learn about our free courses, ebooks, resources, and apps."
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Got questions? We've got answers. Find everything you need to know about Nextup Resources.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          {/* Subtle background blobs */}
          <div className="liquid-blob w-72 h-72 bg-primary/10 top-20 -left-36" />
          <div className="liquid-blob w-64 h-64 bg-purple-400/10 -bottom-20 -right-32" style={{ animationDelay: "-4s" }} />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="glass-heavy rounded-2xl p-6 sm:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="border-border/30"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FAQ;
