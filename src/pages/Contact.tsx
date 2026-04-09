import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import SquigglyUnderline from "@/components/SquigglyUnderline";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_0tz9fru";
const EMAILJS_TEMPLATE_ID = "template_16ds9rx";
const EMAILJS_PUBLIC_KEY = "KRsxH4cZ_5RJ2EMJB";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Contact Us - Nextup Resources";
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      }, EMAILJS_PUBLIC_KEY);
      toast({ title: "✅ Message Sent!", description: "We'll get back to you soon." });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch {
      toast({ title: "Failed to send", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-1 font-heading">Get in Touch</h1>
            <SquigglyUnderline color="hsl(var(--tertiary))" width={180} />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Have questions? We're here to help you on your learning journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fade-in">
              <div className="bg-card border-2 border-foreground/80 rounded-xl p-8 shadow-pop-soft">
                <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "Contact via form" },
                    { icon: Send, label: "Response Time", value: "Within 24 hours" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-foreground/30">
                        <Icon className="text-primary" size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">{label}</p>
                        <p className="text-foreground font-bold">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border-2 border-foreground/80 rounded-xl p-8 shadow-pop-soft">
                <h3 className="text-xl font-bold text-foreground mb-6 font-heading">What We Offer</h3>
                <div className="space-y-3 text-muted-foreground font-medium">
                  {["Premium Educational Courses", "Free Creative Resources", "Video Editing Content", "Professional Training", "Community Support"].map((item) => (
                    <p key={item} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" /> {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-foreground/80 rounded-xl p-8 shadow-pop-soft animate-fade-in delay-200">
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Send a Message</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">Your Name *</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? "border-destructive" : ""} />
                    {errors.name && <p className="text-destructive text-sm mt-1 font-medium">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">Email *</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={errors.email ? "border-destructive" : ""} />
                    {errors.email && <p className="text-destructive text-sm mt-1 font-medium">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">Subject *</label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} className={errors.subject ? "border-destructive" : ""} />
                  {errors.subject && <p className="text-destructive text-sm mt-1 font-medium">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">Your Message *</label>
                  <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} className={`border-2 border-foreground/30 focus:border-primary focus:shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)] transition-all duration-300 ${errors.message ? "border-destructive" : ""}`} placeholder="Tell us about your inquiry..." />
                  {errors.message && <p className="text-destructive text-sm mt-1 font-medium">{errors.message}</p>}
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (<><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>) : (<><Send className="mr-2" size={20} strokeWidth={2.5} /> Send Message</>)}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <BottomNav />
    </div>
  );
};

export default Contact;
