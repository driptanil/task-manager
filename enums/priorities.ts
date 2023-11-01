import { Priority } from "@prisma/client";
import { MoveDown, MoveRight, MoveUp } from "lucide-react";

export const priorities = [
  {
    value: Priority.High,
    label: "High",
    icon: MoveUp,
    className: "text-rose-500",
  },
  {
    value: Priority.Medium,
    label: "Medium",
    icon: MoveRight,
    className: "",
  },
  {
    value: Priority.Low,
    label: "Low",
    icon: MoveDown,
    className: "text-green-500",
  },
];
