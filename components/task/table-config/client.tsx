"use client";

import { TaskClientColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";

interface TaskClientProps {
  data: TaskClientColumn[];
}

const TaskClient: React.FC<TaskClientProps> = ({ data }) => {
  return (
    <>
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
};

export default TaskClient;
