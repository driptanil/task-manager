"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoveDown, MoveRight, MoveUp } from "lucide-react";
import { Priority } from "@prisma/client";
import React from "react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";

interface CellPriorityProps {
  id: string;
  data: Priority;
}

export const CellPriority: React.FC<CellPriorityProps> = ({ id, data }) => {
  const [priority, setPriority] = React.useState<Priority>(data);

  const {
    mutate: updatePriority,
    isLoading,
    error,
  } = trpc.setPriorityTask.useMutation({
    onSuccess: () => {
      toast({
        title: `Updated: ${priority} Priority`,
        description: "Task Priority updated to Low",
      });
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
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant="ghost" className="h-8 px-3">
            {priority === Priority.Low ? (
              <MoveDown className="h-4 w-4 text-green-400" />
            ) : priority === Priority.Medium ? (
              <MoveRight className="h-4 w-4" />
            ) : (
              <MoveUp className="h-4 w-4 text-rose-400" />
            )}
            <p className="ml-2">{priority}</p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          {priority !== Priority.Low ? (
            <DropdownMenuItem
              onClick={() => {
                setPriority(Priority.Low);
                updatePriority({
                  taskId: id,
                  priority: Priority.Low,
                });
              }}
            >
              <Button variant="ghost" className="h-8 px-3">
                <MoveDown className="h-4 w-4 mr-2 text-green-400" />
                Low
              </Button>
            </DropdownMenuItem>
          ) : (
            <></>
          )}
          {priority !== Priority.Medium ? (
            <DropdownMenuItem
              onClick={() => {
                setPriority(Priority.Medium);
                updatePriority({
                  taskId: id,
                  priority: Priority.Medium,
                });
              }}
            >
              <Button variant="ghost" className="h-8 px-3 ">
                <MoveRight className="h-4 w-4 mr-2" />
                Medium
              </Button>
            </DropdownMenuItem>
          ) : (
            <></>
          )}
          {priority !== Priority.High ? (
            <DropdownMenuItem
              onClick={() => {
                setPriority(Priority.High);
                updatePriority({
                  taskId: id,
                  priority: Priority.High,
                });
              }}
            >
              <Button variant="ghost" className="h-8 px-3 ">
                <MoveUp className="h-4 w-4 mr-2 text-rose-400" />
                High
              </Button>
            </DropdownMenuItem>
          ) : (
            <></>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
