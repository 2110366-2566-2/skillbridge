type Props = {
  taskCategories: string[];
  isLeft: boolean;
};

export default function Marquee(props: Props) {
  const { taskCategories, isLeft } = props;
  return (
    <div
      className={`w-screen md:w-full overflow-hidden flex ${isLeft ? "justify-start" : "justify-end"}`}
    >
      <span
        className={`relative shrink-0 flex justify-around min-w-full ${isLeft ? "animate-marqueeLeft" : "animate-marqueeRight"}`}
      >
        <div className="flex justify-center items-center gap-4 md:gap-8">
          {taskCategories.map((category) => (
            <div
              key={category}
              className="flex justify-center items-center text-center px-[16px] py-[16px] min-w-[120px] h-[100px] bg-white border-[2px] border-slate-500 rounded-[20px] text-[24px] font-bold text-slate-500 md:text-4xl md:px-12 md:py-20"
            >
              <p className="text-center md:hover:scale-110 duration-500">
                {category}
              </p>
            </div>
          ))}
        </div>
      </span>
      <span
        className={`relative shrink-0 flex justify-around min-w-full ${isLeft ? "animate-marqueeLeft" : "animate-marqueeRight"}`}
      >
        <div className="flex justify-center items-center gap-4 md:gap-8">
          {taskCategories.map((category) => (
            <div
              key={category}
              className="flex justify-center items-center text-center px-[16px] py-[16px] min-w-[120px] h-[100px] bg-white border-[2px] border-slate-500 rounded-[20px] text-[24px] font-bold text-slate-500 md:text-4xl md:px-12 md:py-20"
            >
              <p className="text-center md:hover:scale-110 duration-500">
                {category}
              </p>
            </div>
          ))}
        </div>
      </span>
    </div>
  );
}
