import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Profile() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  // Parse skills if it's a string
  const skills = typeof user.skills === "string" 
    ? user.skills.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Card className="glass-card border-none shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-sky-500" />
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6 flex justify-between items-end">
            <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-lg">
              <div className="h-full w-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                <User className="h-10 w-10" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-500">@{user.username}</p>
            </div>

            <div className="grid gap-6">
              <div className="bg-white/50 p-6 rounded-xl border border-white/60">
                <h3 className="font-semibold text-slate-900 mb-3">Experience Level</h3>
                <p className="text-slate-600 leading-relaxed capitalize">
                  {user.experience.replace("-", " ")}
                </p>
              </div>

              <div className="bg-white/50 p-6 rounded-xl border border-white/60">
                <h3 className="font-semibold text-slate-900 mb-3">Skills & Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.length > 0 ? (
                    skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">No skills added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
