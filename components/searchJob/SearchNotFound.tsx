import Image from "next/image";

const notFound = require("@/public/icons/notFound.svg") as string;

type Props = {
  text: string
};

export default function SearchNotFound({ text }: Props) {
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col">
        <Image
          src={notFound}
          alt="notFound"
          width={156}
          height={156}
          className="mt-36 mx-auto md:hidden"
        />
        <Image
          src={notFound}
          alt="notFound"
          width={206}
          height={206}
          className="hidden md:block md:mt-36 md:mx-auto lg:mt-28"
        />
        <div className="font-medium text-lg text-slate-500 mt-4 mx-auto md:text-2xl md:my-6 lg:font-normal">
          {text}
        </div>
      </div>
    </>
  );
}
