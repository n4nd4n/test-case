import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const ImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file! 🖼️");
      return;
    }

    setUploading(true);
    toast.loading("Processing your beautiful photo... ✨");

    try {
      const imageUrl = URL.createObjectURL(file);
      
      setPreview(imageUrl);
      localStorage.setItem("userImage", imageUrl);
      
      toast.dismiss();
      toast.success("Perfect! Your photo is ready! 💖");
      
      setTimeout(() => {
        navigate("/birthday");
      }, 1500);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.dismiss();
      toast.error("Oops! Let's try another photo 📸");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="animate-fade-in text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-bounce-in">
            📸 Share Your Smile
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Upload a beautiful photo of yourself!
          </p>
        </div>

        <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <div className="bg-card p-8 rounded-2xl shadow-soft border-2 border-primary/20">
            <label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center w-full h-64 border-4 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                uploading
                  ? "border-primary bg-primary/5"
                  : "border-primary/40 hover:border-primary hover:bg-primary/5"
              }`}
            >
              {preview ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-full border-4 border-primary shadow-glow"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-16 h-16 mb-4 text-primary animate-float" />
                  <p className="mb-2 text-lg font-semibold text-primary">
                    Click to upload
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Choose a beautiful photo of yourself 💕
                  </p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>

            {uploading && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Making it perfect...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
