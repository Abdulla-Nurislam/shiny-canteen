import { useState } from "react";
import { MenuItem, CartItem, UserProfile, Order } from "../App";
import { MainMenu } from "./customer/MainMenu";
import { MyCart } from "./customer/MyCart";
import { UserAccount } from "./customer/UserAccount";
import { Button } from "./ui/button";
import { UtensilsCrossed, ShoppingCart, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { OrderStatus } from "./OrderStatus";

interface CustomerAppProps {
  userProfile: UserProfile;
  onLogout: () => void;
  onUpdateBalance: (newBalance: number) => void;
}

const SCHOOL_MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Пюре с котлетой",
    description: "Нежное картофельное пюре с сочной мясной котлетой",
    price: 850,
    category: "Основные блюда",
    image: "mashed-potatoes-cutlet",
    calories: 450,
    protein: 22,
    carbs: 48,
    fat: 18,
    ingredients: ["Картофель", "Говядина", "Лук", "Молоко", "Масло", "Соль", "Перец"],
    prepTime: 15,
  },
  {
    id: "2",
    name: "Макароны по-флотски",
    description: "Классические макароны с мясным фаршем",
    price: 750,
    category: "Основные блюда",
    image: "pasta-meat",
    calories: 520,
    protein: 24,
    carbs: 62,
    fat: 20,
    ingredients: ["Макароны", "Фарш говяжий", "Лук", "Морковь", "Томатная паста", "Специи"],
    prepTime: 12,
  },
  {
    id: "3",
    name: "Каша манная молочная",
    description: "Нежная молочная каша с маслом",
    price: 400,
    category: "Завтраки",
    image: "porridge",
    calories: 280,
    protein: 8,
    carbs: 42,
    fat: 9,
    ingredients: ["Манная крупа", "Молоко", "Сахар", "Масло сливочное", "Соль"],
    prepTime: 8,
  },
  {
    id: "4",
    name: "Суп гороховый с гренками",
    description: "Наваристый гороховый суп с хрустящими гренками",
    price: 650,
    category: "Супы",
    image: "pea-soup",
    calories: 320,
    protein: 14,
    carbs: 45,
    fat: 10,
    ingredients: ["Горох", "Картофель", "Морковь", "Лук", "Копчености", "Гренки", "Зелень"],
    prepTime: 10,
  },
  {
    id: "5",
    name: "Рис отварной с подливой",
    description: "Рассыпчатый рис с мясной подливой",
    price: 700,
    category: "Основные блюда",
    image: "rice-gravy",
    calories: 410,
    protein: 18,
    carbs: 58,
    fat: 12,
    ingredients: ["Рис", "Мясо", "Лук", "Морковь", "Томатная паста", "Специи"],
    prepTime: 14,
  },
  {
    id: "6",
    name: "Сосиска в тесте",
    description: "Свежая выпечка с сочной сосиской",
    price: 300,
    category: "Выпечка",
    image: "sausage-roll",
    calories: 340,
    protein: 12,
    carbs: 38,
    fat: 16,
    ingredients: ["Тесто", "Сосиска", "Масло", "Яйцо"],
    prepTime: 5,
  },
  {
    id: "7",
    name: "Булочка с маком",
    description: "Ароматная сдобная булочка с маковой начинкой",
    price: 200,
    category: "Выпечка",
    image: "poppy-bun",
    calories: 260,
    protein: 6,
    carbs: 42,
    fat: 8,
    ingredients: ["Мука", "Мак", "Сахар", "Молоко", "Дрожжи", "Масло"],
    prepTime: 3,
  },
  {
    id: "8",
    name: "Компот из сухофруктов",
    description: "Ароматный витаминный напиток",
    price: 150,
    category: "Напитки",
    image: "compote",
    calories: 80,
    protein: 1,
    carbs: 20,
    fat: 0,
    ingredients: ["Яблоки сушеные", "Груша сушеная", "Чернослив", "Изюм", "Сахар"],
    prepTime: 2,
  },
];

export function CustomerApp({ userProfile, onLogout, onUpdateBalance }: CustomerAppProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState("menu");
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    const newOrder: Order = {
      id: (orders.length + 1).toString(),
      items: cart,
      total: cartTotal,
      status: "preparing",
      orderTime: new Date(),
      estimatedTime: 10,
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    onUpdateBalance(userProfile.balance - cartTotal);
    setCart([]);
    setActiveTab("profile");
    setShowOrderHistory(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl">Столовая</h1>
                <p className="text-sm text-gray-600">Добро пожаловать, {userProfile.fullName.split(' ')[0]}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right mr-3">
                <p className="text-sm text-gray-600">Ваш баланс</p>
                <p className="font-medium">{userProfile.balance.toLocaleString('ru-RU')} ₸</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-6">
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              Меню
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Корзина
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 min-w-5 rounded-full p-1">
                  {cartItemCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <MainMenu items={SCHOOL_MENU_ITEMS} onAddToCart={addToCart} />
          </TabsContent>

          <TabsContent value="cart">
            <MyCart
              items={cart}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              userBalance={userProfile.balance}
              onCheckout={handleCheckout}
            />
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <UserAccount
                userProfile={userProfile}
                onLogout={onLogout}
                onShowOrderHistory={() => setShowOrderHistory(true)}
              />
              {showOrderHistory && <OrderStatus orders={orders} />}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
