"use client";

import React, { useState } from "react";
import DangerButton from "../public/buttons/dangerButton/DangerButton";
import DangerModal from "../public/modal/dangerModal/DangerModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import closeJobApplicationByID from "@/actions/createAndUpdateJobs/closeJobApplicationByID";

type Props = {
  children: React.ReactNode;
  jobId: string;
  jobName: string;
};

function CloseJobButton({ children, jobId, jobName }: Props) {
  const router = useRouter();
  const [isShowModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  return (
    <div>
      <DangerButton
        isDisabled={isDisabled}
        isLoading={isLoading}
        loadingMessage={"กำลังปิดรับสมัคร"}
        onClick={() => setShowModal(true)}
      >
        {children}
      </DangerButton>

      <DangerModal
        message={`คุณกำลังจะปิดรับสมัคร ${jobName}`}
        dangerButtonMessage={"ยืนยัน"}
        secondaryButtonMessage={"ยกเลิก"}
        isShowModal={isShowModal}
        setShowModal={setShowModal}
        onDangerClick={async () => {
          setLoading((prev) => !prev);
          setDisabled(true);
          await closeJobApplicationByID(jobId);
          setLoading((prev) => !prev);
          setDisabled(false); // Assuming you want to enable the button again
          toast.success(`ปิดรับสมัครงาน ${jobName} สำเร็จ!`);
          router.push("/jobs");
        }}
      />
    </div>
  );
}

export default CloseJobButton;
