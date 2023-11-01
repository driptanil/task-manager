import getCurrentUser from "@/auth/getCurrentUser";
import Account from "./account";
import ThemeToggle from "../ui/themeToggle";
import Link from "next/link";
import Image from "next/image";

const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <nav className="py-3 w-full px-2 md:px-5 gap-2 fixed z-30 top-0 bg-background/40 backdrop-blur-sm">
      <div className="items-center flex justify-between max-w-5xl mx-auto">
        <Link
          href="/"
          className="z-30 p-0 text-lg flex items-center sm:text-xl md:text-2xl font-extrabold"
        >
          <div className="w-10 h-10 mr-4">
            <Image alt="logo" src="/logo.png" width={100} height={100} />
          </div>
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
            {user ? <Account user={user} /> : <></>}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
