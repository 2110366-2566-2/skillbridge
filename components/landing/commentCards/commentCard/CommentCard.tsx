import Image from "next/image";
import noavatar from "@/public/icons/noavatar.svg";
import doubleQuote from "@/public/icons/double-quote.svg";
import getS3URL from "@/actions/public/S3/getS3URL";

type Props = {
  name: string;
  position: string;
  organization: string;
  jobTag: string;
  description: string;
  profileImage: string;
};

export default async function CommentCard(props: Props) {
  const { name, position, organization, jobTag, description, profileImage } =
    props;

  // Get S3 URL
  const s3Response = await getS3URL(profileImage);
  let profileImageLink = noavatar;
  if (s3Response.success) {
    profileImageLink = s3Response.data;
  }

  return (
    <div className="border border-slate-200 rounded-[20px] bg-white drop-shadow-md w-[300px] min-h-[230px] p-5 gap-2 shrink-0 md:min-h-[330px] md:w-[450px] md:p-8">
      <div className="flex flex-col justify-between h-full md:min-h-[300px]">
        <div className="flex gap-5 items-start">
          <Image src={doubleQuote} alt="quote" height={35} width={35} />
          <div className="flex flex-col">
            <h3 className="text-[14px] font-bold pb-2 text-right md:text-2xl">
              #{jobTag}
            </h3>
            <p className="text-[11px] text-slate-500 leading-[18px] md:text-base md:leading-[25px]">
              {description}
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center pt-2 md:pt-5">
          <Image
            className="md:h-[60px] md:w-[60px]"
            src={profileImageLink}
            alt="avatar"
            height={40}
            width={40}
            style={{
              objectFit: "cover",
            }}
          />
          <div className="flex flex-col">
            <h3 className="text-[15px] font-medium pb-1 md:text-lg">{name}</h3>
            <p className="text-[10px] text-slate-400 md:text-sm">
              {position} {organization}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
