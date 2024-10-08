"use client"

import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ContextProvider from "@/contextProvider/ContextProvider";


// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </ContextProvider>
      </body>
    </html>
  );
}
