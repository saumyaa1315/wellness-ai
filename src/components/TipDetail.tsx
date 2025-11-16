import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Heart, Loader2, CheckCircle2 } from "lucide-react";

export const TipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tips, addFavorite, removeFavorite, isFavorite } = useWellness();
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const { toast } = useToast();

  const tip = tips.find((t) => t.id === id);
  const favorite = isFavorite(id || "");

  useEffect(() => {
    if (!tip) {
      navigate("/tips");
      return;
    }

    if (!tip.details) {
      loadDetails();
    }
  }, [tip]);

  const loadDetails = async () => {
    if (!tip) return;

    setIsLoadingDetails(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-wellness-tips", {
        body: {
          tipTitle: tip.title,
          type: "details",
        },
      });

      if (error) throw error;

      if (!data || !data.details || !data.actionPlan) {
        throw new Error("Invalid response format");
      }

      // Update the tip with details
      tip.details = data.details;
      tip.actionPlan = data.actionPlan;
    } catch (error) {
      console.error("Error loading details:", error);
      toast({
        title: "Failed to load details",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const toggleFavorite = () => {
    if (!tip) return;

    if (favorite) {
      removeFavorite(tip.id);
      toast({
        title: "Removed from favorites",
        description: "Tip removed from your saved collection",
      });
    } else {
      addFavorite(tip);
      toast({
        title: "❤️ Added to favorites!",
        description: "You can find this in your favorites",
      });
    }
  };

  if (!tip) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6 pt-8">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/tips")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tips
          </Button>
          <Button
            variant={favorite ? "default" : "outline"}
            onClick={toggleFavorite}
            className={favorite ? "bg-gradient-secondary hover:opacity-90" : ""}
          >
            <Heart className={`w-4 h-4 mr-2 ${favorite ? "fill-current" : ""}`} />
            {favorite ? "Saved" : "Save"}
          </Button>
        </div>

        <Card className="shadow-card border-2 backdrop-blur-sm bg-card/95 animate-in fade-in slide-in-from-bottom-4">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="text-6xl">{tip.icon}</div>
              <CardTitle className="text-3xl">{tip.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground">{tip.summary}</p>

            {isLoadingDetails ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {tip.details && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gradient-primary">
                      Why This Matters
                    </h3>
                    <div className="prose prose-lg max-w-none text-foreground">
                      {tip.details.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {tip.actionPlan && tip.actionPlan.length > 0 && (
                  <div className="space-y-4 bg-muted/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gradient-secondary flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" />
                      Your Action Plan
                    </h3>
                    <ul className="space-y-3">
                      {tip.actionPlan.map((step, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold shadow-soft">
                            {index + 1}
                          </div>
                          <p className="flex-1 pt-1 text-base leading-relaxed">{step}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
