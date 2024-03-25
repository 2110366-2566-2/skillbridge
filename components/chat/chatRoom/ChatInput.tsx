"use client"

import { FormEvent, ChangeEvent, useState } from "react"
import Image from "next/image";
import sendButton from "@/public/icons/sendButton.svg";
import imageButton from "@/public/icons/imageButton.svg";

type Props = {
    isStudent: boolean,
    chatroomId: string,
}

export default function ChatInput({ isStudent, chatroomId }: Props) {
    const [input, setInput] = useState({
        text: "",
    });
    // console.log(bid, applicationStatus, url, budget, jobStatus)

    const handleChange = (evt: ChangeEvent) => {
        const changedInput = evt.target as HTMLInputElement; // Type assertion to HTMLInputElement
        const changedField = changedInput.name;
        const newValue = changedInput.value;

        setInput((currData) => ({
            ...currData,
            [changedField]: newValue,
        }));
        // console.log(changedField, newValue, typeof (newValue))
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input.text !== "") {
            console.log(input.text)
            setInput(currData => ({
                ...currData,
                text: ""
            }))
        }
    }

    const handleImageInput = () => {
        console.log("CLICKED AT IMAGE INPUT ><")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-row items-center h-[77px] w-full bg-slate-50 border-t border-[#CBD5E1] px-4 md:h-[84px] lg:px-5"
        >
            <input
                type="text"
                autoComplete="off"
                value={input.text}
                name="text"
                placeholder="ส่งข้อความ..."
                onChange={handleChange}
                className="h-[45px] w-full px-5 rounded-full bg-neutral-100 border border-neutral-300 placeholder:text-neutral-400 focus:outline-none lg:text-[18px]"
            />
            <button
                type="button"
                className="h-fit p-2 ml-3 mr-[2px] rounded-full hover:bg-neutral-200 md:ml-4"
                onClick={handleImageInput}
            >
                <Image
                    className={""}
                    src={imageButton}
                    alt="imageButton"
                    width={32}
                    height={32}
                />
            </button>
            <button
                type="submit"
                className="h-fit py-[2px] pl-[0px] pr-[4px] rounded-full hover:bg-neutral-200"
            >
                <Image
                    className={""}
                    src={sendButton}
                    alt="sendButton"
                    width={46}
                    height={46}
                />
            </button>
        </form>
    )
}