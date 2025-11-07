import { Button } from "@/components/ui/button";
import { Shield, Swords, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const strategies = [
  { id: "defend", name: "Defend", icon: Shield, color: "hsl(210 100% 65%)" },
  { id: "attack", name: "Attack", icon: Swords, color: "hsl(0 85% 55%)" },
  { id: "counter", name: "Counter", icon: Zap, color: "hsl(188 95% 60%)" },
];

interface StrategySelectorProps {
  onStrategyLocked: (strategy: string) => void;
}

export const StrategySelector = ({ onStrategyLocked }: StrategySelectorProps) => {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);

  const handleSelect = (strategyId: string) => {
    if (!isLocked) {
      setSelectedStrategy(strategyId);
    }
  };

  const handleLock = () => {
    if (selectedStrategy) {
      setIsLocked(true);
      setWaitingForOpponent(true);
    }
  };
  
  useEffect(() => {
    if (waitingForOpponent) {
      // Simulate opponent locking their choice after 2-3 seconds
      const timeout = setTimeout(() => {
        onStrategyLocked(selectedStrategy!);
      }, 2500);
      
      return () => clearTimeout(timeout);
    }
  }, [waitingForOpponent, selectedStrategy, onStrategyLocked]);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold glow-text">Select Your Strategy</h2>
        <p className="text-sm text-muted-foreground">
          {waitingForOpponent 
            ? "Strategy Encrypted - Waiting for opponent..." 
            : isLocked 
            ? "Strategy locked and encrypted" 
            : "Choose wisely. Your choice will be encrypted."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          const isSelected = selectedStrategy === strategy.id;
          
          return (
            <Button
              key={strategy.id}
              variant="strategy"
              size="lg"
              onClick={() => handleSelect(strategy.id)}
              disabled={isLocked}
              className={`h-40 flex-col gap-4 relative overflow-hidden ${
                isSelected ? "border-primary shadow-[0_0_30px_hsl(var(--primary)/0.5)]" : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5" />
              <Icon 
                className="w-12 h-12 relative z-10" 
                style={{ color: isSelected ? strategy.color : undefined }}
              />
              <span className="text-lg font-semibold relative z-10">{strategy.name}</span>
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              )}
            </Button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button 
          variant="geometric" 
          size="lg"
          onClick={handleLock}
          disabled={!selectedStrategy || isLocked}
          className="min-w-[200px]"
        >
          {isLocked ? "🔒 Locked" : "Lock Strategy"}
        </Button>
      </div>

      {isLocked && (
        <div className="p-4 rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm text-center">
          <p className="text-sm text-primary font-mono">
            ENCRYPTED: ████████████████
          </p>
        </div>
      )}
    </div>
  );
};
