import logo from "@/assets/logo.png";

export const GameHeader = () => {
  return (
    <header className="w-full py-6 border-b border-border/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Shadow Mind Duel" className="w-12 h-12" />
            <h1 className="text-2xl font-bold glow-text">Shadow Mind Duel</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden md:block">
            Every Move Hidden. Every Win Earned.
          </p>
        </div>
      </div>
    </header>
  );
};
