import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BirthdayReveal = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/celebration");
    }, 5000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 overflow-hidden">
      <div className="text-center space-y-8">
        <div className="animate-bounce-in">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
            🎉
          </h1>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-celebration bg-clip-text text-transparent mb-6">
            Happy Birthday
          </h2>
        </div>
        
        <div className="animate-scale-in" style={{ animationDelay: "0.6s" }}>
          <h1 className="text-6xl md:text-8xl font-bold text-primary">
            Bhawna! 🎂
          </h1>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.9s" }}>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Get ready for something special...
          </p>
        </div>

        <div className="animate-fade-in mt-8" style={{ animationDelay: "1.2s" }}>
          <div className="text-8xl md:text-9xl font-bold text-primary animate-pulse">
            {countdown}
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 left-10 text-6xl animate-float">🎈</div>
        <div className="absolute top-20 right-10 text-6xl animate-float" style={{ animationDelay: "0.5s" }}>🎀</div>
        <div className="absolute bottom-20 left-20 text-6xl animate-float" style={{ animationDelay: "1s" }}>✨</div>
        <div className="absolute bottom-10 right-20 text-6xl animate-float" style={{ animationDelay: "1.5s" }}>💖</div>
      </div>
    </div>
  );
};

export default BirthdayReveal;
