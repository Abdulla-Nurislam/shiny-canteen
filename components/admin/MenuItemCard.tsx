import { MenuItem } from "../../App";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Edit, Trash2, Clock, Flame, Eye, Leaf } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

const IMAGE_MAP: Record<string, string> = {
  "healthy salad bowl": "https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc2Mzk1MDc2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "margherita pizza": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emF8ZW58MXx8fHwxNzYzOTkxODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "vegan buddha bowl": "https://images.unsplash.com/photo-1675092789086-4bd2b93ffc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMGJ1ZGRoYSUyMGJvd2x8ZW58MXx8fHwxNzYzOTIzNjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "gourmet burger": "https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyfGVufDF8fHx8MTc2Mzk5OTMwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "cappuccino coffee": "https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2NDAxMDcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "pasta carbonara": "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3NjM5Mzg3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "green smoothie": "https://images.unsplash.com/photo-1610622930110-3c076902312a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHNtb290aGllfGVufDF8fHx8MTc2NDAxMDcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "caesar salad": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZHxlbnwxfHx8fDE3NjM5MDI0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

const STATUS_CONFIG = {
  active: { label: "Активно", color: "bg-green-500" },
  inactive: { label: "Неактивно", color: "bg-gray-500" },
  outofstock: { label: "Нет в наличии", color: "bg-red-500" },
};

export function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  const statusConfig = STATUS_CONFIG[item.status];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden relative">
        <ImageWithFallback
          src={IMAGE_MAP[item.image]}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${statusConfig.color}`}>
          {statusConfig.label}
        </Badge>
        {item.isVegan && (
          <Badge className="absolute top-2 left-2 bg-green-600">
            <Leaf className="h-3 w-3 mr-1" />
            Веган
          </Badge>
        )}
        {item.isVegetarian && !item.isVegan && (
          <Badge className="absolute top-2 left-2 bg-green-500">
            <Leaf className="h-3 w-3 mr-1" />
            Вегетар.
          </Badge>
        )}
      </div>

      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="truncate">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {item.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <Badge variant="secondary">{item.category}</Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {item.prepTime} мин
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Flame className="h-4 w-4" />
            {item.calories}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-2xl">${item.price.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              Просмотр
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
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
                  <p className="text-xl">${item.price.toFixed(2)}</p>
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
                  <p className="text-sm text-gray-600">Статус</p>
                  <Badge className={statusConfig.color}>
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-3">Пищевая ценность</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Калории</p>
                    <p>{item.calories} ккал</p>
                  </div>
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

              <Separator />

              <div>
                <h4 className="mb-3">Диетическая информация</h4>
                <div className="flex gap-2 flex-wrap">
                  {item.isVegan && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Веганское
                    </Badge>
                  )}
                  {item.isVegetarian && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Вегетарианское
                    </Badge>
                  )}
                </div>
              </div>

              {item.allergens.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="mb-3">Аллергены</h4>
                    <div className="flex gap-2 flex-wrap">
                      {item.allergens.map((allergen) => (
                        <Badge key={allergen} variant="destructive">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div>
                <p className="text-sm text-gray-600">
                  Добавлено: {item.createdAt.toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(item)}
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(item)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
