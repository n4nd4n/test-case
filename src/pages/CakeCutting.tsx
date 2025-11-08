import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import cakeImage from "@/assets/cake.png";
import VideoModal from "@/components/VideoModal";

const CakeCutting = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [candlesLit, setCandlesLit] = useState(true);
  const [cakeSliced, setCakeSliced] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const giftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    setUserImage(storedImage);

    // Stage 1: Blow candles after 3 seconds
    const timer1 = setTimeout(() => {
      setCandlesLit(false);
    }, 3000);

    // Stage 2: Cut cake after candles are blown (5 seconds)
    const timer2 = setTimeout(() => {
      setCakeSliced(true);
    }, 5000);

    // Stage 3: Show message after cake cutting (7 seconds)
    const timer3 = setTimeout(() => {
      setShowMessage(true);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const scrollToGift = () => {
    giftRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 md:p-8 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 text-5xl animate-float opacity-30">💖</div>
      <div className="absolute top-20 right-20 text-4xl animate-float opacity-30" style={{ animationDelay: "0.5s" }}>✨</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-float opacity-30" style={{ animationDelay: "1s" }}>🌸</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-float opacity-30" style={{ animationDelay: "1.5s" }}>🦋</div>
      <div className="absolute top-1/4 left-10 text-5xl animate-float opacity-40" style={{ animationDelay: "0.7s" }}>🕷️</div>
      <div className="absolute bottom-1/3 right-16 text-5xl animate-float opacity-40" style={{ animationDelay: "1.2s" }}>🕸️</div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-celebration bg-clip-text text-transparent mb-4">
            🎂 Time to Cut the Cake! 🎂
          </h1>
          <p className="text-lg text-muted-foreground">
            {candlesLit ? "Make a wish, Chhotu! 🕯️" : !cakeSliced ? "Let's cut the cake! 🎂" : "Yay! Enjoy your slice! 🍰"}
          </p>
        </div>

        {/* Cake and decorations scene */}
        <div className="relative bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 rounded-3xl shadow-glow p-8 md:p-12 mb-8 animate-scale-in overflow-hidden border-2 border-primary/10">
          {/* Background balloons */}
          <div className="absolute top-4 left-4 text-4xl animate-float">🎈</div>
          <div className="absolute top-4 right-4 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>🎈</div>
          <div className="absolute top-1/2 left-2 text-4xl animate-float" style={{ animationDelay: "1s" }}>🎈</div>
          <div className="absolute top-1/2 right-2 text-4xl animate-float" style={{ animationDelay: "1.5s" }}>🎈</div>

          {/* More decorative elements */}
          <div className="absolute top-8 left-1/4 text-3xl animate-bounce-in" style={{ animationDelay: "0.3s" }}>🌟</div>
          <div className="absolute top-8 right-1/4 text-3xl animate-bounce-in" style={{ animationDelay: "0.6s" }}>💫</div>
          <div className="absolute bottom-8 left-1/3 text-3xl animate-bounce-in" style={{ animationDelay: "0.9s" }}>🌺</div>
          <div className="absolute bottom-8 right-1/3 text-3xl animate-bounce-in" style={{ animationDelay: "1.2s" }}>🎀</div>

          {/* Main content */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10">
            {/* User image cutout */}
            {userImage && (
              <div className="animate-bounce-in">
                <img
                  src={userImage}
                  alt="You"
                  className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-primary shadow-glow drop-shadow-2xl"
                />
              </div>
            )}

            {/* Cake with candles */}
            <div className="relative">
              <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
                <img
                  src={cakeImage}
                  alt="Birthday Cake"
                  className={`w-64 h-64 md:w-80 md:h-80 object-contain transition-all duration-1000 ${
                    cakeSliced ? "translate-x-8 md:translate-x-12" : ""
                  }`}
                />

                {/* Candle flames - disappear when blown */}
                <div
                  className={`absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 transition-all duration-1000 ${
                    !candlesLit ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                >
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="text-3xl animate-float"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      🕯️
                    </div>
                  ))}
                </div>

                {/* Smoke after blowing candles */}
                {!candlesLit && !cakeSliced && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 animate-fade-in">
                    <div className="text-4xl opacity-50">💨</div>
                  </div>
                )}

                {/* Sliced piece */}
                {cakeSliced && (
                  <div className="absolute top-1/2 -right-16 md:-right-24 animate-fade-in">
                    <div className="text-6xl md:text-7xl animate-bounce-in">🍰</div>
                  </div>
                )}

                {/* Sparkles when cake is cut */}
                {cakeSliced && (
                  <>
                    <div className="absolute top-0 left-0 text-3xl animate-bounce-in">✨</div>
                    <div className="absolute top-0 right-0 text-3xl animate-bounce-in" style={{ animationDelay: "0.2s" }}>✨</div>
                    <div className="absolute bottom-0 left-0 text-3xl animate-bounce-in" style={{ animationDelay: "0.4s" }}>✨</div>
                    <div className="absolute bottom-0 right-0 text-3xl animate-bounce-in" style={{ animationDelay: "0.6s" }}>✨</div>
                  </>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 text-3xl animate-bounce-in" style={{ animationDelay: "0.6s" }}>
                💝
              </div>
              <div className="absolute -bottom-4 -left-4 text-3xl animate-bounce-in" style={{ animationDelay: "0.9s" }}>
                🎀
              </div>
              <div className="absolute top-1/2 -left-8 text-3xl animate-float" style={{ animationDelay: "1.2s" }}>
                🌸
              </div>
              <div className="absolute top-1/2 -right-8 text-3xl animate-float" style={{ animationDelay: "1.5s" }}>
                🦋
              </div>
            </div>
          </div>
        </div>

        {/* Birthday message and wishes */}
        {showMessage && (
          <div className="animate-fade-in space-y-8">
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-3xl shadow-glow p-8 md:p-12 border-2 border-primary/30 relative overflow-hidden">
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 text-3xl animate-bounce-in">🌸</div>
              <div className="absolute top-4 right-4 text-3xl animate-bounce-in" style={{ animationDelay: "0.2s" }}>🌸</div>
              <div className="absolute bottom-4 left-4 text-3xl animate-bounce-in" style={{ animationDelay: "0.4s" }}>💖</div>
              <div className="absolute bottom-4 right-4 text-3xl animate-bounce-in" style={{ animationDelay: "0.6s" }}>💖</div>

              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-celebration bg-clip-text text-transparent mb-6 text-center relative z-10">
                💝 A Special Message for You 💝
              </h2>

              <p className="text-lg md:text-xl text-foreground leading-relaxed text-center max-w-3xl mx-auto mb-8 relative z-10">
                Happy Birthday, Bhawna! 🎉 From that day we met in Class 9th to now, you've been more than just a friend - you're my best friend, my confidant, and someone who means the absolute world to me. Every moment we've shared, every laugh, every conversation has been a treasure. Your presence in my life has made it so much brighter and more beautiful. Thank you for being you, for being there, and for being such an incredible friend. Here's to many more years of friendship, laughter, and unforgettable memories together. May this year bring you endless joy, success, and all the happiness you deserve. You're truly special, Chhotu, and I'm so grateful to have you in my life! 🌟💖
              </p>

              <div className="text-center relative z-10">
                <Button
                  onClick={scrollToGift}
                  variant="celebration"
                  size="xl"
                  className="animate-bounce-in shadow-glow"
                >
                  🎁 Open Your Gift 🎁
                </Button>
              </div>
            </div>

            {/* Gift section */}
            <div
              ref={giftRef}
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-purple-950/20 rounded-3xl shadow-glow p-8 md:p-12 border-2 border-secondary/30 animate-scale-in relative overflow-hidden"
            >
              {/* Floating hearts */}
              <div className="absolute top-8 left-8 text-4xl animate-float opacity-40">💕</div>
              <div className="absolute top-8 right-8 text-4xl animate-float opacity-40" style={{ animationDelay: "0.5s" }}>💕</div>
              <div className="absolute bottom-8 left-1/4 text-4xl animate-float opacity-40" style={{ animationDelay: "1s" }}>✨</div>
              <div className="absolute bottom-8 right-1/4 text-4xl animate-float opacity-40" style={{ animationDelay: "1.5s" }}>✨</div>

              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-celebration bg-clip-text text-transparent mb-6 text-center relative z-10">
                🎁 Your Special Gift 🎁
              </h2>

              <div className="text-center space-y-6 relative z-10">
                <div className="text-8xl mb-4 animate-bounce-in">🎁</div>
                <p className="text-xl text-foreground mb-6">
                  I've made something special just for you! 💖
                </p>

                <Button
                  onClick={() => setShowVideo(true)}
                  variant="celebration"
                  size="xl"
                  className="animate-scale-in shadow-glow inline-flex items-center gap-2"
                >
                  🎬 Watch Your Special Video 🎬
                </Button>

                <p className="text-sm text-muted-foreground mt-4">
                  Click above to watch the video I made for you! 🌟
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <VideoModal open={showVideo} onClose={() => setShowVideo(false)} src="/video/surprise.mp4" muted={true} />
    </div>
  );
};

export default CakeCutting;
