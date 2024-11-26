const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => resolve(data))
    }, 300);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => resolve(data))
    }, 3000);
});

const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello");
    }, 3000);
});

const callMe = async () => {
    const [dataOne, dataTwo] = await Promise.all([promise1, promise2]);

    console.log(dataOne, dataTwo);
};

// callMe()


const fn = async () => {
    console.log(await promise3);

    console.log("One");
};
// fn()

const date = new Date().getHours();
console.log(date);





// promise2.then(res => console.log(res)).catch(err => console.log(err));
// promise1.then(res => console.log(res)).catch(err => console.log(err));
