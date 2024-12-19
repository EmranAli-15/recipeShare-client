"use client"
import { useEffect, useRef } from "react"

// Need lastFetched id and limit

const items = [
    "Hello Emran 1",
    "Hello Emran 2",
    "Hello Emran 3",
    "Hello Emran 4",
    "Hello Emran 5",
    "Hello Emran 6",
    "Hello Emran 7",
    "Hello Emran 8",
    "Hello Emran 9",
    "Hello Emran 10",
    "Hello Emran 11",
    "Hello Emran 12",
    "Hello Emran 13",
    "Hello Emran 14",
    "Hello Emran 15",
    "Hello Emran 16",
    "Hello Emran 17",
    "Hello Emran 18",
    "Hello Emran 19",
    "Hello Emran 20",
    "Hello Emran 21",
    "Hello Emran 22",
    "Hello Emran 23",
    "Hello Emran 24",
    "Hello Emran 25",
    "Hello Emran 26",
    "Hello Emran 27",
    "Hello Emran 28",
    "Hello Emran 29",
    "Hello Emran 30",
    "Hello Emran 31",
    "Hello Emran 32",
    "Hello Emran 33",
    "Hello Emran 34",
    "Hello Emran 35",
    "Hello Emran 36",
    "Hello Emran 37",
    "Hello Emran 38",
    "Hello Emran 39",
    "Hello Emran 40",
    "Hello Emran 41",
    "Hello Emran 42",
    "Hello Emran 43",
    "Hello Emran 44",
    "Hello Emran 45",
    "Hello Emran 46",
    "Hello Emran 47",
    "Hello Emran 48",
    "Hello Emran 49",
    "Hello Emran 50",
    "Hello Emran 51",
    "Hello Emran 52",
    "Hello Emran 53",
    "Hello Emran 54",
    "Hello Emran 55",
    "Hello Emran 56",
    "Hello Emran 57",
    "Hello Emran 58",
    "Hello Emran 59",
    "Hello Emran 60",
    "Hello Emran 61",
    "Hello Emran 62",
    "Hello Emran 63",
    "Hello Emran 64",
    "Hello Emran 65",
    "Hello Emran 66",
    "Hello Emran 67",
    "Hello Emran 68",
    "Hello Emran 69",
    "Hello Emran 70",
    "Hello Emran 71",
    "Hello Emran 72",
    "Hello Emran 73",
    "Hello Emran 74",
    "Hello Emran 75",
    "Hello Emran 76",
    "Hello Emran 77",
    "Hello Emran 78",
    "Hello Emran 79",
    "Hello Emran 80",
    "Hello Emran 81",
    "Hello Emran 82",
    "Hello Emran 83",
    "Hello Emran 84",
    "Hello Emran 85",
    "Hello Emran 86",
    "Hello Emran 87",
    "Hello Emran 88",
    "Hello Emran 89",
    "Hello Emran 90",
    "Hello Emran 91",
    "Hello Emran 92",
    "Hello Emran 93",
    "Hello Emran 94",
    "Hello Emran 95",
    "Hello Emran 96",
    "Hello Emran 97",
    "Hello Emran 98",
    "Hello Emran 99",
    "Hello Emran 100"
]

export default function LoadMoreRecipes() {
    const refFn = useRef(null);

    // const Loading: any = <div className="p-3 mt-[2000px] rounded-md bg-red-600 text-white font-bold">Loading</div>

    useEffect(() => {
        const observer = new IntersectionObserver(
            (items) => {
                items.map(item => {
                    console.log(item);
                })
            }
        )
        observer.observe(refFn.current as any);
    }, [])


    return (
        <div>
            <div ref={refFn} className="p-3 mt-[2000px] rounded-md bg-red-600 text-white font-bold">Loading</div>
        </div>
    )
}
