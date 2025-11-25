import { useState, useMemo } from "react";
import { MenuItem } from "../../App";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import { MenuItemCard } from "./MenuItemCard";
import { CreateEditItemModal } from "./CreateEditItemModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { Badge } from "../ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface MenuItemsListProps {
  items: MenuItem[];
  onCreateItem: (item: Omit<MenuItem, "id" | "createdAt">) => void;
  onUpdateItem: (id: string, updates: Partial<MenuItem>) => void;
  onDeleteItem: (id: string) => void;
}

type SortBy = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "date-new" | "date-old";

export function MenuItemsList({
  items,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
}: MenuItemsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date-new");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null);

  // Filter states
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [filterDietary, setFilterDietary] = useState<string[]>([]);

  const itemsPerPage = 6;

  const categories = Array.from(new Set(items.map((item) => item.category)));
  
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter((item) => {
      // Search filter
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        filterCategories.length === 0 || filterCategories.includes(item.category);

      // Status filter
      const matchesStatus =
        filterStatuses.length === 0 || filterStatuses.includes(item.status);

      // Dietary filter
      const matchesDietary =
        filterDietary.length === 0 ||
        (filterDietary.includes("vegetarian") && item.isVegetarian) ||
        (filterDietary.includes("vegan") && item.isVegan);

      return matchesSearch && matchesCategory && matchesStatus && matchesDietary;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name, "ru");
        case "name-desc":
          return b.name.localeCompare(a.name, "ru");
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "date-new":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "date-old":
          return a.createdAt.getTime() - b.createdAt.getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, searchTerm, sortBy, filterCategories, filterStatuses, filterDietary]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFiltersCount =
    filterCategories.length + filterStatuses.length + filterDietary.length;

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
  };

  const handleDelete = (item: MenuItem) => {
    setDeletingItem(item);
  };

  const handleSaveEdit = (updates: Partial<MenuItem>) => {
    if (editingItem) {
      onUpdateItem(editingItem.id, updates);
      setEditingItem(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingItem) {
      onDeleteItem(deletingItem.id);
      setDeletingItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl">Меню столовой</h2>
          <p className="text-gray-600 mt-1">
            Управление блюдами и напитками
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Добавить блюдо
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Фильтр
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 h-5 min-w-5 rounded-full p-1"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3">Категория</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cat-${category}`}
                          checked={filterCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterCategories([...filterCategories, category]);
                            } else {
                              setFilterCategories(
                                filterCategories.filter((c) => c !== category)
                              );
                            }
                            setCurrentPage(1);
                          }}
                        />
                        <Label htmlFor={`cat-${category}`} className="cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Статус</h4>
                  <div className="space-y-2">
                    {[
                      { value: "active", label: "Активно" },
                      { value: "inactive", label: "Неактивно" },
                      { value: "outofstock", label: "Нет в наличии" },
                    ].map((status) => (
                      <div key={status.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status.value}`}
                          checked={filterStatuses.includes(status.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterStatuses([...filterStatuses, status.value]);
                            } else {
                              setFilterStatuses(
                                filterStatuses.filter((s) => s !== status.value)
                              );
                            }
                            setCurrentPage(1);
                          }}
                        />
                        <Label htmlFor={`status-${status.value}`} className="cursor-pointer">
                          {status.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Диетические предпочтения</h4>
                  <div className="space-y-2">
                    {[
                      { value: "vegetarian", label: "Вегетарианское" },
                      { value: "vegan", label: "Веганское" },
                    ].map((diet) => (
                      <div key={diet.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`diet-${diet.value}`}
                          checked={filterDietary.includes(diet.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterDietary([...filterDietary, diet.value]);
                            } else {
                              setFilterDietary(
                                filterDietary.filter((d) => d !== diet.value)
                              );
                            }
                            setCurrentPage(1);
                          }}
                        />
                        <Label htmlFor={`diet-${diet.value}`} className="cursor-pointer">
                          {diet.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <>
                    <Separator />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setFilterCategories([]);
                        setFilterStatuses([]);
                        setFilterDietary([]);
                        setCurrentPage(1);
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
            <SelectTrigger className="w-[200px]">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-new">Сначала новые</SelectItem>
              <SelectItem value="date-old">Сначала старые</SelectItem>
              <SelectItem value="name-asc">Название (А-Я)</SelectItem>
              <SelectItem value="name-desc">Название (Я-А)</SelectItem>
              <SelectItem value="price-asc">Цена (возр.)</SelectItem>
              <SelectItem value="price-desc">Цена (убыв.)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active filters display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Активные фильтры:</span>
            {filterCategories.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
            {filterStatuses.map((status) => (
              <Badge key={status} variant="secondary">
                {status === "active"
                  ? "Активно"
                  : status === "inactive"
                  ? "Неактивно"
                  : "Нет в наличии"}
              </Badge>
            ))}
            {filterDietary.map((diet) => (
              <Badge key={diet} variant="secondary">
                {diet === "vegetarian" ? "Вегетарианское" : "Веганское"}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Показано {paginatedItems.length} из {filteredAndSortedItems.length} блюд
        </p>
      </div>

      {/* Items Grid */}
      {paginatedItems.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <p className="text-gray-500">Блюда не найдены</p>
          <p className="text-sm text-gray-400 mt-1">
            Попробуйте изменить критерии поиска или фильтры
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Назад
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 flex items-center">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Вперёд
          </Button>
        </div>
      )}

      {/* Modals */}
      <CreateEditItemModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={(item) => {
          onCreateItem(item);
          setIsCreateModalOpen(false);
        }}
      />

      {editingItem && (
        <CreateEditItemModal
          isOpen={true}
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deletingItem && (
        <DeleteConfirmModal
          isOpen={true}
          itemName={deletingItem.name}
          onClose={() => setDeletingItem(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
