import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, Mail, Lock, CheckCircle2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

type ForgotPasswordStep = "email" | "code" | "newpassword" | "success";

interface ForgotPasswordFlowProps {
  onBack: () => void;
}

export function ForgotPasswordFlow({ onBack }: ForgotPasswordFlowProps) {
  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("code");
    }
  };

  const handleVerifyCode = () => {
    if (code.length === 6) {
      setStep("newpassword");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setStep("success");
    }
  };

  if (step === "success") {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl mb-2">Пароль успешно изменен!</h3>
              <p className="text-gray-600">
                Теперь вы можете войти с новым паролем
              </p>
            </div>
            <Button onClick={onBack} className="w-full mt-4">
              Вернуться к входу
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === "newpassword") {
    return (
      <Card>
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep("code")}
            className="w-fit -ml-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-center">Новый пароль</CardTitle>
          <CardDescription className="text-center">
            Создайте надежный пароль для вашего аккаунта
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleResetPassword}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Минимум 8 символов"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Подтвердите пароль</Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-sm text-red-600">Пароли не совпадают</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!newPassword || newPassword !== confirmPassword}
            >
              Сохранить пароль
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  if (step === "code") {
    return (
      <Card>
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep("email")}
            className="w-fit -ml-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-center">Проверьте почту</CardTitle>
          <CardDescription className="text-center">
            Мы отправили код восстановления на<br />
            <span className="font-medium text-gray-900">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-center block">Введите код из письма</Label>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={code} onChange={setCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button
            onClick={handleVerifyCode}
            className="w-full"
            disabled={code.length !== 6}
          >
            Подтвердить
          </Button>
          <p className="text-sm text-center text-gray-600">
            Не получили код?{" "}
            <Button type="button" variant="link" className="p-0 h-auto">
              Отправить повторно
            </Button>
          </p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-fit -ml-2 mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад
        </Button>
        <CardTitle>Восстановление пароля</CardTitle>
        <CardDescription>
          Введите email для получения кода восстановления
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSendCode}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forgot-email">Электронная почта</Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="ваша@почта.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!email}>
            Отправить код
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
