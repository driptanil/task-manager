import { RouterOutputs } from "@/app/_trpc/client";
import AuthButtons from "../navbar/auth-buttons";
import CreateTask from "../task/create-task";
import ListTask from "../task/list-task";
import { User } from "@prisma/client";

interface IMainPageProps {
  user: User | null;
}

const MainPage: React.FC<IMainPageProps> = ({ user }) => {
  return (
    <main className="pt-20 px-10 max-w-5xl mx-auto min-h-screen flex flex-col gap-10">
      <header className="flex flex-col gap-8 mt-10">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-primary">
            Your Tasks
          </h1>
          <p>A simple task manager for you and your team</p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4 items-start w-full">
          <CreateTask />
          <ListTask />
        </div>
      ) : (
        <section className="mx-auto flex flex-col mt-10 gap-5">
          <h4 className="text-xl font-semibold">
            Get Started by Authentication
          </h4>
          <div className="flex gap-5">
            <AuthButtons />
          </div>
        </section>
      )}
    </main>
  );
};

export default MainPage;
