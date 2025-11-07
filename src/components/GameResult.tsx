import { Button } from "@/components/ui/button";
import { Shield, Swords, Zap, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";

const strategies = {
  defend: { name: "Defend", icon: Shield, color: "hsl(210 100% 65%)" },
  attack: { name: "Attack", icon: Swords, color: "hsl(0 85% 55%)" },
  counter: { name: "Counter", icon: Zap, color: "hsl(188 95% 60%)" },
};

interface GameResultProps {
  playerChoice: string;
  onPlayAgain: () => void;
}

export const GameResult = ({ playerChoice, onPlayAgain }: GameResultProps) => {
  const [revealed, setRevealed] = useState(false);
  const [opponentChoice, setOpponentChoice] = useState<string>("");
  const [result, setResult] = useState<"win" | "lose" | "draw">("draw");
  
  useEffect(() => {
    // Simulate opponent's choice and reveal after 2 seconds
    const revealTimeout = setTimeout(() => {
      const choices = ["defend", "attack", "counter"];
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setOpponentChoice(randomChoice);
      
      // Determine winner (Rock-Paper-Scissors style: Defend > Attack > Counter > Defend)
      if (playerChoice === randomChoice) {
        setResult("draw");
      } else if (
        (playerChoice === "defend" && randomChoice === "attack") ||
        (playerChoice === "attack" && randomChoice === "counter") ||
        (playerChoice === "counter" && randomChoice === "defend")
      ) {
        setResult("win");
      } else {
        setResult("lose");
      }
      
      setRevealed(true);
    }, 2000);
    
    return () => clearTimeout(revealTimeout);
  }, [playerChoice]);
  
  const PlayerIcon = strategies[playerChoice as keyof typeof strategies]?.icon;
  const OpponentIcon = opponentChoice ? strategies[opponentChoice as keyof typeof strategies]?.icon : null;
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold glow-text">
          {!revealed ? "Decrypting Results..." : result === "win" ? "Victory!" : result === "lose" ? "Defeated!" : "Draw!"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {!revealed ? "Both strategies are being revealed" : "The battlefield has spoken"}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Player Choice */}
        <div className="p-6 rounded-lg border border-primary/50 bg-card/50 backdrop-blur-sm text-center space-y-3">
          <p className="text-xs text-muted-foreground font-mono">YOU</p>
          {PlayerIcon && (
            <PlayerIcon 
              className="w-16 h-16 mx-auto" 
              style={{ color: strategies[playerChoice as keyof typeof strategies]?.color }}
            />
          )}
          <p className="font-semibold">{strategies[playerChoice as keyof typeof strategies]?.name}</p>
        </div>
        
        {/* VS Indicator */}
        <div className="flex items-center justify-center">
          {revealed ? (
            result === "win" ? (
              <Trophy className="w-12 h-12 text-primary animate-pulse-glow" />
            ) : result === "lose" ? (
              <X className="w-12 h-12 text-destructive" />
            ) : (
              <div className="text-2xl font-bold text-muted-foreground">VS</div>
            )
          ) : (
            <div className="text-2xl font-bold text-muted-foreground animate-pulse">...</div>
          )}
        </div>
        
        {/* Opponent Choice */}
        <div className={`p-6 rounded-lg border border-accent/50 bg-card/50 backdrop-blur-sm text-center space-y-3 transition-all ${
          !revealed ? "opacity-50 blur-sm" : "opacity-100 blur-0"
        }`}>
          <p className="text-xs text-muted-foreground font-mono">OPPONENT</p>
          {revealed && OpponentIcon ? (
            <>
              <OpponentIcon 
                className="w-16 h-16 mx-auto" 
                style={{ color: strategies[opponentChoice as keyof typeof strategies]?.color }}
              />
              <p className="font-semibold">{strategies[opponentChoice as keyof typeof strategies]?.name}</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/30 animate-pulse" />
              <p className="font-semibold text-muted-foreground">████████</p>
            </>
          )}
        </div>
      </div>
      
      {revealed && (
        <div className="flex justify-center pt-4">
          <Button 
            variant="geometric" 
            size="lg"
            onClick={onPlayAgain}
            className="min-w-[200px]"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};
