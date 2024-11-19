"use client"

let timer: any;
let result = false;

export const debounce = async (fn: Function, delay: number) => {

    clearTimeout(timer);

    timer = setTimeout(() => {
        fn();
    }, delay);

};