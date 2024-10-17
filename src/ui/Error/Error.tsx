import { Warning } from "../icons/Icons";

const Error = ({ heading, description }: { heading: string, description: string }) => {
    return (
        <div className="py-10 bg-white dark:bg-dark">
            <div className="container">
                <div className="border-l-yellow-500 dark:bg-dark-2 flex max-w-[655px] items-center gap-x-5 rounded-md border-l-[6px] bg-white p-5 pl-6">
                    <div>
                        <Warning></Warning>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h3 className="mb-1 text-lg font-medium text-black dark:text-white">
                                {heading}
                            </h3>
                            <p className="text-sm text-body-color dark:text-dark-6">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;