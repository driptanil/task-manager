"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { MoveUpRight } from "lucide-react";

const AuthButtons = () => {
  return (
    <>
      <Button
        variant="ghost"
        size="lg"
        className="hidden sm:block"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in
      </Button>
      <Button
        variant="default"
        size="lg"
        className={"font-medium text-black hidden sm:flex"}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Get Started
        <MoveUpRight className="ml-1.5 h-4 w-4" />
      </Button>
    </>
  );
};

export default AuthButtons;
