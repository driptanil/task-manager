"use client";

import { RouterOutputs, trpc } from "@/app/_trpc/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Priority, Status, Task } from "@prisma/client";
import * as z from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import { priorities } from "@/enums/priorities";
import { statuses } from "@/enums/statuses";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import is from "date-fns/locale/is/index.js";

interface IViewTaskProps {
  task: Task;
}

const ViewTask: React.FC<IViewTaskProps> = ({ task }) => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(true);

  const utils = trpc.useUtils();

  const formSchema = z.object({
    title: z.string().min(5, {
      message: "Title must be at least 5 characters.",
    }),
    description: z.string().max(100, {
      message: "Title must be at least 100 characters.",
    }),
    dueDate: z.date(),
    status: z.enum([
      Status.Cancelled,
      Status.Complete,
      Status.InProgress,
      Status.Pending,
    ]),
    priority: z.enum([Priority.Low, Priority.Medium, Priority.High]),
  });

  const router = useRouter();

  const {
    mutate: editTask,
    isLoading: isAddingSubject,
    error: addSubjectError,
  } = trpc.editTask.useMutation({
    onSuccess: () => {
      form.reset();
      console.log("SUCCESS");
      setOpenDialog(false);
      utils.getAllTasks.invalidate();
      utils.getTask.invalidate({ taskId: task.id });
      router.push("/");
      toast({
        title: `Updated: Task`,
        description: `All details of the task are updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: `Error: Update Task`,
        description: `Unable to update details of the task`,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description || "",
      dueDate: new Date(task.dueDate),
      priority: task.priority,
      status: task.status,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    editTask({
      title: values.title,
      description: values.description,
      status: values.status,
      taskId: task.id,
      dueDate: values.dueDate.toISOString(),
      priority: values.priority,
    });

    console.log(values);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Task</DialogTitle>
          <DialogDescription>
            This is the details of your task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <ScrollArea className="space-4 px-2 py-4 h-[50vh]">
              <FormField
                control={form.control}
                name="title"
                disabled={isAddingSubject}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                    {/* <FormDescription>This is your task title.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is description of your task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                disabled={isAddingSubject}
                render={({ field }) => (
                  <FormItem className="flex flex-col mb-4">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                      This is due date of your task.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="priority"
                    disabled={isAddingSubject}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder=""
                                defaultValue={Priority.Medium}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem
                                key={priority.value}
                                value={priority.value}
                              >
                                <div className={"flex"}>
                                  <priority.icon
                                    className={cn(
                                      priority.className,
                                      "mr-2 h-4 w-4"
                                    )}
                                  />
                                  {priority.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="status"
                    disabled={isAddingSubject}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder=""
                                defaultValue={task.status}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                <div className={cn("flex", status.className)}>
                                  <status.icon className="mr-2 h-4 w-4" />
                                  {status.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* <DialogDescription>
                This is the priority and status of your task
              </DialogDescription> */}
            </ScrollArea>
            <Button
              type="submit"
              size={"lg"}
              className="font-semibold hover:opacity-80 transition w-full"
              disabled={isAddingSubject}
              //   variant={"secondary"}
              //   disabled={disable}
            >
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTask;
