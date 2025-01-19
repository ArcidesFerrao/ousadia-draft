import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";




const prisma = new PrismaClient;

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [

        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    pages: {
        signin: "/api/auth/signin",
        error: "/api/auth/error"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true
} satisfies AuthOptions;