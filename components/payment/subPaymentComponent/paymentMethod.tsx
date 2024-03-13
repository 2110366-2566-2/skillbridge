'use client'

import { downloadImage } from "@/lib/utils"
import Image from "next/image"
import generatePayload from "promptpay-qr"
import QRCode from "react-qr-code"

export default function PaymentMethod({ price }: { price: number }) {
    const payload = generatePayload(process.env.RECIPIENT_NUMBER || '', { amount: (price * 0.5) * 0.15 + (price * 0.5) })

    return (
        <div>
            <p className="text-sm font-medium text-[#0F172A]">
                ช่องทางการชำระเงิน
            </p>

            <div className="mt-[6px] border border-[#cbd5e1] py-[8px] px-[12px] rounded-md flex flex-col items-center">

                <p className="w-full h-[24px] text-xl font-bold text-[#1E293B] text-center">
                    สแกน QR Code
                </p>

                <p className="w-full h-[24px] text-sm text-[#1E293B] text-center">
                    ผ่านแอพพลิเคชั่นธนาคาร
                </p>

                <div className="mt-[8px] bg-black h-[170px] w-[170px]">
                    <QRCode size={170} style={{ maxWidth: "100%", width: "100%" }} value={payload} viewBox={`0 0 170 170`} id="qr" />
                </div>

                <button className="px-[16px] py-[8px] mt-[8px] flex justify-center items-center rounded-md border border-[#64748b]" onClick={() => downloadImage('qr',"PromptpayQR.jpeg")}>
                    <Image src={'/icons/download.svg'} alt="chat" width={18} height={18} className="mr-[5px]" />
                    <p className="text-sm font-bold text-[#1e293b]">
                        บันทึก QR
                    </p>
                </button>

                <p className="mt-[8px] text-sm text-[#475569]">
                    ชื่อบัญชี : บริษัทโซ้ยบัญชี จำกัด (มหาชน)
                </p>

            </div>
        </div>
    )
}

