import Image from "next/image";

export default function Logo() {
  return (
    <div className="mt-[50px]">
      <Image src={"/logos/logo-black.svg"} width={150} height={60} alt="logo" />
    </div>
  );
}
