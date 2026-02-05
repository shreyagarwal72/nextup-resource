import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import "@/styles/material3.css";

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

const BetaFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-16 px-4"
        style={{ background: "linear-gradient(135deg, hsl(var(--md-sys-color-secondary-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)" }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center md3-animate-enter"
               style={{ background: "hsl(var(--md-sys-color-secondary))" }}>
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="md3-display-small mb-4 md3-animate-enter md3-stagger-1" 
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
            Frequently Asked Questions
          </h1>
          
          <p className="md3-body-large max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            Got questions? We've got answers. Find everything you need to know about Nextup Resources.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`md3-card overflow-hidden md3-animate-enter md3-stagger-${(index % 6) + 1}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="md3-title-medium" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4`}
                    style={{ 
                      color: "hsl(var(--md-sys-color-on-surface-variant))",
                      transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                  />
                </button>
                
                <div 
                  className="overflow-hidden transition-all duration-300"
                  style={{ 
                    maxHeight: openIndex === index ? "500px" : "0",
                    opacity: openIndex === index ? 1 : 0
                  }}
                >
                  <div className="px-5 pb-5">
                    <p className="md3-body-medium" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BetaFAQ;
