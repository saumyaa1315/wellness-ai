import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWellness } from "@/contexts/WellnessContext";
import { Gender, WellnessGoal } from "@/types/wellness";
import { Heart } from "lucide-react";

const goalOptions: { value: WellnessGoal; label: string; icon: string }[] = [
  { value: "weight-loss", label: "Weight Loss", icon: "⚖️" },
  { value: "stress-relief", label: "Stress Relief", icon: "🧘" },
  { value: "better-sleep", label: "Better Sleep", icon: "😴" },
  { value: "energy-boost", label: "Energy Boost", icon: "⚡" },
  { value: "fitness", label: "Fitness", icon: "💪" },
  { value: "mental-clarity", label: "Mental Clarity", icon: "🧠" },
];

export const ProfileForm = () => {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<Gender | "">("");
  const [goal, setGoal] = useState<WellnessGoal | "">("");
  const { setProfile } = useWellness();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!age || !gender || !goal) return;
    
    setProfile({
      age: parseInt(age),
      gender: gender as Gender,
      goal: goal as WellnessGoal,
    });
    
    navigate("/tips");
  };

  const isValid = age && parseInt(age) > 0 && parseInt(age) < 120 && gender && goal;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      <div className="w-full max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary shadow-glow mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient-primary">
            Wellness Journey
          </h1>
          <p className="text-muted-foreground text-lg">
            Let's personalize your wellness experience
          </p>
        </div>

        <Card className="shadow-card border-2 backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle>Tell us about yourself</CardTitle>
            <CardDescription>
              We'll create personalized wellness tips just for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="1"
                  max="120"
                  required
                  className="transition-all focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={(value) => setGender(value as Gender)}>
                  <SelectTrigger id="gender" className="transition-all focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Wellness Goal</Label>
                <Select value={goal} onValueChange={(value) => setGoal(value as WellnessGoal)}>
                  <SelectTrigger id="goal" className="transition-all focus:ring-2 focus:ring-primary">
                    <SelectValue placeholder="Choose your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex items-center gap-2">
                          <span>{option.icon}</span>
                          <span>{option.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={!isValid}
                className="w-full bg-gradient-primary hover:opacity-90 transition-all shadow-soft hover:shadow-glow"
                size="lg"
              >
                Get My Wellness Tips
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
