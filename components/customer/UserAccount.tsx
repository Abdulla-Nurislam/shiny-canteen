import { UserProfile } from "../../App";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { User, Mail, Phone, Wallet, Calendar, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface UserAccountProps {
  userProfile: UserProfile;
  onLogout: () => void;
  onShowOrderHistory: () => void;
}

export function UserAccount({ userProfile, onLogout, onShowOrderHistory }: UserAccountProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Личный кабинет</h2>
        <p className="text-gray-600">Информация о вашем аккаунте</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle>{userProfile.fullName}</CardTitle>
              <CardDescription>Студент</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Электронная почта</p>
                <p>{userProfile.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Номер телефона</p>
                <p>{userProfile.phone}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Wallet className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Текущий баланс</p>
                <p className="text-2xl">{userProfile.balance.toLocaleString('ru-RU')} ₸</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Пополнить баланс
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Дата регистрации</p>
                <p>
                  {userProfile.registrationDate.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Настройки аккаунта</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Изменить пароль
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Редактировать профиль
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onShowOrderHistory}
          >
            История заказов
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Выйти из аккаунта
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Выйти из аккаунта?</AlertDialogTitle>
                <AlertDialogDescription>
                  Вы уверены, что хотите выйти? Вам потребуется снова войти для доступа к системе.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={onLogout}>
                  Выйти
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>Версия приложения: 1.0.4</p>
        <p className="mt-1"></p>
      </div>
    </div>
  );
}
