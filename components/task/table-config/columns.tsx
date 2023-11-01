"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellAction";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { RouterOutputs } from "@/app/_trpc/client";
import { CellPriority } from "./cellPriority";
import { CellStatus } from "./cellStatus";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type TaskClientColumn = RouterOutputs["getAllTasks"][number];

export const columns: ColumnDef<TaskClientColumn>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => `Status`,
    cell: ({ row }) => (
      <CellStatus id={row.original.id} data={row.original.status} />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => <p>Title</p>,
    cell: ({ row }) => (
      <p className="font-semibold text-base">{row.original.title}</p>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => `Priority`,
    cell: ({ row }) => (
      <CellPriority id={row.original.id} data={row.original.priority} />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "dueDate",
    cell: ({ row }) => format(new Date(row.original.dueDate), "do MMM yyyy"),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
