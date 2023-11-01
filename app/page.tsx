import CreateTask from "@/components/task/create-task";
import ListTask from "@/components/task/list-task";

const Page = () => {
  return (
    <main className="py-20 px-10 w-full min-h-screen flex flex-col gap-10">
      <header className="flex flex-col gap-8 mt-10">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-primary">
            Your Tasks
          </h1>
          <p>A simple task manager for you and your team</p>
        </div>
        <div className="flex flex-col gap-4 items-start w-full">
          <CreateTask />
          <ListTask />
        </div>
      </header>
    </main>
  );
};

export default Page;
