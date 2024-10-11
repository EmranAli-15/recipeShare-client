import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="max-w-7xl mx-auto mt-5">

            <div className="grid grid-cols-4 gap-x-5">
                <div className="col-span-1">
                    <h1>Admin dashboard</h1>
                </div>
                <div className="col-span-3">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default Layout;