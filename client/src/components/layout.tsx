import { Link, useLocation } from "wouter";
import { Sparkles, Compass, User, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, signout, user } = useAuth();
  const { toast } = useToast();

  const handleSignout = async () => {
    try {
      await signout();
      toast({
        title: "Signed out successfully",
        description: "See you next time!",
      });
      navigate("/");
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const NavContent = () => (
    <>
      <div className="flex items-center gap-2 mb-8 md:mb-0">
        <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight">Pathfinder AI</span>
      </div>

      <nav className="flex flex-col md:flex-row gap-6 md:ml-auto md:items-center">
        <Link href="/">
          <a className={`text-sm font-medium transition-colors hover:text-primary ${location === "/" ? "text-primary" : "text-muted-foreground"}`}>
            Home
          </a>
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/dashboard">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location === "/dashboard" ? "text-primary" : "text-muted-foreground"}`}>
                Dashboard
              </a>
            </Link>
            <Link href="/profile">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${location === "/profile" ? "text-primary" : "text-muted-foreground"}`}>
                Profile
              </a>
            </Link>
          </>
        )}
      </nav>

      <div className="flex flex-col md:flex-row ml-0 md:ml-6 gap-2 mt-6 md:mt-0">
        {isAuthenticated ? (
          <>
            <div className="hidden md:flex items-center gap-3 mr-2 px-3 py-2 rounded-lg glass-card">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <Button 
              variant="outline" 
              className="glass-card hover:bg-white/90"
              onClick={handleSignout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/signin">
              <Button variant="outline" className="glass-card hover:bg-white/90 w-full md:w-auto">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 w-full md:w-auto">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          
          <div className="hidden md:flex w-full items-center">
            <NavContent />
          </div>

          <div className="md:hidden flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-secondary p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg">Pathfinder AI</span>
            </div>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] glass flex flex-col pt-10">
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </header>
      
      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="border-t border-white/20 bg-white/40 backdrop-blur-md py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Pathfinder AI. Powered by Explainable Intelligence.</p>
        </div>
      </footer>
    </div>
  );
}
