import { useState } from "react";
import { LoginForm } from "./auth/LoginForm";
import { RegisterForm } from "./auth/RegisterForm";
import { ForgotPasswordFlow } from "./auth/ForgotPasswordFlow";
import { UtensilsCrossed } from "lucide-react";

type AuthView = "login" | "register" | "forgot-password";

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [view, setView] = useState<AuthView>("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <UtensilsCrossed className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">Умная Столовая</h1>
          <p className="text-gray-600">Панель управления</p>
        </div>

        {view === "login" && (
          <LoginForm
            onLogin={onLogin}
            onSwitchToRegister={() => setView("register")}
            onForgotPassword={() => setView("forgot-password")}
          />
        )}

        {view === "register" && (
          <RegisterForm
            onRegister={onLogin}
            onSwitchToLogin={() => setView("login")}
          />
        )}

        {view === "forgot-password" && (
          <ForgotPasswordFlow onBack={() => setView("login")} />
        )}
      </div>
    </div>
  );
}
