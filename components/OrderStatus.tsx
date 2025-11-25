import { Order } from "../App";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, CheckCircle2, ChefHat, Package } from "lucide-react";
import { Progress } from "./ui/progress";

interface OrderStatusProps {
  orders: Order[];
}

export function OrderStatus({ orders }: OrderStatusProps) {
  if (orders.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500 text-center">Заказов пока нет</p>
          <p className="text-sm text-gray-400 text-center mt-1">
            Здесь появится история ваших заказов
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {orders.map((order) => {
        const statusConfig = {
          preparing: {
            label: "Готовится",
            icon: ChefHat,
            color: "bg-blue-500",
            progress: 50,
          },
          ready: {
            label: "Готов к выдаче",
            icon: CheckCircle2,
            color: "bg-green-500",
            progress: 100,
          },
          completed: {
            label: "Завершен",
            icon: CheckCircle2,
            color: "bg-gray-500",
            progress: 100,
          },
        };

        const status = statusConfig[order.status];
        const StatusIcon = status.icon;

        return (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Заказ №{order.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.orderTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Badge
                  variant={order.status === "ready" ? "default" : "secondary"}
                  className="flex items-center gap-1"
                >
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>
                      {(item.price * item.quantity).toLocaleString("ru-RU")} ₸
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span>Итого</span>
                  <span>{order.total.toLocaleString("ru-RU")} ₸</span>
                </div>
              </div>

              {order.status === "preparing" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        Ориентировочное время: {order.estimatedTime} мин
                      </span>
                    </div>
                  </div>
                  <Progress value={status.progress} className="h-2" />
                </div>
              )}

              {order.status === "ready" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800 text-center">
                    Ваш заказ готов! Подойдите, пожалуйста, к выдаче.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
