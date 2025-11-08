import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NameEntry = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().toLowerCase() === "chhotu") {
      toast.success("Welcome, Chhotu! 💕");
      navigate("/upload");
    } else {
      toast.error("Invalid request. This page is for someone special! 🎀");
      setName("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="animate-fade-in text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 animate-bounce-in">
            ✨ Special Entry ✨
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Only someone very special can enter...
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <div className="bg-card p-8 rounded-2xl shadow-soft border-2 border-primary/20">
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              What's your special name?
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="text-lg h-12 border-2 border-primary/30 focus:border-primary rounded-xl"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            variant="celebration" 
            size="xl" 
            className="w-full"
          >
            Continue 💖
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NameEntry;
