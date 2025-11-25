import { useState, useEffect } from "react";
import { MenuItem } from "../../App";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

interface CreateEditItemModalProps {
  isOpen: boolean;
  item?: MenuItem;
  onClose: () => void;
  onSave: (item: Omit<MenuItem, "id" | "createdAt">) => void;
}

const CATEGORIES = ["Салаты", "Основные блюда", "Напитки", "Десерты", "Закуски"];

const IMAGE_OPTIONS = [
  { value: "healthy salad bowl", label: "Салат" },
  { value: "margherita pizza", label: "Пицца" },
  { value: "vegan buddha bowl", label: "Боул" },
  { value: "gourmet burger", label: "Бургер" },
  { value: "cappuccino coffee", label: "Кофе" },
  { value: "pasta carbonara", label: "Паста" },
  { value: "green smoothie", label: "Смузи" },
  { value: "caesar salad", label: "Салат Цезарь" },
];

export function CreateEditItemModal({
  isOpen,
  item,
  onClose,
  onSave,
}: CreateEditItemModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: CATEGORIES[0],
    image: IMAGE_OPTIONS[0].value,
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    prepTime: "",
    isVegetarian: false,
    isVegan: false,
    allergens: [] as string[],
    status: "active" as MenuItem["status"],
  });

  const [allergenInput, setAllergenInput] = useState("");

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        image: item.image,
        calories: item.calories.toString(),
        protein: item.protein.toString(),
        carbs: item.carbs.toString(),
        fat: item.fat.toString(),
        prepTime: item.prepTime.toString(),
        isVegetarian: item.isVegetarian,
        isVegan: item.isVegan,
        allergens: item.allergens,
        status: item.status,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: CATEGORIES[0],
        image: IMAGE_OPTIONS[0].value,
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        prepTime: "",
        isVegetarian: false,
        isVegan: false,
        allergens: [],
        status: "active",
      });
    }
    setAllergenInput("");
  }, [item, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      calories: parseInt(formData.calories),
      protein: parseInt(formData.protein),
      carbs: parseInt(formData.carbs),
      fat: parseInt(formData.fat),
      prepTime: parseInt(formData.prepTime),
      isVegetarian: formData.isVegetarian,
      isVegan: formData.isVegan,
      allergens: formData.allergens,
      status: formData.status,
    });
  };

  const addAllergen = () => {
    if (allergenInput.trim() && !formData.allergens.includes(allergenInput.trim())) {
      setFormData({
        ...formData,
        allergens: [...formData.allergens, allergenInput.trim()],
      });
      setAllergenInput("");
    }
  };

  const removeAllergen = (allergen: string) => {
    setFormData({
      ...formData,
      allergens: formData.allergens.filter((a) => a !== allergen),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {item ? "Редактировать блюдо" : "Добавить новое блюдо"}
          </DialogTitle>
          <DialogDescription>
            {item
              ? "Внесите изменения в информацию о блюде"
              : "Заполните информацию о новом блюде"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h4>Основная информация</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="name">Название блюда *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Например: Салат Цезарь"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Описание *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    placeholder="Краткое описание блюда..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Категория *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Изображение *</Label>
                  <Select
                    value={formData.image}
                    onValueChange={(value) =>
                      setFormData({ ...formData, image: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {IMAGE_OPTIONS.map((img) => (
                        <SelectItem key={img.value} value={img.value}>
                          {img.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Цена ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="9.99"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prepTime">Время приготовления (мин) *</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    min="1"
                    value={formData.prepTime}
                    onChange={(e) =>
                      setFormData({ ...formData, prepTime: e.target.value })
                    }
                    required
                    placeholder="15"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Статус *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: MenuItem["status"]) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Активно</SelectItem>
                      <SelectItem value="inactive">Неактивно</SelectItem>
                      <SelectItem value="outofstock">Нет в наличии</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4>Пищевая ценность</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Калории *</Label>
                  <Input
                    id="calories"
                    type="number"
                    min="0"
                    value={formData.calories}
                    onChange={(e) =>
                      setFormData({ ...formData, calories: e.target.value })
                    }
                    required
                    placeholder="250"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protein">Белки (г) *</Label>
                  <Input
                    id="protein"
                    type="number"
                    min="0"
                    value={formData.protein}
                    onChange={(e) =>
                      setFormData({ ...formData, protein: e.target.value })
                    }
                    required
                    placeholder="20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carbs">Углеводы (г) *</Label>
                  <Input
                    id="carbs"
                    type="number"
                    min="0"
                    value={formData.carbs}
                    onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                    required
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fat">Жиры (г) *</Label>
                  <Input
                    id="fat"
                    type="number"
                    min="0"
                    value={formData.fat}
                    onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                    required
                    placeholder="10"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4>Диетические особенности</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetarian"
                    checked={formData.isVegetarian}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isVegetarian: checked === true })
                    }
                  />
                  <Label htmlFor="vegetarian" className="cursor-pointer">
                    Вегетарианское
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegan"
                    checked={formData.isVegan}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isVegan: checked === true })
                    }
                  />
                  <Label htmlFor="vegan" className="cursor-pointer">
                    Веганское
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4>Аллергены</h4>
              <div className="flex gap-2">
                <Input
                  value={allergenInput}
                  onChange={(e) => setAllergenInput(e.target.value)}
                  placeholder="Добавить аллерген..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAllergen();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addAllergen}>
                  Добавить
                </Button>
              </div>
              {formData.allergens.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {formData.allergens.map((allergen) => (
                    <div
                      key={allergen}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {allergen}
                      <button
                        type="button"
                        onClick={() => removeAllergen(allergen)}
                        className="hover:text-red-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Отмена
          </Button>
          <Button onClick={handleSubmit}>
            {item ? "Сохранить изменения" : "Создать блюдо"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
