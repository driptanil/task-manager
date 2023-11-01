import { getServerSession } from "next-auth/next";

import { prisma } from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      // check if session consists email
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (currentUser === undefined) {
      return null;
    }

    if (!currentUser) {
      // if currentUser does not exists
      return null;
    }

    // if everything ok
    // return currentUser;

    /* Warning: Only plain objects can be passed to Client Components 
        from Server Components. Date objects are not supported. */

    // console.log(typeof currentUser.createdAt);

    return {
      ...currentUser,
      createdAt: new Date(currentUser.createdAt),
      updatedAt: new Date(currentUser.updatedAt),
      emailVerified: currentUser.emailVerified
        ? new Date(currentUser.emailVerified)
        : null,
    };
  } catch (error: any) {
    return null;
  }
}
