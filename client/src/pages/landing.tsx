import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, Target, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroImage from "@/assets/images/career-hero.png";

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-sky-500/10 rounded-full blur-[100px] -z-10" />

      <section className="container mx-auto px-4 pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-indigo-100 text-indigo-700 text-sm font-medium shadow-sm backdrop-blur-sm">
              <SparklesIcon className="w-4 h-4" />
              <span>AI-Powered Career Intelligence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
              Your future, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
                explained.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              Stop guessing. Pathfinder AI analyzes your skills and interests to build a personalized, transparent roadmap for your career growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-indigo-500/20 group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/signin">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl glass-card hover:bg-white/80">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center gap-8 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-indigo-500" />
                <span>Explainable AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-sky-500" />
                <span>Precision Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-teal-500" />
                <span>Data Privacy</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-sky-500/20 rounded-[2rem] blur-2xl transform rotate-3" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/50 shadow-2xl shadow-indigo-500/10 glass">
              <img 
                src={heroImage} 
                alt="Career Visualization" 
                className="w-full h-auto object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating Cards for Effect */}
              <div className="absolute top-10 right-10 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/60 max-w-[200px] animate-pulse-slow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Target className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Match Score</div>
                    <div className="text-lg font-bold text-slate-900">94%</div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
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
