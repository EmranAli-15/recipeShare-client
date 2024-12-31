import { Metadata } from "next";
import LoadMoreRecipes from "@/components/home/LoadMoreRecipes";
import CurrentTimeRecipes from "@/components/home/CurrentTimeRecipes";

export const metadata: Metadata = {
  title: "Halal Foods",
  description: "Make your day wonderful with healthy foods",
};

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto p-2 md:p-0">
      <CurrentTimeRecipes></CurrentTimeRecipes>

      <section className="mt-4">
        <div className="bg-[#fff] border rounded-md p-2 h-full">
          <LoadMoreRecipes></LoadMoreRecipes>
        </div>
      </section>
    </div>
  );
};

export default Page;