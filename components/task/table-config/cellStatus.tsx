"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Timer, XCircle } from "lucide-react";
import { Status } from "@prisma/client";
import React from "react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";

interface CellStatusProps {
  id: string;
  data: Status;
}

export const CellStatus: React.FC<CellStatusProps> = ({ id, data }) => {
  const [status, setStatus] = React.useState<Status>(data);
  const {
    mutate: updateStatus,
    isLoading,
    error,
  } = trpc.setStatusTask.useMutation({
    onSuccess: () => {
      toast({
        title: `Updated: ${status} Status`,
        description: "Task Status updated to Low",
      });
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
        <DropdownMenuTrigger asChild>
          {status === Status.Cancelled ? (
            <Button variant="destructive" className=" h-8 px-3">
              <XCircle className="h-4 w-4" />
              <p className="ml-2">{status}</p>
            </Button>
          ) : status === Status.InProgress ? (
            <Button variant="warning" className="h-8 px-3 ">
              <Timer className="h-4 w-4" />
              <p className="ml-2">{status}</p>
            </Button>
          ) : status === Status.Complete ? (
            <Button variant="success" className="h-8 px-3 ">
              <CheckCircle2 className="h-4 w-4" />
              <p className="ml-2">{status}</p>
            </Button>
          ) : (
            <Button variant="ghost" className="h-8 px-3">
              <Circle className="h-4 w-4" />
              <p className="ml-2">{status}</p>
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
          {status !== Status.Complete ? (
            <DropdownMenuItem
              onClick={() => {
                setStatus(Status.Complete);
                updateStatus({ taskId: id, status: Status.Complete });
              }}
            >
              <Button variant="success" className="h-8 px-3 ">
                <CheckCircle2 className="h-4 w-4" />
                <p className="ml-2">Complete</p>
              </Button>
            </DropdownMenuItem>
          ) : (
            <></>
          )}
          {status !== Status.InProgress ? (
            <DropdownMenuItem
              onClick={() => {
                setStatus(Status.InProgress);
                updateStatus({ taskId: id, status: Status.InProgress });
              }}
            >
              <Button variant="warning" className="h-8 px-3 ">
                <Timer className="h-4 w-4" />
                <p className="ml-2">InProgress</p>
              </Button>
            </DropdownMenuItem>
          ) : (
            <></>
          )}
          {status !== Status.Cancelled ? (
            <DropdownMenuItem
              onClick={() => {
                setStatus(Status.Cancelled);
                updateStatus({ taskId: id, status: Status.Cancelled });
              }}
            >
              <Button variant="destructive" className=" h-8 px-3">
                <XCircle className="h-4 w-4" />
                <p className="ml-2">Cancelled</p>
              </Button>
            </DropdownMenuItem>
          ) : (
            <></>
          )}
          {status !== Status.Pending ? (
            <DropdownMenuItem
              onClick={() => {
                setStatus(Status.Pending);
                updateStatus({ taskId: id, status: Status.Pending });
              }}
            >
              <Button variant="ghost" className="h-8 px-3">
                <Circle className="h-4 w-4" />
                <p className="ml-2">Pending</p>
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
