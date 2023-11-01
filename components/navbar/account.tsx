"use client";

import { CalendarDays, LogOutIcon, User as UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface IAccountProps {
  user: User;
}

const Account: React.FC<IAccountProps> = ({ user }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant={"link"}>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              <UserIcon className="dark:text-white text-black" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 flex ">
        <div className="flex justify-around w-full space-x-4">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              <UserIcon className="dark:text-white text-black" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <p className="text-sm">{user.email}</p>
            {user ? (
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined {format(new Date(user.createdAt), "do MMMM yyyy")}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                <LogOutIcon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Sign Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Account;
