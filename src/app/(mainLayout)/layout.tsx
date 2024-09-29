import Navbar from "@/components/shared/navbar/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <body>
            <Navbar></Navbar>
            {children}
        </body>
    );
}
