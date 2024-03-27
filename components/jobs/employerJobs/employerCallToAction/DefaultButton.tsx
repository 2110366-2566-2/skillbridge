import ProgressButton from "../ProgressButton";

export default function CancelButton({
    studentId,
    jobId,
}: {
    studentId: string;
    jobId: string;
}) {
    return (
        <div className="w1/2 flex flex-row justify-between">
            <ProgressButton jobId={jobId} studentId={studentId} />
        </div>
    );
}
