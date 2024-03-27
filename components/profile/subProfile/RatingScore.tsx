import Image from "next/image";
export default function RatingScore({
    averageScore,
}: {
    averageScore: number;
}) {
    let widthOfRating = 22 * averageScore + 5 * Math.floor(averageScore);

    return (
        <div className="flex w-full">
            <div className="relative w-[130px] h-[22px] mr-[15px]">
                <Image
                    src={"/icons/fiveStarGray.svg"}
                    width={130}
                    height={22}
                    alt="rating-outer"
                />
                <div
                    style={{ width: `${widthOfRating}px`, height: "22px" }}
                    className="absolute overflow-hidden top-0 left-0"
                >
                    <img
                        src={"/icons/fiveStarGold.svg"}
                        alt="rating-inner"
                        className="w-[130px] h-[22px] object-cover object-left"
                    />
                </div>
            </div>

            <p className="font-bold text-amber-500 text-lg">{averageScore}</p>
        </div>
    );
}
