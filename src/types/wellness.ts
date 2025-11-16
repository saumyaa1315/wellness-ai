export type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";

export type WellnessGoal =
  | "weight-loss"
  | "stress-relief"
  | "better-sleep"
  | "energy-boost"
  | "fitness"
  | "mental-clarity";

export interface UserProfile {
  age: number;
  gender: Gender;
  goal: WellnessGoal;
}

export interface WellnessTip {
  id: string;
  title: string;
  summary: string;
  icon: string;
  details?: string;
  actionPlan?: string[];
}

export interface FavoriteTip extends WellnessTip {
  savedAt: string;
}
