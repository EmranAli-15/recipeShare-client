import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="max-w-7xl mx-auto mt-5 px-2 md:px-0">

            <div className="grid grid-cols-4 md:gap-x-5">
                <div className="hidden md:block md:col-span-1">
                    <h1>User dashboard</h1>
                </div>
                <div className="col-span-4 md:col-span-3">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default Layout;