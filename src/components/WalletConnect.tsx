import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletConnectProps {
  onConnect: () => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-accent/20 bg-card/50 backdrop-blur-sm">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse-glow">
        <Wallet className="w-8 h-8 text-primary" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Connect Rainbow Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Connect your wallet to enter matchmaking
        </p>
      </div>
      <Button variant="geometric" size="lg" className="w-full" onClick={onConnect}>
        Connect Wallet
      </Button>
    </div>
  );
};
