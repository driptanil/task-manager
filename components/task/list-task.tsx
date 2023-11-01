"use client";

import { trpc } from "@/app/_trpc/client";
import { Ghost, Loader } from "lucide-react";
import TaskClient from "./table-config/client";

const ListTask = () => {
  const { data: tasks, isLoading } = trpc.getAllTasks.useQuery();

  if (isLoading)
    return (
      <div className="flex gap-4 text-lg items-center justify-center w-full h-1/2 py-10">
        <Loader className="w-5 h-5 animate-spin" />
        Loading...
      </div>
    );

  if (!tasks)
    return (
      <div className="flex gap-4 text-xl items-center justify-center w-full py-10">
        <Ghost className="w-8 h-8 animate" />
        No tasks found
      </div>
    );

  return (
    <section className="w-full">
      <TaskClient data={tasks} />
    </section>
  );
};

export default ListTask;
