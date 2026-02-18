import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  experience: z.string().min(10, "Please briefly describe your experience."),
  skills: z.array(z.string()).min(1, "Add at least one skill."),
});

// Store user profile in localStorage for the demo
export const saveProfile = (data: any) => {
  localStorage.setItem("userProfile", JSON.stringify(data));
};

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      experience: "",
      skills: [],
    },
  });

  // Load existing profile data if available
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      try {
        const profile = JSON.parse(saved);
        setIsEditing(true);
        form.reset({
          name: profile.name || "",
          experience: profile.experience || "",
          skills: profile.skills || [],
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }
  }, [form]);

  const skills = form.watch("skills");

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      form.setValue("skills", [...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue("skills", skills.filter(s => s !== skillToRemove));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    saveProfile(values);
    setLocation("/dashboard");
  };

  const nextStep = async () => {
    const fields = step === 1 ? ["name"] : ["experience"];
    const isValid = await form.trigger(fields as any);
    if (isValid) setStep(step + 1);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="glass p-8 md:p-10 rounded-2xl relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1.5 bg-indigo-100 w-full">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "33%" }}
              animate={{ width: `${step * 33.33}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Let's build your profile</h2>
            <p className="text-slate-500">We need a few details to tailor the AI recommendations.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">What should we call you?</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="h-12 text-lg glass-input" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <Button type="button" onClick={nextStep} className="w-full h-12 text-lg rounded-xl">
                        Continue <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Tell us about your background</FormLabel>
                          <FormDescription>Current role, years of experience, or main focus area.</FormDescription>
                          <FormControl>
                            <Textarea 
                              placeholder="I have 3 years of experience in digital marketing..." 
                              className="min-h-[120px] text-base glass-input resize-none p-4" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4 flex gap-3">
                       <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3 h-12 rounded-xl">
                        Back
                      </Button>
                      <Button type="button" onClick={nextStep} className="w-2/3 h-12 text-lg rounded-xl">
                        Continue <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="skills"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-lg">What are your top skills?</FormLabel>
                          <FormDescription>Type and press Enter to add skills.</FormDescription>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input 
                                value={currentSkill}
                                onChange={(e) => setCurrentSkill(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addSkill();
                                  }
                                }}
                                placeholder="e.g. Python, Design, Leadership" 
                                className="h-12 glass-input"
                              />
                              <Button type="button" onClick={addSkill} size="icon" className="h-12 w-12 shrink-0 rounded-xl">
                                <Plus className="h-5 w-5" />
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 min-h-[40px]">
                              {skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm rounded-lg flex gap-2 items-center bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
                                  {skill}
                                  <X 
                                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                                    onClick={() => removeSkill(skill)}
                                  />
                                </Badge>
                              ))}
                              {skills.length === 0 && (
                                <span className="text-sm text-slate-400 italic">No skills added yet</span>
                              )}
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4 flex gap-3">
                       <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-1/3 h-12 rounded-xl">
                        Back
                      </Button>
                      <Button type="submit" className="w-2/3 h-12 text-lg rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:opacity-90">
                        {isEditing ? "Update Profile" : "Generate Path"} <SparklesIcon className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
