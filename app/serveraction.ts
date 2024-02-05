"use server";

export interface person {
    name: string,
    age: number
}

const data = [
    {
        name: "A",
        age: 19
    },
    {
        name: "B",
        age: 200
    }
]

async function getData(): Promise<person[]> {
    console.log("getData should be called on server");

    return new Promise<person[]>((resolve, reject) => {
        resolve(data);
    });
}

async function sendMessage(val: string) {
    console.log(val);
}

export { getData, sendMessage };