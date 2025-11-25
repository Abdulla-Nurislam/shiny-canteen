import { useState } from "react";
import { MenuItem } from "../App";
import { MenuItemsList } from "./admin/MenuItemsList";
import { Button } from "./ui/button";
import { UtensilsCrossed, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface AdminDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Салат с курицей гриль",
    description: "Свежая зелень с курицей гриль, помидорами черри и бальзамической заправкой",
    price: 8.99,
    category: "Салаты",
    image: "healthy salad bowl",
    calories: 320,
    protein: 35,
    carbs: 12,
    fat: 15,
    isVegetarian: false,
    isVegan: false,
    allergens: [],
    prepTime: 10,
    status: "active",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Пицца Маргарита",
    description: "Классическая пицца со свежей моцареллой, томатным соусом и базиликом",
    price: 10.99,
    category: "Основные блюда",
    image: "margherita pizza",
    calories: 580,
    protein: 22,
    carbs: 68,
    fat: 24,
    isVegetarian: true,
    isVegan: false,
    allergens: ["Глютен", "Молочные продукты"],
    prepTime: 15,
    status: "active",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Веган Боул",
    description: "Киноа, запеченные овощи, нут, авокадо и заправка тахини",
    price: 9.49,
    category: "Салаты",
    image: "vegan buddha bowl",
    calories: 450,
    protein: 18,
    carbs: 52,
    fat: 20,
    isVegetarian: true,
    isVegan: true,
    allergens: ["Кунжут"],
    prepTime: 12,
    status: "active",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    name: "Бургер Делюкс",
    description: "Говяжья котлета Ангус с сыром, салатом, помидором и специальным соусом",
    price: 11.99,
    category: "Основные блюда",
    image: "gourmet burger",
    calories: 720,
    protein: 38,
    carbs: 45,
    fat: 42,
    isVegetarian: false,
    isVegan: false,
    allergens: ["Глютен", "Молочные продукты"],
    prepTime: 18,
    status: "active",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "5",
    name: "Капучино",
    description: "Насыщенный эспрессо с молоком и пенкой",
    price: 3.99,
    category: "Напитки",
    image: "cappuccino coffee",
    calories: 120,
    protein: 6,
    carbs: 12,
    fat: 4,
    isVegetarian: true,
    isVegan: false,
    allergens: ["Молочные продукты"],
    prepTime: 5,
    status: "active",
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "6",
    name: "Паста Карбонара",
    description: "Сливочная паста с беконом, яйцом, пармезаном и черным перцем",
    price: 12.49,
    category: "Основные блюда",
    image: "pasta carbonara",
    calories: 680,
    protein: 28,
    carbs: 72,
    fat: 32,
    isVegetarian: false,
    isVegan: false,
    allergens: ["Глютен", "Молочные продукты", "Яйца"],
    prepTime: 20,
    status: "outofstock",
    createdAt: new Date("2024-02-05"),
  },
  {
    id: "7",
    name: "Зелёный Смузи",
    description: "Шпинат, банан, манго и кокосовая вода",
    price: 5.99,
    category: "Напитки",
    image: "green smoothie",
    calories: 180,
    protein: 4,
    carbs: 38,
    fat: 2,
    isVegetarian: true,
    isVegan: true,
    allergens: [],
    prepTime: 5,
    status: "active",
    createdAt: new Date("2024-01-30"),
  },
  {
    id: "8",
    name: "Салат Цезарь",
    description: "Салат Романо, гренки, пармезан и классический соус Цезарь",
    price: 7.99,
    category: "Салаты",
    image: "caesar salad",
    calories: 420,
    protein: 12,
    carbs: 18,
    fat: 34,
    isVegetarian: true,
    isVegan: false,
    allergens: ["Глютен", "Молочные продукты", "Рыба"],
    prepTime: 8,
    status: "inactive",
    createdAt: new Date("2024-02-12"),
  },
];

export function AdminDashboard({ userEmail, onLogout }: AdminDashboardProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);

  const handleCreateItem = (item: Omit<MenuItem, "id" | "createdAt">) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const handleUpdateItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
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
                <h1 className="text-xl">Умная Столовая</h1>
                <p className="text-sm text-gray-600">Панель управления</p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden md:inline">{userEmail}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <User className="mr-2 h-4 w-4" />
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <MenuItemsList
          items={menuItems}
          onCreateItem={handleCreateItem}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
        />
      </main>
    </div>
  );
}
