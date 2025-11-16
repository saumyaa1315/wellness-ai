import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Heart, Sparkles } from "lucide-react";

export const TipsDisplay = () => {
  const { profile, tips, setTips, isLoading, setIsLoading, isFavorite } = useWellness();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!profile) {
      navigate("/");
      return;
    }

    if (tips.length === 0) {
      generateTips();
    }
  }, [profile]);

  const generateTips = async () => {
    if (!profile) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-wellness-tips", {
        body: {
          age: profile.age,
          gender: profile.gender,
          goal: profile.goal,
          type: "generate",
        },
      });

      if (error) throw error;

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      // Add unique IDs to tips
      const tipsWithIds = data.map((tip, index) => ({
        ...tip,
        id: `${Date.now()}-${index}`,
      }));

      setTips(tipsWithIds);
      toast({
        title: "✨ Tips generated!",
        description: "Here are your personalized wellness recommendations",
      });
    } catch (error: any) {
      console.error("Error generating tips:", error);
      
      if (error.message?.includes("Rate limit")) {
        toast({
          title: "Slow down there!",
          description: "Please wait a moment before generating new tips.",
          variant: "destructive",
        });
      } else if (error.message?.includes("usage limit")) {
        toast({
          title: "Usage limit reached",
          description: "Please add credits to continue using AI features.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Oops!",
          description: "Failed to generate tips. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
          <p className="text-lg text-muted-foreground">Crafting your personalized tips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary flex items-center gap-2">
              <Sparkles className="w-8 h-8" />
              Your Wellness Tips
            </h1>
            <p className="text-muted-foreground mt-1">
              Personalized recommendations for your journey
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/favorites")}
              className="shadow-soft"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              onClick={generateTips}
              disabled={isLoading}
              className="bg-gradient-secondary hover:opacity-90 shadow-soft"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {tips.map((tip, index) => (
            <Card
              key={tip.id}
              onClick={() => navigate(`/tip/${tip.id}`)}
              className="cursor-pointer card-hover border-2 backdrop-blur-sm bg-card/95"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{tip.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{tip.title}</CardTitle>
                    </div>
                  </div>
                  {isFavorite(tip.id) && (
                    <Heart className="w-5 h-5 fill-secondary text-secondary" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{tip.summary}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {tips.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tips generated yet. Click "Regenerate" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};
