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
  { question: "What is Nextup Resources?", answer: "Nextup Resources is a platform that provides free access to premium courses, ebooks, resources, and apps. Our mission is to make quality education accessible to everyone." },
  { question: "Are all the resources really free?", answer: "Yes! All courses, ebooks, resources, and apps on Nextup Resources are completely free to download and use." },
  { question: "How do I download courses or resources?", answer: "Simply click on any course, ebook, resource, or app card to be redirected to the download link." },
  { question: "Are the modified apps safe to use?", answer: "We curate apps from trusted sources. However, we always recommend using caution with modified applications." },
  { question: "Can I request specific courses or resources?", answer: "Absolutely! Use our Contact page to send us your suggestions." },
  { question: "How often is new content added?", answer: "We regularly update our library. Follow us on Instagram and YouTube to stay updated." },
  { question: "Do I need to create an account?", answer: "No account is required! All content is freely accessible without any registration." },
  { question: "Can I save my favorite items?", answer: "Yes! Use the heart icon on courses, ebooks, and resources to add them to your favorites." },
  { question: "Is there a mobile app available?", answer: "Our website is a Progressive Web App (PWA). You can install it on your device for offline access." },
  { question: "How can I support Nextup Resources?", answer: "Share our platform with friends, follow us on social media, and provide feedback." },
];

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ - Nextup Resources";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-12 dot-grid">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 font-heading">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Got questions? We've got answers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border-2 border-foreground/80 rounded-2xl p-6 sm:p-8 shadow-pop-soft">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-foreground/10">
                      <AccordionTrigger className="text-left text-foreground font-bold hover:text-primary transition-colors hover:no-underline font-heading">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
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
