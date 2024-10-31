const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo1');
    }, 300);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo2');
    }, 3000);
});

const callMe = async () => {
    const [dataOne, dataTwo] = await Promise.all([promise1, promise2]);

    console.log(dataOne, dataTwo);
};

callMe()
