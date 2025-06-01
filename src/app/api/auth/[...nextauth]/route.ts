import { setCookieToBrowser } from '@/services/auth/auth';
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            if (!profile?.email) return false;

            try {
                const response = await fetch(
                    `${process.env.BASE_URL}/api/auth/googleSignIn`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                        }),
                    });
                if (!response.ok) {
                    return false;
                }

                const result = await response.json();
                setCookieToBrowser(result.data.accessToken
                );

            } catch (error) {
                return false;
            }

            return true;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };