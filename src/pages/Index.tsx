import { GameHeader } from "@/components/GameHeader";
import { GameFooter } from "@/components/GameFooter";
import { WalletConnect } from "@/components/WalletConnect";
import { StrategySelector } from "@/components/StrategySelector";
import { useState } from "react";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

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
              {!isConnected ? (
                <WalletConnect />
              ) : (
                <StrategySelector />
              )}
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
      
      {/* Demo toggle for wallet connection */}
      <button
        onClick={() => setIsConnected(!isConnected)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-muted/50 backdrop-blur-sm rounded-md text-xs border border-border/30 hover:bg-muted/80 transition-colors"
      >
        Demo: {isConnected ? "Disconnect" : "Connect"} Wallet
      </button>
    </div>
  );
};

export default Index;
