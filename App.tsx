import { useState } from "react";
import { AuthScreen } from "./components/AuthScreen";
import { CustomerApp } from "./components/CustomerApp";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  prepTime: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  balance: number;
  registrationDate: Date;
}

export type OrderStatus = "preparing" | "ready" | "completed";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  orderTime: Date;
  estimatedTime: number;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] =
    useState<UserProfile | null>(null);

  const handleUpdateBalance = (newBalance: number) => {
    setUserProfile((prev) =>
      prev ? { ...prev, balance: newBalance } : prev
    );
  };

  const handleLogin = (email: string) => {
    setUserProfile({
      fullName: "Алексей Иванов",
      email: email,
      phone: "+7 (777) 123-45-67",
      balance: 5000,
      registrationDate: new Date("2024-09-01"),
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  if (!isAuthenticated || !userProfile) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <CustomerApp
      userProfile={userProfile}
      onLogout={handleLogout}
      onUpdateBalance={handleUpdateBalance}
    />
  );
}