import { Status } from "@prisma/client";
import { CheckCircle2, Circle, Timer, XCircle } from "lucide-react";

export const statuses = [
  {
    value: Status.Pending,
    label: "Pending",
    icon: Timer,
    className:
      "hover:bg-accent text-yellow-800 bg-yellow-300/50 hover:text-yellow-300 dark:text-yellow-200 dark:bg-transparent",
  },
  {
    value: Status.InProgress,
    label: "InProgress",
    icon: Circle,
    className: "hover:bg-accent hover:text-accent-foreground",
  },
  {
    value: Status.Complete,
    label: "Complete",
    icon: CheckCircle2,
    className:
      "hover:bg-accent hover:text-green-400 bg-green-300/50 dark:bg-transparent text-green-700 dark:text-green-300",
  },
  {
    value: Status.Cancelled,
    label: "Cancelled",
    icon: XCircle,
    className:
      "hover:bg-accent text-rose-600 hover:text-rose-400 dark:text-rose-400 bg-rose-300/50 dark:bg-transparent",
  },
];
