import { useEffect, useState } from "react";
import { Loader2, Users } from "lucide-react";

interface MatchmakingStatusProps {
  onMatchFound: () => void;
}

export const MatchmakingStatus = ({ onMatchFound }: MatchmakingStatusProps) => {
  const [dots, setDots] = useState("");
  
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    
    // Simulate finding a match after 3 seconds
    const matchTimeout = setTimeout(() => {
      onMatchFound();
    }, 3000);
    
    return () => {
      clearInterval(dotsInterval);
      clearTimeout(matchTimeout);
    };
  }, [onMatchFound]);
  
  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-lg border border-accent/20 bg-card/50 backdrop-blur-sm">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse-glow">
          <Users className="w-10 h-10 text-primary" />
        </div>
        <Loader2 className="w-24 h-24 text-primary/30 absolute -top-2 -left-2 animate-spin" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold glow-text">Searching for Opponent{dots}</h3>
        <p className="text-sm text-muted-foreground">
          Scanning the battlefield for worthy adversaries
        </p>
      </div>
      
      <div className="w-full max-w-xs h-1 bg-secondary/30 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent animate-slide-pulse" />
      </div>
    </div>
  );
};
