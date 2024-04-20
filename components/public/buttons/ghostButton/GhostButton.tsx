import Image from "next/image";
import LoadingRing from "@/public/icons/loading-ring.svg";

type Props = {
  className?: string;
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
  id?: string;
};

export default function GhostButton(props: Props) {
  const {
    className,
    type,
    isDisabled,
    onClick,
    children,
    isLoading,
    loadingMessage,
    id
  } = props;
  return (
    <button
      type={type || "button"}
      className={`px-[20px] py-[12px] rounded-[6px] text-sm text-slate-700 bg-slate-50 active:bg-slate-200 active:opacity-60 disabled:opacity-60 ${!isDisabled && "hover:bg-slate-200"} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      id={id ? id : "ghostButton"}
    >
      {isLoading ? (
        <div className="flex gap-2 justify-center items-center">
          <Image src={LoadingRing} alt="logo" width={20} height={20} />
          {loadingMessage}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
