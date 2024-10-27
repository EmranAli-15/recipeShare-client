import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="max-w-7xl mx-auto mt-5">
            {children}
        </div>
    );
};

export default Layout;