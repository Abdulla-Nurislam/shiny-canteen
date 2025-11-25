import { MenuItem } from "../../App";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Clock, Flame } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useState } from "react";

interface DishCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
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

export function DishCard({ item, onAddToCart }: DishCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="aspect-video overflow-hidden relative">
            <ImageWithFallback
              src={IMAGE_MAP[item.image]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 right-2 bg-white text-gray-900">
              {item.category}
            </Badge>
          </div>
          <CardContent className="pt-4">
            <h3 className="mb-2">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {item.description}
            </p>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                {item.prepTime} мин
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Flame className="h-4 w-4" />
                {item.calories} ккал
              </div>
            </div>
            <div>
              <span className="text-2xl">{item.price.toLocaleString('ru-RU')} ₸</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="aspect-video overflow-hidden rounded-lg">
            <ImageWithFallback
              src={IMAGE_MAP[item.image]}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Цена</p>
              <p className="text-2xl">{item.price.toLocaleString('ru-RU')} ₸</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Категория</p>
              <p>{item.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Время приготовления</p>
              <p>{item.prepTime} минут</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Калорийность</p>
              <p>{item.calories} ккал</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">Состав блюда</h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">Пищевая ценность на порцию</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Белки</p>
                <p>{item.protein}г</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Углеводы</p>
                <p>{item.carbs}г</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Жиры</p>
                <p>{item.fat}г</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAddToCart} size="lg" className="w-full">
            Добавить в корзину — {item.price.toLocaleString('ru-RU')} ₸
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
