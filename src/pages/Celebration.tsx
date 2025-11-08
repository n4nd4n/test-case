import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { toast } from "sonner";

const Celebration = () => {
  const [showButton, setShowButton] = useState(false);
  const [balloons, setBalloons] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate balloons
    const balloonArray = Array.from({ length: 30 }, (_, i) => i);
    setBalloons(balloonArray);

    // Show button after delay
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    // Try to play music
    playMusic();

    return () => clearTimeout(timer);
  }, []);

  const playMusic = () => {
    // Note: Music will need to be added by the user
    toast.info("🎵 Add your favorite birthday song to the public folder as 'birthday-song.mp3'");
    
    try {
      const audio = new Audio("/birthday-song.mp3");
      audio.loop = true;
      audio.play().catch(() => {
        console.log("Autoplay prevented - user interaction needed");
      });
    } catch (error) {
      console.log("Music file not found yet");
    }
  };

  const handleCutCake = () => {
    navigate("/cake");
  };

  const colors = ["bg-primary", "bg-secondary", "bg-accent"];
  
  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4 overflow-hidden relative">
      {/* Balloons */}
      {balloons.map((balloon, index) => (
        <div
          key={balloon}
          className={`absolute bottom-0 ${colors[index % colors.length]} w-12 h-14 rounded-full animate-balloon-rise`}
          style={{
            left: `${(index * 3.5) % 100}%`,
            animationDelay: `${index * 0.2}s`,
            animationDuration: `${6 + (index % 3)}s`,
          }}
        >
          <div className="absolute bottom-0 left-1/2 w-px h-16 bg-gray-400"></div>
        </div>
      ))}

      {/* Content */}
      <div className="text-center z-10 space-y-8">
        <div className="animate-bounce-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-celebration bg-clip-text text-transparent mb-4">
            🎊 Let's Celebrate! 🎊
          </h1>
        </div>

        <div className="flex items-center justify-center gap-2 text-2xl text-muted-foreground animate-fade-in">
          <Volume2 className="animate-pulse" />
          <span>Playing birthday vibes...</span>
        </div>

        {showButton && (
          <div className="animate-scale-in">
            <Button
              onClick={handleCutCake}
              variant="celebration"
              size="xl"
              className="text-2xl py-8 px-12"
            >
              🎂 Let's Cut the Cake! 🎂
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Celebration;
