"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { TaskClientColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";

interface TaskClientProps {
  data: TaskClientColumn[];
}

const TaskClient: React.FC<TaskClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <DataTable columns={columns} data={data} searchKey="title" />
    </>
  );
};

export default TaskClient;
