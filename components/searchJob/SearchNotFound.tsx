import Image from "next/image";

const notFound = require("@/public/icons/notFound.svg") as string;

export default function SearchNotFound() {
    return (
        <>
            {/* Mobile */}
            <div className="flex flex-col">
                <Image
                    src={notFound}
                    alt="notFound"
                    width={156}
                    height={156}
                    className="mt-1 mx-auto md:hidden"
                />
                <Image
                    src={notFound}
                    alt="notFound"
                    width={206}
                    height={206}
                    className="hidden md:block md:mt-4 md:mx-auto"
                />
                <div className="font-medium text-lg text-slate-500 mt-4 mx-auto md:text-2xl md:my-6 lg:font-normal">ขออภัย ไม่พบงานที่ค้นหา</div>
            </div>
        </>
    )
}