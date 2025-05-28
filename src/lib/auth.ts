import { signIn, signOut } from 'next-auth/react';

export const handleSignIn = () => signIn('google', {callbackUrl: "/"});
export const handleSignOut = () => signOut();