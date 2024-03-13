"use client"

import createTransaction from "@/actions/payment/transaction"
import { downloadImage } from "@/lib/utils"
import Image from "next/image"
import generatePayload from "promptpay-qr"
import QRCode from "react-qr-code"

export default function PaymentMethod({ price }: { price: number }) {
    const payload = generatePayload(process.env.RECIPIENT_NUMBER || "", {
        amount: price * 0.5 * 0.15 + price * 0.5,
    })

    return (
        <div className="mt-[13px] lg:order-1 lg:mt-0 lg:row-span-5">
            <div className="flex">
                <p className="text-sm font-medium text-[#0F172A] lg:text-xl">
                    ช่องทางการชำระเงิน
                </p>
            </div>

            <div className="mt-[6px] border border-[#cbd5e1] py-[8px] px-[12px] rounded-md flex flex-col items-center lg:py-[20px] lg:px-[20px]">
                <p className="w-full h-[24px] text-xl font-bold text-[#1E293B] text-center lg:text-[32px] lg:h-[40px] ">
                    สแกน QR Code
                </p>

                <p className="w-full h-[24px] text-sm text-[#1E293B] text-center lg:text-[16px]">
                    ผ่านแอพพลิเคชั่นธนาคาร
                </p>

                <div className="mt-[8px] h-[170px] w-[170px] rounded-md border border-[#CBD5E1] flex justify-center items-center lg:h-[325px] lg:w-[325px]">
                    <div className="h-[155px] w-[155px] lg:h-[290px] lg:w-[290px]">
                        <QRCode
                            style={{ maxWidth: "100%", width: "100%" }}
                            value={payload}
                            viewBox={`0 0 155 155`}
                            id="qr"
                            className="h-[155px] w-[155px] lg:h-[290px] lg:w-[290px]" />
                    </div>
                </div>

                <button
                    className="px-[16px] py-[8px] mt-[8px] flex justify-center items-center rounded-md border border-[#64748b] lg:mt-[20px]"
                    onClick={() => downloadImage('qr', "PromptpayQR.jpeg")}
                >
                    <Image src={'/icons/download.svg'} alt="chat" width={18} height={18} className="mr-[5px]" />
                    <p className="text-sm font-bold text-[#1e293b]">
                        บันทึก QR
                    </p>
                </button>

                <p className="mt-[8px] text-sm text-[#475569] lg:text-[16px] lg:mt-[15px]">
                    ชื่อบัญชี : บริษัทโซ้ยบัญชี จำกัด (มหาชน)
                </p>

            </div>
        </div>
    )
}
