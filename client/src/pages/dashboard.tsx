import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { generateCareerPaths, CareerPath } from "@/lib/mock-ai";
import { motion } from "framer-motion";
import { 
  Loader2, 
  ChevronDown, 
  Briefcase, 
  TrendingUp, 
  Map, 
  BookOpen, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Transform user data for career path generation
  const profile = user ? {
    name: user.name,
    skills: typeof user.skills === "string" 
      ? user.skills.split(",").map(s => s.trim()).filter(Boolean)
      : [],
    experience: user.experience,
  } : null;

  const { data: paths, isLoading } = useQuery({
    queryKey: ["careerPaths", user?.id],
    queryFn: () => generateCareerPaths(profile || { name: "User", skills: [], interests: [] }),
    enabled: !!profile,
  });

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
          <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
        </div>
        <p className="text-lg text-muted-foreground animate-pulse">AI is analyzing your profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-slate-900">
          Hello, <span className="text-primary">{user.name}</span>
        </h1>
        <p className="text-slate-500 mt-2">
          Based on your skills in <span className="font-medium text-slate-700">{profile?.skills.join(", ")}</span>, 
          we've identified {paths?.length} high-potential career paths.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {paths?.map((path, index) => (
            <CareerCard key={path.id} path={path} index={index} />
          ))}
        </div>

        <div className="space-y-6">
          <div className="sticky top-24">
            <Card className="glass-card border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                  </div>
                ) : paths && paths.length > 0 && profile?.skills.length ? (
                  <>
                    <div className="p-4 bg-white/50 rounded-lg border border-white/60">
                      <p className="text-sm font-medium text-slate-900 mb-1">Top Role Recommendation</p>
                      <p className="text-2xl font-bold text-indigo-600">{paths[0].title}</p>
                      <p className="text-xs text-slate-500 mt-1">{paths[0].growthOutlook} growth outlook</p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg border border-white/60">
                      <p className="text-sm font-medium text-slate-900 mb-1">Your Competitive Edge</p>
                      <p className="text-sm text-slate-600">Your combination of {profile.skills[0]} and {profile.skills[1] || "Technology"} is rare in the current market.</p>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerCard({ path, index }: { path: CareerPath; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="glass-card overflow-hidden border-white/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500" />
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-display text-slate-900">{path.title}</CardTitle>
              <div className="flex gap-3 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {path.salaryRange}</span>
                <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" /> {path.growthOutlook} Growth</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold text-indigo-600">{path.matchScore}%</div>
              <div className="text-xs text-indigo-400 font-medium">Match Score</div>
            </div>
          </div>
          <CardDescription className="mt-4 text-base leading-relaxed">
            {path.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-0">
          <Tabs defaultValue="reasoning" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 p-1 rounded-xl">
              <TabsTrigger value="reasoning" className="rounded-lg">Why this role?</TabsTrigger>
              <TabsTrigger value="roadmap" className="rounded-lg">Roadmap</TabsTrigger>
              <TabsTrigger value="resources" className="rounded-lg">Resources</TabsTrigger>
            </TabsList>

            <div className="p-6 min-h-[300px]">
              <TabsContent value="reasoning" className="mt-0 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-semibold text-slate-900">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Your Strengths
                    </h4>
                    <ul className="space-y-2">
                      {path.reasoning.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-slate-600 bg-green-50/50 p-2 rounded border border-green-100">{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="flex items-center gap-2 font-semibold text-slate-900">
                      <AlertCircle className="h-4 w-4 text-amber-500" /> Skill Gaps
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.skillsGap.map((gap, i) => (
                        <Badge key={i} variant="outline" className="bg-amber-50/50 border-amber-200 text-amber-700 hover:bg-amber-100">
                          {gap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
                  <h4 className="font-semibold text-indigo-900 mb-1">AI Market Analysis</h4>
                  <p className="text-sm text-indigo-700 leading-relaxed">{path.reasoning.marketFit}</p>
                </div>
              </TabsContent>

              <TabsContent value="roadmap" className="mt-0">
                <div className="relative pl-6 border-l-2 border-indigo-100 space-y-8 py-2">
                  {path.roadmap.map((phase, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[31px] top-0 h-6 w-6 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-indigo-500" />
                      </div>
                      <div className="mb-1 flex justify-between items-center">
                        <h4 className="font-semibold text-slate-900">{phase.phase}</h4>
                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-600">{phase.duration}</span>
                      </div>
                      <ul className="space-y-2 mt-3">
                        {phase.steps.map((step, j) => (
                          <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                            <span className="block h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                 <ScrollArea className="h-[280px] pr-4">
                  <div className="space-y-4">
                    {path.resources.map((resource) => (
                      <div key={resource.id} className="group p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <Badge variant="secondary" className="mb-2 uppercase text-[10px] tracking-wider font-semibold">
                              {resource.type}
                            </Badge>
                            <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {resource.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">{resource.provider}</p>
                          </div>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-indigo-500 transition-colors">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg mt-3">
                          <p className="text-xs text-slate-600 italic">
                            <span className="font-semibold text-indigo-500">AI Note: </span>
                            {resource.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 flex justify-end">
          <Button variant="ghost" className="text-sm text-slate-500 hover:text-indigo-600">
            Save this path
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
