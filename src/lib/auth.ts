// import { PrismaClient } from "@prisma/client";
import db from "@/db/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";


export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async session({session, token, user}) {
            if (user) {
                session.user = {
                    ...session.user,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                }
            } else if (token) {
                session.user ={ 
                    ...session.user,
                    id: token.sub as string,
                    name: token.name,
                    email: token.email,                
                };
            }
            return session;
        },
        async jwt({ token, user}) {
            if (user) {
                token = {
                    ...token,
                    sub: user.id,
                    name: user.name ?? user.email,
                    email: user.email,
                }
            } 
            console.log(token.name);
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
                                provider: account.provider,
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

                            await db.account.create({
                                data: {
                                    userId: newUser.id,
                                    provider: account.provider,
                                    providerAccountId: account.providerAccountId,
                                    accessToken: account.access_token,
                                    providerType: account.type,
                                }
                            })
                        }
                    }
                } 
            }
            return true;
        },
        
        // async redirect({url, baseUrl}) {
        //     if (url.startsWith(baseUrl)) {
        //         toast.success("Login successfull", {
        //             position: "top-right",
        //             duration: 3000,
        //         });
        //         return url
        //     }
        //     return  baseUrl;
        // }
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