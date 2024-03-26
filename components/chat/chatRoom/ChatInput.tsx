"use client"
import { FormEvent, ChangeEvent, useState, useRef } from "react"
import Image from "next/image";
import sendButton from "@/public/icons/sendButton.svg";
import imageButton from "@/public/icons/imageButton.svg";

type Props = {
    isStudent: boolean,
    chatroomId: string,
    sendMessage: Function,
    sendImage: Function
}

export default function ChatInput({ isStudent, chatroomId, sendMessage, sendImage }: Props) {
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

            sendMessage(input.text);

            setInput(currData => ({
                ...currData,
                text: ""
            }))
        }
    }

    const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("CLICKED AT IMAGE INPUT ><")
        if (e.target.files === null) {
            return;
        }
        const imageFile = e.target.files[0];

        console.log(e.target.files);
        console.log(imageFile);

        if (!imageFile) {
            return;
        }
        sendImage(imageFile);
    }


    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        if (hiddenFileInput.current === null) {
            return;
        }
        hiddenFileInput.current.click();
    };

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
                onClick={handleClick}
            >
                <Image
                    className={""}
                    src={imageButton}
                    alt="imageButton"
                    width={32}
                    height={32}
                />
            </button>
            <input
                type="file"
                onChange={handleImageInput}     // ADDED
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                accept="image/jpeg, image/png"
            />
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