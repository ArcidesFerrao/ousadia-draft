// import { PrismaClient } from "@prisma/client";
import db from "@/db/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";




// const prisma = new PrismaClient;

export const authOptions = {
    adapter: PrismaAdapter(db),
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
        async signIn({ user, account}){
            if (account?.provider === "google" ) {
                const existingAccount = await db.account.findUnique({
                    where: {
                        provider_providerAccountId: {
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        }
                    },
                });
                if (!existingAccount) {
                    const existingUser = await db.user.findUnique({
                        where: {
                            email: user.email || "",
                        }
                    })

                    if (existingUser) {
                        await db.account.create({
                            data: {
                                userId: existingUser.id,
                                providerId: account.provider,
                                providerType: account.provider,
                                providerAccountId: account.providerAccountId,
                                accessToken: account.access_token ?? null,
                            },
                        });
                    } else {
                        if (user) {

                            const newUser = await db.user.create({
                                data: {
                                    email: user.email,
                                    name: user.name,
                                    image: user.image,
                                }
                            });

                            console.log(newUser)
                        }
                    }
                } 
            }
            return true;

        },
        async session({session, token}) {
            if (token) {
                session.user = session.user || {}
                session.user.email = token.email ?? null;
                // session.user.access_token = token.accessToken ?? null;
            }
            return session;
        },
        async redirect({url, baseUrl}) {
            // if (url === "/api/auth/callback/github") {
            //     return baseUrl
            // }
            // return url;
            return url.startsWith(baseUrl) ? url : baseUrl;
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