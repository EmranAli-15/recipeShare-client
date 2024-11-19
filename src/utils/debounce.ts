"use client"

let timer: any;

export const debounce = async (fn: Function, delay: number) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        fn();
    }, delay);
};