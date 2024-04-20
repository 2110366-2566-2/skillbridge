import Image from "next/image";
import LoadingRing from "@/public/icons/loading-ring.svg";

type Props = {
  className?: string;
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
  id?: string;
};

export default function SecondaryButton(props: Props) {
  const {
    className,
    type,
    isDisabled,
    onClick,
    children,
    id
  } = props;
  return (
    <button
      type={type || "button"}
      className={`border border-slate-300 px-[20px] py-[12px] rounded-[6px] text-sm text-slate-700 bg-slate-50 hover:opacity-80 active:opacity-60 disabled:opacity-60 ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      id={id ? id : "secondaryButton"}
    >
      {children}
    </button>
  );
}
