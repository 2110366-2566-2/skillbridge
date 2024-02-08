import Image from "next/image"
import noavatar from "@/public/icons/noavatar.svg"
import doubleQuote from "@/public/icons/double-quote.svg"

type Props = {
    name: string;
    position: string;
    company: string;
    category: string;
    message: string;
}

export default function CommentCard(props: Props) {
    const {name, position, company, category, message} = props;
  return (
    <div className="border border-slate-200 rounded-[20px] bg-white drop-shadow-md w-[300px] min-h-[215px] flex flex-col justify-between p-5 gap-2 shrink-0 md:min-h-[330px] md:w-[450px] md:p-8">
        <div className="flex gap-5 items-start">
            <Image
                src={doubleQuote}
                alt="quote"
                height={35}
                width={35}
            />
            <div className="flex flex-col">
                <h3 className="text-[14px] font-bold pb-2 text-right md:text-2xl">#{category}</h3>
                <p className="text-[11px] text-slate-500 leading-[18px] md:text-base md:leading-[25px]">{message}</p>
            </div>
        </div>
        <div className="flex gap-3 items-center">
            <Image
                className="md:h-[60px] md:w-[60px]"
                src={noavatar}
                alt="avatar"
                height={40}
                width={40}
            />
            <div className="flex flex-col">
                <h3 className="text-[15px] font-medium pb-1 md:text-lg">คุณ{name}</h3>
                <p className="text-[10px] text-slate-400 md:text-sm">{position} {company}</p>
            </div>
        </div>
    </div>
  )
}
