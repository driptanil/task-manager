"use client";

import { notFound } from "next/navigation";
import { trpc } from "../_trpc/client";
import React from "react";
import ViewTask from "@/components/task/view-task";

interface ITaskPageProps {
  params: { taskId: string };
}

const TaskPage: React.FC<ITaskPageProps> = ({ params }) => {
  const {
    data: task,
    isLoading,
    error,
  } = trpc.getTask.useQuery({
    taskId: params.taskId,
  });

  if (isLoading) {
    return <></>;
  }

  if (!task) {
    return notFound();
  }

  const formattedTask = {
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    dueDate: new Date(task.dueDate),
  };

  return <ViewTask task={formattedTask} />;
};

export default TaskPage;
