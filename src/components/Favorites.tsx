import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWellness } from "@/contexts/WellnessContext";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useWellness();
  const { toast } = useToast();

  const handleRemove = (id: string) => {
    removeFavorite(id);
    toast({
      title: "Removed from favorites",
      description: "Tip removed from your saved collection",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6 pt-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/tips")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gradient-primary flex items-center gap-2">
              <Heart className="w-8 h-8 fill-secondary text-secondary" />
              Your Favorites
            </h1>
            <p className="text-muted-foreground mt-1">
              {favorites.length} saved {favorites.length === 1 ? "tip" : "tips"}
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <Card className="shadow-card border-2 backdrop-blur-sm bg-card/95">
            <CardContent className="py-12 text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground mb-4">No favorites yet</p>
              <p className="text-sm text-muted-foreground">
                Save wellness tips you'd like to revisit later
              </p>
              <Button onClick={() => navigate("/tips")} className="mt-6 bg-gradient-primary hover:opacity-90">
                Browse Tips
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4">
            {favorites.map((tip, index) => (
              <Card
                key={tip.id}
                className="border-2 backdrop-blur-sm bg-card/95 card-hover"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                      onClick={() => navigate(`/tip/${tip.id}`)}
                    >
                      <div className="text-4xl">{tip.icon}</div>
                      <CardTitle className="text-xl">{tip.title}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(tip.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.summary}</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    Saved {new Date(tip.savedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
