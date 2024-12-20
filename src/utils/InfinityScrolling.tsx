"use client"

import SectionLoader from "@/ui/loader/SectionLoader";
import { useEffect, useRef } from "react";

const InfinityScrolling = ({ setLoading, noMore }: { setLoading: Function, noMore: boolean }) => {
    const observerRef = useRef(null);

    useEffect(() => {
        new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting == true) {
                    setLoading(true);
                } else {
                    setLoading(false);
                }
            },
            {
                threshold: 1
            }
        ).observe(observerRef.current as any);
    }, []);

    return (
        <div>
            <div ref={observerRef} className={`${noMore && "hidden"} my-[40px] flex justify-center font-semibold`}>
                <SectionLoader></SectionLoader>
            </div>
        </div>
    );
};

export default InfinityScrolling;