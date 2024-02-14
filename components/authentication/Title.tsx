export default function Title({
  title,
  highlightText,
  highlightColor,
}: {
  title: string;
  highlightText: string;
  highlightColor: string;
}) {
  return (
    <p className="font-bold leading-6 text-2xl w-full">
      {" "}
      {title}
      <span style={{ color: highlightColor }}>{highlightText}</span>{" "}
    </p>
  );
}
