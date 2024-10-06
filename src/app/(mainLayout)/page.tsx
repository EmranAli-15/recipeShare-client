import LatestRecipes from "@/components/home/LatestRecipes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halal Foods",
  description: "Make your day wonderful with healthy foods",
};

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="px-2 md:px-0">
        <LatestRecipes></LatestRecipes>
      </div>
    </div>
  );
};

export default Page;