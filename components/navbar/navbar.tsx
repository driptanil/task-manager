import getCurrentUser from "@/auth/getCurrentUser";
import Account from "./account";
import AuthButtons from "./auth-buttons";
import ThemeToggle from "../ui/themeToggle";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Newspaper } from "lucide-react";

const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <nav className="py-3 items-center flex justify-between w-full px-2 md:px-5 gap-2 fixed z-30 top-0 bg-secondary/40 backdrop-blur-sm">
      <Link
        href="/"
        className="z-30 p-0 text-lg sm:text-xl md:text-2xl font-extrabold"
      >
        <>
          <span className="">Task</span>
          <span className="">Manager</span>
        </>
      </Link>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center font-sans z-30">
          {/* <Link
          href="/blog"
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
            className: "text-base",
          })}
        >
          <Newspaper className="w-4 h-4 mr-2" />
          Blogs
        </Link> */}
          {user ? <Account user={user} /> : <AuthButtons />}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
