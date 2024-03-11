"use client";

import PrimaryButton from "@/components/buttons/primaryButton/PrimaryButton";
import SecondaryButton from "@/components/buttons/secondaryButton/SecondaryButton";
import GhostButton from "@/components/buttons/ghostButton/GhostButton";
import DangerButton from "@/components/buttons/dangerButton/DangerButton";
import DangerModal from "@/components/modal/dangerModal/DangerModal";
import toast from "react-hot-toast";
import FilesInput from "@/components/input/fileInput/FileInput";
import { useState } from "react";

export default function LoggedIn() {
  const [primaryLoading, setPrimaryLoading] = useState(false);
  const [dangerLoading, setDangerLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-3">
        <PrimaryButton
          type="submit"
          isDisabled={disabled}
          onClick={() => {
            setPrimaryLoading((prev) => !prev);
            setDisabled(true);
            // Simulate an asynchronous job with a 2-second delay
            setTimeout(function () {
              // Code to be executed after the 2-second delay
              setPrimaryLoading((prev) => !prev);
              setDisabled(false); // Assuming you want to enable the button again
              toast.success("Completed!");
            }, 2000);
          }}
          isLoading={primaryLoading}
          loadingMessage="loading"
        >
          Primary (with success toast)
        </PrimaryButton>

        <SecondaryButton isDisabled={disabled}>Secondary</SecondaryButton>

        <GhostButton isDisabled={disabled}>Ghost</GhostButton>

        <DangerButton
          isDisabled={disabled}
          isLoading={dangerLoading}
          loadingMessage="loading"
          onClick={() => setShowModal(true)}
        >
          Danger (with error toast)
        </DangerButton>

        <DangerModal
          message="ยืนยันที่จะลบงาน?"
          dangerButtonMessage="ลบงาน"
          secondaryButtonMessage="ยกเลิก"
          isShowModal={isShowModal}
          setShowModal={setShowModal}
          onDangerClick={() => {
            setDangerLoading((prev) => !prev);
            setDisabled(true);
            // Simulate an asynchronous job with a 2-second delay
            setTimeout(function () {
              // Code to be executed after the 2-second delay
              setDangerLoading((prev) => !prev);
              setDisabled(false); // Assuming you want to enable the button again
              toast.error("error!");
            }, 2000);
          }}
        />
      </div>

      <div className="max-w-lg">
        <FilesInput
          label="รายละเอียดเกี่ยวกับงาน (ไม่บังคับ)"
          files={files}
          setFiles={setFiles}
          isDisabled={disabled}
          maxSizeInMegaByte={5}
        />
      </div>
    </div>
  );
}
