"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import getJobTags from "@/actions/getJobTags";
import NumberInput from "@/components/input/numberInput/NumberInput";

const filterIcon = require("@/public/icons/filter.svg") as string;
const filterDarkIcon = require("@/public/icons/filterDark.svg") as string;
const closeDarkIcon = require("@/public/icons/closeDark.svg") as string;

type JobTag = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobList, setJobList] = useState<JobTag[]>([]);
  const [filtered, setFiltered] = useState({
    startDate: "",
    endDate: "",
    jobTags: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    async function getAllJobTags() {
      try {
        const jobTags = await getJobTags();
        setJobList(jobTags);
      } catch (error) {
        console.error("Error fetching job tags:", error);
      }
    }
    getAllJobTags();
  }, []);

  useEffect(() => {
    async function setSearchKeyword() {
      try {
        const q = searchParams.get("q");
        if (q !== null) setKeyword(q);
      } catch (error) {
        console.error("Error set SearchKeyword:", error);
      }
    }

    setSearchKeyword();
  }, [searchParams]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const clearInput = () => {
    setFiltered({
      startDate: "",
      endDate: "",
      jobTags: "",
      minPrice: 0,
      maxPrice: 0,
    });
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const { startDate, endDate, jobTags, minPrice, maxPrice } = filtered;
    let filterString: string = "";
    if (startDate || endDate || jobTags || minPrice || maxPrice) {
      filterString += "&filter_used=true";
      if (startDate) filterString += `&sd=${startDate}`;
      if (endDate) filterString += `&ed=${endDate}`;
      if (minPrice) filterString += `&min=${minPrice}`;
      if (maxPrice) filterString += `&max=${maxPrice}`;
      if (jobTags) filterString += `&tag=${jobTags}`;
    }
    router.push(`/search?q=${keyword}${filterString}`);
    setIsOpen((prev) => !prev);
  };

  const handleChange = (evt: ChangeEvent) => {
    const changedInput = evt.target as HTMLInputElement; // Type assertion to HTMLInputElement
    const changedField = changedInput.name;
    const newValue = changedInput.value;

    setFiltered((currData) => ({
      ...currData,
      [changedField]: newValue,
    }));
    // console.log(changedField, newValue, typeof (newValue))
  };
  return (
    <>
      {searchParams.get("q") ? (
        <div>
          {/* Mobile Button*/}
          <button
            type="button"
            className="px-1 translate-y-1 md:hidden"
            onClick={toggleOpen}
          >
            <Image src={filterIcon} alt="filterIcon" width={24} height={24} />
          </button>

          {/* Tablet and Desktop Button */}
          <button
            type="button"
            className="hidden md:hover:bg-slate-200 md:flex md:flex-row md:items-center md:justify-center md:min-w-[99px] md:min-h-[40px] md:bg-slate-300 md:rounded-[6px] lg:min-w-[109px] lg:min-h-[48px] duration-500 "
            onClick={toggleOpen}
          >
            <div className="">
              <Image
                src={filterDarkIcon}
                alt="filterDarkIcon"
                width={24}
                height={24}
              />
            </div>
            <div className="ml-2 font-medium text-[14px] lg:text-[16px] text-slate-900">
              ตัวกรอง
            </div>
          </button>

          {/* Mobile and Desktop Filter Form */}
          {isOpen && (
            <form onSubmit={handleSubmit}>
              {/* Shadow Background When Open */}
              <div className="fixed inset-0 overflow-hidden z-40 bg-neutral-800 opacity-60"></div>
              {/* Filter Form */}
              <div className="fixed inset-0 overflow-y-auto font-ibm z-50 bg-slate-50 w-2/3 h-screen flex flex-col pt-7 px-7 pb-24 md:pb-7 justify-between lg:w-[28%]">
                <div className="flex flex-col">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    {/* Tablet and Desktop Topic */}
                    <div className="hidden lg:inline-block lg:font-bold lg:text-[24px] lg:text-slate-800 lg:mb-6">
                      จัดการตัวกรอง
                    </div>
                    <div
                      className="self-end rounded-[50%] p-1 hover:bg-slate-100 lg:self-baseline"
                      onClick={toggleOpen}
                    >
                      <Image
                        src={closeDarkIcon}
                        alt="closeDarkIcon"
                        width={30}
                        height={30}
                      />
                    </div>
                    {/* Mobile Topic */}
                    <div className="font-bold text-[24px] text-slate-800 mt-4 mb-6 lg:hidden">
                      จัดการตัวกรอง
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="font-bold text-[20px] text-slate-800 mb-2">
                    ช่วงเวลา
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:gap-2">
                    <div className="flex flex-col md:w-full">
                      <div className="font-medium text-[16px] text-slate-800 mb-1">
                        วันเริ่มต้น
                      </div>
                      <div>
                        <input
                          type="date"
                          className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-2"
                          placeholder="วว/ดด/ปปปป"
                          name="startDate"
                          value={filtered.startDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:w-full">
                      <div className="font-medium text-[16px] text-slate-800 mt-3 mb-1 md:mt-0">
                        วันสิ้นสุด
                      </div>
                      <div>
                        <input
                          type="date"
                          className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-2"
                          placeholder="วว/ดด/ปปปป"
                          name="endDate"
                          value={filtered.endDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="font-bold text-[20px] text-slate-800 mt-6 mb-2">
                    ช่วงราคา
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:gap-2">
                    <div className="flex flex-col md:w-full">
                      <div className="font-medium text-[16px] text-slate-800 mb-1">
                        ราคาต่ำสุด
                      </div>
                      <NumberInput
                        value={filtered.minPrice}
                        name="minPrice"
                        placeholder="0"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col md:w-full">
                      <div className="font-medium text-[16px] text-slate-800 mt-3 mb-1 md:mt-0">
                        ราคาสูงสุด
                      </div>
                      <NumberInput
                        value={filtered.maxPrice}
                        name="maxPrice"
                        placeholder="ราคาสูงสุด"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Job Tag */}
                  <div className="font-bold text-[20px] text-slate-800 mt-6 mb-2">
                    หมวดหมู่
                  </div>
                  <select
                    title="jobTags"
                    id="jobTags"
                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-[5.75px]"
                    name="jobTags"
                    value={filtered.jobTags}
                    onChange={handleChange}
                  >
                    <option value="">เลือกหมวดหมู่ที่ต้องการ</option>
                    {jobList.map((job) => (
                      <option key={job.title} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-row justify-between gap-2 mt-8 md:mt-0">
                  <button
                    type="button"
                    className="w-1/2 min-h-[40px] text-slate-700 text-[16px] rounded-md hover:bg-slate-200 focus:ring-2 focus:outline-none focus:ring-slate-300 duration-500"
                    onClick={clearInput}
                  >
                    ล้าง
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 min-h-[40px] text-white text-[16px] rounded-md bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 duration-500"
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="lg:min-w-[109px] lg:min-h-[48px]"></div>
      )}
    </>
  );
}
