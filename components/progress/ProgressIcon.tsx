import {
    AuditOutlined,
    CheckSquareOutlined,
    CloseSquareOutlined,
    DollarOutlined,
    FileTextOutlined,
    LikeOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import React from "react";

type Props = { status: string };

export function getStatusIcon(status: string) {
    switch (status) {
        case "-PENDING":
            return (
                <AuditOutlined className="text-white font-semibold text-xl" />
            );
        case "PENDING-REJECTED":
            return (
                <CloseSquareOutlined className="text-white font-semibold text-xl" />
            );
        case "PENDING-ACCEPTED":
            return (
                <CheckSquareOutlined className="text-white font-semibold text-xl" />
            );
        case "PENDING-DISCLAIMED":
            return (
                <CloseSquareOutlined className="text-white font-semibold text-xl" />
            );
        case "ACCEPTED-DISCLAIMED":
            return (
                <CloseSquareOutlined className="text-white font-semibold text-xl" />
            );
        case "ACCEPTED-DEPOSIT_PENDING":
            return (
                <TeamOutlined className="text-white font-semibold text-xl" />
            );
        case "DEPOSIT_PENDING-IN_PROGRESS":
            return (
                <DollarOutlined className="text-white font-semibold text-xl" />
            );
        case "IN_PROGRESS-CANCELED":
            return (
                <CloseSquareOutlined className="text-white font-semibold text-xl" />
            );
        case "IN_PROGRESS-DELIVERED":
            return (
                <FileTextOutlined className="text-white font-semibold text-xl" />
            );
        case "DELIVERED-IN_PROGRESS":
            return (
                <CloseSquareOutlined className="text-white font-semibold text-xl" />
            );
        case "DELIVERED-WAGE_PAYMENT_PENDING":
            return (
                <CheckSquareOutlined className="text-white font-semibold text-xl" />
            );
        case "WAGE_PAYMENT_PENDING-DONE":
            return (
                <LikeOutlined className="text-white font-semibold text-xl" />
            );
        default:
            return "";
    }
}

export function getThaiProgressText(status: string) {
    switch (status) {
        case "-PENDING":
            return "สมัคร";
        case "PENDING-REJECTED":
            return "ไม่ผ่านการคัดเลือก";
        case "PENDING-ACCEPTED":
            return "ผ่านการคัดเลือก";
        case "PENDING-DISCLAIMED":
            return "สละสิทธิ์";
        case "ACCEPTED-DISCLAIMED":
            return "สละสิทธิ์";
        case "ACCEPTED-DEPOSIT_PENDING":
            return "ยืนยันการจ้างงาน";
        case "DEPOSIT_PENDING-IN_PROGRESS":
            return "จ่ายค่ามัดจำ";
        case "IN_PROGRESS-CANCELED":
            return "ยกเลิกการจ้างงาน";
        case "IN_PROGRESS-DELIVERED":
            return "ส่งมอบงาน";
        case "DELIVERED-IN_PROGRESS":
            return "ไม่รับมอบงาน";
        case "DELIVERED-WAGE_PAYMENT_PENDING":
            return "รับมอบงาน";
        case "WAGE_PAYMENT_PENDING-DONE":
            return "จ่ายค่าจ้างที่เหลือ";
        default:
            return "";
    }
}

export function getIconColor(status: string) {
    switch (status) {
        case "PENDING-REJECTED":
            return "red-400";
        case "PENDING-DISCLAIMED":
            return "red-400";
        case "ACCEPTED-DISCLAIMED":
            return "red-400";
        case "IN_PROGRESS-CANCELED":
            return "red-400";
        case "WAGE_PAYMENT_PENDING-DONE":
            return "green-600";
        default:
            return "slate-600";
    }
}

export default function ProgressIcon({ status }: Props) {
    const color = getIconColor(status);
    return (
        <div
            className={`${color === "red-400" ? "bg-red-400" : (color === "green-600" ? "bg-green-600" : "bg-slate-600")} rounded-full w-[45px] h-[45px] flex justify-center items-center`}
        >
            {getStatusIcon(status)}
        </div>
    );
}
