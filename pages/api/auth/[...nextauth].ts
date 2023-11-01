import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prismadb";
import NextAuth from "next-auth";

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    // 	CredentialsProvider({
    // 		name: "credentials",
    // 		credentials: {
    // 			email: { label: "email", type: "text" },
    // 			password: { label: "password", type: "password" }
    // 		},
    // 		async authorize(credentials) {
    // 			if (!credentials?.email || !credentials?.password) {
    // 				throw new Error("Invalid credentials");
    // 			}

    // 			const user = await prisma.user.findUnique({
    // 				where: {
    // 					email: credentials.email
    // 				}
    // 			});

    // 			if (!user || !user?.hashedPassword) {
    // 				throw new Error("Invalid credentials");
    // 			}

    // 			const isCorrectPassword = await bcrypt.compare(
    // 				credentials.password,
    // 				user.hashedPassword
    // 			);

    // 			if (!isCorrectPassword) {
    // 				throw new Error("Invalid credentials");
    // 			}

    // 			return user;
    // 		}
    // 	})
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
// exporting NextAuth(authOptions) & authOptions
