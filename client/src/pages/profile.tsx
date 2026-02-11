import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Settings, LogOut } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    setLocation("/");
  };

  if (!profile) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Profile Found</h2>
          <Button asChild><a href="/onboarding">Create Profile</a></Button>
        </div>
      </div>
    );
  }

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
            <Button variant="outline" size="sm" onClick={() => setLocation("/onboarding")}>
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">{profile.name}</h1>
              <p className="text-slate-500">Aspiring Professional</p>
            </div>

            <div className="grid gap-6">
              <div className="bg-white/50 p-6 rounded-xl border border-white/60">
                <h3 className="font-semibold text-slate-900 mb-3">About</h3>
                <p className="text-slate-600 leading-relaxed">
                  {profile.experience || "No experience details added yet."}
                </p>
              </div>

              <div className="bg-white/50 p-6 rounded-xl border border-white/60">
                <h3 className="font-semibold text-slate-900 mb-3">Skills & Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/60">
              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
