import Navbar from "@/components/shared/navbar/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white">
            <Navbar></Navbar>
            {children}
        </div>
    );
}
