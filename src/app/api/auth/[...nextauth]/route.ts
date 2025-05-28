import { setCookieToBrowser } from '@/services/auth/auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }: { user: any, account: any, profile: any }) {
            if (!profile.email) return false; // Ensure user has an email

            // Send user data to your Express server
            try {
                const response = await fetch("http://localhost:5000/api/auth/googleSignIn", {
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
                    console.error("Failed to register.");
                    return false;
                }

                const result = await response.json();
                setCookieToBrowser(result.data.accessToken);

            } catch (error) {
                console.error("Error sending user data to Express server:", error);
                return false;
            }

            return true;
        },
    },

};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };