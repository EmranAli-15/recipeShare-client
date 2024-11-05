"use client"
import { ReactNode, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {

    const [open, setOpen] = useState(true);
    const handleLogout = () => {

    }

    return (
        <div className="max-w-7xl mx-auto px-2 md:px-0">
            {children}
        </div>
    );
};

export default Layout;