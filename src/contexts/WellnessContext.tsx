import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, WellnessTip, FavoriteTip } from "@/types/wellness";

interface WellnessContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  tips: WellnessTip[];
  setTips: (tips: WellnessTip[]) => void;
  favorites: FavoriteTip[];
  addFavorite: (tip: WellnessTip) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tips, setTips] = useState<WellnessTip[]>([]);
  const [favorites, setFavorites] = useState<FavoriteTip[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wellness-favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load favorites:", e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("wellness-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (tip: WellnessTip) => {
    const favorite: FavoriteTip = {
      ...tip,
      savedAt: new Date().toISOString(),
    };
    setFavorites((prev) => [favorite, ...prev]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <WellnessContext.Provider
      value={{
        profile,
        setProfile,
        tips,
        setTips,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error("useWellness must be used within WellnessProvider");
  }
  return context;
};
