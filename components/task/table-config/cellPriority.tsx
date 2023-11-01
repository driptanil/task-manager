"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoveDown, MoveRight, MoveUp } from "lucide-react";
import { Priority } from "@prisma/client";
import React from "react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { priorities } from "@/enums/priorities";
import { cn } from "@/lib/utils";

interface CellPriorityProps {
  id: string;
  data: Priority;
}

export const CellPriority: React.FC<CellPriorityProps> = ({ id, data }) => {
  const [priority, setPriority] = React.useState<Priority>(data);

  const utils = trpc.useUtils();
  const {
    mutate: updatePriority,
    isLoading,
    error,
  } = trpc.setPriorityTask.useMutation({
    onSuccess: () => {
      toast({
        title: `Updated: ${priority} Priority`,
        description: `Task Priority updated to ${priority}`,
      });
      utils.getAllTasks.invalidate();
      utils.getTask.invalidate({ taskId: id });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error: Priority",
        description: "Unable to update Task Priority",
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger defaultValue={data}>
          {priorities
            .filter((option) => option.value === data)
            .map((option) => {
              return (
                <Button key={option.value} variant={"ghost"}>
                  <option.icon className={cn(option.className, "h-4 w-4")} />
                  <p className="ml-2">{option.label}</p>
                </Button>
              );
            })}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          {priorities.map((option) =>
            priority !== option.value ? (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  setPriority(option.value);
                  updatePriority({ taskId: id, priority: option.value });
                }}
                className={buttonVariants({
                  variant: "ghost",
                })}
              >
                <option.icon className={cn(option.className, "h-4 w-4")} />
                <p className="ml-2">{option.label}</p>
              </DropdownMenuItem>
            ) : (
              <></>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
