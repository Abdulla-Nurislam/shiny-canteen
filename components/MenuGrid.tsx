import { useState } from "react";
import { MenuItem } from "../App";
import { MenuCard } from "./MenuCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Leaf, Pizza, Coffee, Salad } from "lucide-react";
import { Badge } from "./ui/badge";

const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Grilled Chicken Salad",
    description: "Fresh mixed greens with grilled chicken, cherry tomatoes, and balsamic vinaigrette",
    price: 8.99,
    category: "Salads",
    image: "healthy salad bowl",
    calories: 320,
    protein: 35,
    carbs: 12,
    fat: 15,
    isVegetarian: false,
    isVegan: false,
    allergens: [],
    prepTime: 10,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomato sauce, and basil",
    price: 10.99,
    category: "Mains",
    image: "margherita pizza",
    calories: 580,
    protein: 22,
    carbs: 68,
    fat: 24,
    isVegetarian: true,
    isVegan: false,
    allergens: ["Gluten", "Dairy"],
    prepTime: 15,
  },
  {
    id: "3",
    name: "Vegan Buddha Bowl",
    description: "Quinoa, roasted vegetables, chickpeas, avocado, and tahini dressing",
    price: 9.49,
    category: "Salads",
    image: "vegan buddha bowl",
    calories: 450,
    protein: 18,
    carbs: 52,
    fat: 20,
    isVegetarian: true,
    isVegan: true,
    allergens: ["Sesame"],
    prepTime: 12,
  },
  {
    id: "4",
    name: "Beef Burger Deluxe",
    description: "Angus beef patty with cheese, lettuce, tomato, and special sauce",
    price: 11.99,
    category: "Mains",
    image: "gourmet burger",
    calories: 720,
    protein: 38,
    carbs: 45,
    fat: 42,
    isVegetarian: false,
    isVegan: false,
    allergens: ["Gluten", "Dairy"],
    prepTime: 18,
  },
  {
    id: "5",
    name: "Cappuccino",
    description: "Rich espresso with steamed milk and foam",
    price: 3.99,
    category: "Beverages",
    image: "cappuccino coffee",
    calories: 120,
    protein: 6,
    carbs: 12,
    fat: 4,
    isVegetarian: true,
    isVegan: false,
    allergens: ["Dairy"],
    prepTime: 5,
  },
  {
    id: "6",
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, eggs, parmesan, and black pepper",
    price: 12.49,
    category: "Mains",
    image: "pasta carbonara",
    calories: 680,
    protein: 28,
    carbs: 72,
    fat: 32,
    isVegetarian: false,
    isVegan: false,
    allergens: ["Gluten", "Dairy", "Eggs"],
    prepTime: 20,
  },
  {
    id: "7",
    name: "Green Smoothie",
    description: "Spinach, banana, mango, and coconut water blend",
    price: 5.99,
    category: "Beverages",
    image: "green smoothie",
    calories: 180,
    protein: 4,
    carbs: 38,
    fat: 2,
    isVegetarian: true,
    isVegan: true,
    allergens: [],
    prepTime: 5,
  },
  {
    id: "8",
    name: "Caesar Salad",
    description: "Romaine lettuce, croutons, parmesan, and classic Caesar dressing",
    price: 7.99,
    category: "Salads",
    image: "caesar salad",
    calories: 420,
    protein: 12,
    carbs: 18,
    fat: 34,
    isVegetarian: true,
    isVegan: false,
    allergens: ["Gluten", "Dairy", "Fish"],
    prepTime: 8,
  },
];

interface MenuGridProps {
  onAddToCart: (item: MenuItem) => void;
}

export function MenuGrid({ onAddToCart }: MenuGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { name: "All", icon: Pizza },
    { name: "Mains", icon: Pizza },
    { name: "Salads", icon: Salad },
    { name: "Beverages", icon: Coffee },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name || (selectedCategory === null && category.name === "All");
            return (
              <Button
                key={category.name}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name === "All" ? null : category.name)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
