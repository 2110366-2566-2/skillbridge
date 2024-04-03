import LoadingProfileInfo from "./subProfile/LoadingProfileInfo";
import LoadingJobHistoryList from "./subProfile/LoadingJobHistoryList";
export default function LoadingProfilePage() {
    return (
        <div className="w-full md:flex md:justify-center md:px-[4px] md:py-[16px]">
            <div className="flex flex-col w-full md:max-w-[500px] md:mr-[30px] lg:mr-[50px]">
                <LoadingProfileInfo />
            </div>
            <LoadingJobHistoryList />
        </div>
    );
}
