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
    callbacks: {
        async jwt({ token, user, account}) {
            console.log("Account token", account?.access_token);
            if (account && user) {
                token.accessToken = (account.access_token as string | undefined) ?? null;
                token.email= user.email ?? null;
            } 
            return token;
        },
        async signIn({ user, account, profile}){
            if (account?.provider === "google") {
                const existingAccount = await prisma.account.findUnique({
                    where: {
                        provider_providerAccountId: {
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        }
                    },
                });
                if (!existingAccount) {
                    const existingUser = await prisma.user.findUnique({
                        where: {
                            email: user.email || "",
                        }
                    })

                    if (existingUser) {
                        await prisma.account.create({
                            data: {
                                userId: existingUser.id,
                                provider: account.provider,
                                providerAccountId: account.providerAccountId,
                                access_token: account.access_token,
                            },
                        });
                    } else {
                        const newUser = await prisma.user.create({
                            data: {
                                email: user.email,
                                name: user.name,
                                image: user.image,
                            }
                        });
                    }
                } 
            }
            return true;

        },
        async session({session, token}) {
            if (token) {
                session.user?.email = token.email ?? null;
                session.user.accessToken = (token.accessToken as string | undefined) ?? null;
            }
            return session;
        },
        async redirect({url, baseUrl}) {
            if (url === "/api/auth/callback/github") {
                return baseUrl
            }
            return url;
        }
    },
    pages: {
        signIn: "/api/auth/signin",
        error: "/api/auth/error"
    },
    session: {
        strategy: "database",
        maxAge: 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true
} satisfies AuthOptions;