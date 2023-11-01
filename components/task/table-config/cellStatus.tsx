"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle2, Circle, Timer, XCircle } from "lucide-react";
import { Status } from "@prisma/client";
import React from "react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { priorities } from "@/enums/priorities";
import { statuses } from "@/enums/statuses";
import { cn } from "@/lib/utils";

interface CellStatusProps {
  id: string;
  data: Status;
}

export const CellStatus: React.FC<CellStatusProps> = ({ id, data }) => {
  const [status, setStatus] = React.useState<Status>(data);
  const utils = trpc.useUtils();
  const {
    mutate: updateStatus,
    isLoading,
    error,
  } = trpc.setStatusTask.useMutation({
    onSuccess: () => {
      toast({
        title: `Updated: ${status} Status`,
        description: `Task Status updated to ${status}`,
      });
      utils.getAllTasks.invalidate();
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Error: Status",
        description: "Unable to update Task Status",
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger defaultValue={data}>
          {statuses
            .filter((option) => option.value === data)
            .map((option) => {
              return (
                <Button
                  key={option.value}
                  variant={"ghost"}
                  className={option.className}
                >
                  <option.icon className={(option.className, "h-4 w-4")} />
                  <p className="ml-2">{option.label}</p>
                </Button>
              );
            })}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          {statuses.map((option) =>
            status !== option.value ? (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  setStatus(option.value);
                  updateStatus({ taskId: id, status: option.value });
                }}
                className={buttonVariants({
                  variant: "ghost",
                  className: option.className,
                })}
              >
                <option.icon className="h-4 w-4" />
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
