export const GameFooter = () => {
  return (
    <footer className="w-full py-4 border-t border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-slide-pulse" />
      </div>
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-muted-foreground">
          Shadow Mind Duel © 2025
        </p>
      </div>
    </footer>
  );
};
