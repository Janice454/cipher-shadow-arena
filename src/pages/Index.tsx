import { GameHeader } from "@/components/GameHeader";
import { GameFooter } from "@/components/GameFooter";
import { WalletConnect } from "@/components/WalletConnect";
import { StrategySelector } from "@/components/StrategySelector";
import { MatchmakingStatus } from "@/components/MatchmakingStatus";
import { GameResult } from "@/components/GameResult";
import { useState } from "react";

type GameState = "wallet" | "matchmaking" | "strategy" | "result";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("wallet");
  const [playerStrategy, setPlayerStrategy] = useState<string>("");
  
  const handleWalletConnect = () => {
    setGameState("matchmaking");
  };
  
  const handleMatchFound = () => {
    setGameState("strategy");
  };
  
  const handleStrategyLocked = (strategy: string) => {
    setPlayerStrategy(strategy);
    setGameState("result");
  };
  
  const handlePlayAgain = () => {
    setPlayerStrategy("");
    setGameState("matchmaking");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GameHeader />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold glow-text">
              Every Move Hidden. Every Win Earned.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter the battlefield where strategies are encrypted and victory belongs to the cunning.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg blur-3xl" />
            <div className="relative bg-card/30 backdrop-blur-md rounded-lg p-8 border border-border/50">
              {gameState === "wallet" && <WalletConnect onConnect={handleWalletConnect} />}
              {gameState === "matchmaking" && <MatchmakingStatus onMatchFound={handleMatchFound} />}
              {gameState === "strategy" && <StrategySelector onStrategyLocked={handleStrategyLocked} />}
              {gameState === "result" && <GameResult playerChoice={playerStrategy} onPlayAgain={handlePlayAgain} />}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary glow-text">01</div>
              <h3 className="font-semibold">Connect Wallet</h3>
              <p className="text-sm text-muted-foreground">
                Link your Rainbow Wallet to join
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary glow-text">02</div>
              <h3 className="font-semibold">Choose Strategy</h3>
              <p className="text-sm text-muted-foreground">
                Select your move in secret
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary glow-text">03</div>
              <h3 className="font-semibold">Reveal & Win</h3>
              <p className="text-sm text-muted-foreground">
                Choices decrypt simultaneously
              </p>
            </div>
          </div>
        </div>
      </main>

      <GameFooter />
    </div>
  );
};

export default Index;
