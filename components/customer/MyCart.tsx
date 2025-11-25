import { CartItem } from "../../App";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Minus, Plus, ShoppingCart, Trash2, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
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
import { toast } from "sonner@2.0.3";

interface MyCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  userBalance: number;
  onCheckout: () => void;
}

const IMAGE_MAP: Record<string, string> = {
  "mashed-potatoes-cutlet": "https://images.unsplash.com/photo-1762631383362-bad467f94a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNoZWQlMjBwb3RhdG9lcyUyMGN1dGxldHxlbnwxfHx8fDE3NjQwMTUyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "pasta-meat": "https://images.unsplash.com/photo-1553842306-6ea7d5c6b152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMG1lYXQlMjBkaXNofGVufDF8fHx8MTc2NDAxNTIxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "porridge": "https://images.unsplash.com/photo-1610450622351-340b283813b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JyaWRnZSUyMGJyZWFrZmFzdCUyMGJvd2x8ZW58MXx8fHwxNzY0MDE1MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "pea-soup": "https://images.unsplash.com/photo-1609171590547-6efb2a61b1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWElMjBzb3VwfGVufDF8fHx8MTc2NDAxNTIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "rice-gravy": "https://images.unsplash.com/photo-1747518596416-2da5e5218d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZ3Jhdnl8ZW58MXx8fHwxNzY0MDE1MjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "sausage-roll": "https://images.unsplash.com/photo-1673960782730-ab13fc062d6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVzYWdlJTIwcm9sbHxlbnwxfHx8fDE3NjQwMTUyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "poppy-bun": "https://images.unsplash.com/photo-1745118845351-7033b364d196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3BweSUyMHNlZWQlMjBidW58ZW58MXx8fHwxNzY0MDE1MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "compote": "https://images.unsplash.com/photo-1608576210916-1aa6dc4a274b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMGNvbXBvdGUlMjBkcmlua3xlbnwxfHx8fDE3NjQwMTUyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

export function MyCart({ items, onUpdateQuantity, onRemoveItem, userBalance, onCheckout }: MyCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasInsufficientBalance = total > userBalance;

  const handleCheckout = () => {
    if (hasInsufficientBalance) {
      toast.error("Недостаточно средств на балансе");
      return;
    }
    toast.success("Заказ успешно оформлен!");
    onCheckout();
  };

  if (items.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500 text-center">Ваша корзина пуста</p>
          <p className="text-sm text-gray-400 text-center mt-1">
            Добавьте блюда из меню
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Моя корзина</h2>
        <p className="text-gray-600">
          {items.length} {items.length === 1 ? 'позиция' : items.length < 5 ? 'позиции' : 'позиций'}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={IMAGE_MAP[item.image]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {item.price.toLocaleString('ru-RU')} ₸ за порцию
                      </p>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить из корзины?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы уверены, что хотите удалить "{item.name}" из корзины?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onRemoveItem(item.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-xl">
                        {(item.price * item.quantity).toLocaleString('ru-RU')} ₸
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Итого</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Сумма заказа</span>
              <span>{total.toLocaleString('ru-RU')} ₸</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ваш баланс</span>
              <span className={hasInsufficientBalance ? "text-red-600" : ""}>
                {userBalance.toLocaleString('ru-RU')} ₸
              </span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between text-lg">
            <span>К оплате</span>
            <span>{total.toLocaleString('ru-RU')} ₸</span>
          </div>

          {hasInsufficientBalance && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800">
                  Недостаточно средств на балансе
                </p>
                <p className="text-sm text-red-600 mt-1">
                  Необходимо пополнить на {(total - userBalance).toLocaleString('ru-RU')} ₸
                </p>
              </div>
            </div>
          )}

          {!hasInsufficientBalance && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                После оплаты останется: {(userBalance - total).toLocaleString('ru-RU')} ₸
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleCheckout}
            className="w-full"
            size="lg"
            disabled={hasInsufficientBalance}
          >
            Оформить заказ
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
