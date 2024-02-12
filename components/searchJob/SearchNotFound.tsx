import Image from "next/image";

const notFound = require("@/public/logos/notFound.svg") as string;

export default function SearchNotFound() {
    return (
        <>
            {/* Mobile */}
            <div className="md:hidden">
                <Image
                    src={notFound}
                    alt="notFound"
                    width={156}
                    height={156}
                />
            </div>
        </>
    )
}