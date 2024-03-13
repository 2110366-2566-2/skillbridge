"use client";

import React, { useState } from "react";
import DangerButton from "../buttons/dangerButton/DangerButton";
import DangerModal from "../modal/dangerModal/DangerModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
        onDangerClick={() => {
          setLoading((prev) => !prev);
          setDisabled(true);
          // Simulate an asynchronous job with a 2-second delay
          setTimeout(function () {
            // Code to be executed after the 2-second delay
            setLoading((prev) => !prev);
            setDisabled(false); // Assuming you want to enable the button again
            toast.success(`ปิดรับสมัครงาน ${jobName} สำเร็จ!`);
            router.push("/jobs");
          }, 2000);
        }}
      />
    </div>
  );
}

export default CloseJobButton;
