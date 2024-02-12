"use client";

import React, { useState } from "react";
import PendingTasksPanel from "./PendingTasksPanel";
import DoneTasksPanel from "./DoneTasksPanel";
import Link from "next/link";
import { CloseOutlined, SortAscendingOutlined } from "@ant-design/icons";

type Props = {};

const TasksPanel = () => {
  const [isPending, setIsPending] = useState(true);
  const [startDateSortOption, setStartDateSortOption] = useState("-");
  const [endDateSortOption, setEndDateSortOption] = useState("-");
  const [priceSortOption, setPriceSortOption] = useState("-");
  const [applicantsSortOption, setApplicantsSortOption] = useState("-");
  const [isOpeningSideBar, setIsOpeningSideBar] = useState(false);

  return (
    <>
      {/* Toggle between PendingTasksPanel and DoneTasksPanel based on the value of isPending. */}
      <nav className="mb-3">
        <div className="flex flex-row gap-1 bg-slate-100 w-fit p-2 rounded-sm">
          <button
            className={`${isPending ? "bg-slate-50" : ""} hover:shadow-inner font-medium text-md rounded-sm px-[12px] py-[6px] `}
            onClick={() => setIsPending(true)}
          >
            งานปัจจุบัน
          </button>
          <button
            className={`${isPending ? "" : "bg-slate-50"} hover:shadow-inner font-medium text-md rounded-sm px-[12px] py-[6px]`}
            onClick={() => setIsPending(false)}
          >
            งานที่เสร็จแล้ว
          </button>
        </div>
      </nav>

      {/* Sort button and Create Work button */}
      <section className="my-3">
        <div className="flex flex-row gap-2 justify-end">

          {/* This is made to contain height consistency */}
          <div className="bg-transparent text-transparent py-2">|</div>

          {/* Sort button */}
          <button
            className="bg-slate-300 font-medium text-md rounded-md px-3 py-2 hover:shadow-md lg:hidden"
            onClick={() => {
              setIsOpeningSideBar(true);
            }}
          >
            <div className="flex align-center">
              <SortAscendingOutlined className="flex place-items-center" />
              <p>จัดเรียง</p>
            </div>
          </button>

          {/* Create Work button */}
          <Link href={"/works/create"} key={"createWork"}>
            <button
              className={`${isPending ? "" : "hidden"} bg-slate-900 font-medium text-md text-white rounded-md px-3 py-2 hover:shadow-md`}
            >
              สร้างงาน
            </button>
          </Link>
        </div>
      </section>

      <div className="lg:flex lg:flex-row lg:justify-between gap-2">
        {/* PendingTasksPanel and DoneTasksPanel */}
        {isPending ? (
          <PendingTasksPanel
            startDateSortOption={startDateSortOption}
            endDateSortOption={endDateSortOption}
            priceSortOption={priceSortOption}
            applicantsSortOption={applicantsSortOption}
          ></PendingTasksPanel>
        ) : (
          <DoneTasksPanel
            startDateSortOption={startDateSortOption}
            endDateSortOption={endDateSortOption}
            priceSortOption={priceSortOption}
            applicantsSortOption={applicantsSortOption}
          ></DoneTasksPanel>
        )}

        {/* Sidebar for sorting for laptop */}
        <aside className="hidden lg:flex lg:flex-col bg-slate-100 rounded-sm pt-7 pb-2 px-4 w-[200px] h-fit">
          <div className="text-2xl font-semibold">จัดเรียง</div>
          <div className="text-lg font-semibold mt-4 mb-2">ช่วงเวลา</div>
          <div className="flex flex-col gap-1 mb-2">
            <p>วันที่เริ่มต้น</p>
            <select
              value={startDateSortOption}
              onChange={(e) => {
                setStartDateSortOption(e.target.value);
              }}
            >
              <option value="">-</option>
              <option value="asc">น้อยไปมาก</option>
              <option value="desc">มากไปน้อย</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <p>วันที่สิ้นสุด</p>
            <select
              value={endDateSortOption}
              onChange={(e) => {
                setEndDateSortOption(e.target.value);
              }}
            >
              <option value="">-</option>
              <option value="asc">น้อยไปมาก</option>
              <option value="desc">มากไปน้อย</option>
            </select>
          </div>
          <div className="text-lg font-semibold mt-4 mb-2">ราคา</div>
          <div className="flex flex-col gap-1 mb-2">
            <select
              value={priceSortOption}
              onChange={(e) => {
                setPriceSortOption(e.target.value);
              }}
            >
              <option value="">-</option>
              <option value="asc">น้อยไปมาก</option>
              <option value="desc">มากไปน้อย</option>
            </select>
          </div>
          <div className="text-lg font-semibold mt-4 mb-2">จำนวนผู้สมัคร</div>
          <div className="flex flex-col gap-1 mb-2">
            <select
              value={applicantsSortOption}
              onChange={(e) => {
                setApplicantsSortOption(e.target.value);
              }}
            >
              <option value="">-</option>
              <option value="asc">น้อยไปมาก</option>
              <option value="desc">มากไปน้อย</option>
            </select>
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => {
                setStartDateSortOption("");
                setEndDateSortOption("");
                setPriceSortOption("");
                setApplicantsSortOption("");
              }}
            >
              ล้างตัวเลือก
            </button>
          </div>
        </aside>

        {/* Overlay for sidebar for sorting for mobile */}
        {isOpeningSideBar ? (
          <>
            <div className="z-10 bg-neutral-800 opacity-60 fixed top-0 right-0 left-0 bottom-0 lg:hidden"></div>
            <aside className="fixed font-ibm z-20 bg-slate-100 text-slate-900 top-0 left-0 w-2/3 h-screen flex flex-col items-center p-7 justify-between lg:hidden">
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-col gap-8 justify-start w-full">
                  <div className="flex flex-row justify-between">
                    <div className="text-3xl font-semibold">จัดเรียง</div>
                    <CloseOutlined
                      onClick={() => {
                        setIsOpeningSideBar(false);
                      }}
                    />
                  </div>

                  <div className="text-xl font-semibold mt-4">ช่วงเวลา</div>
                  <div className="flex flex-row justify-between gap-8">
                    <div className="flex flex-col gap-1 mb-2 w-full">
                      <p>วันที่เริ่มต้น</p>
                      <select
                        value={startDateSortOption}
                        onChange={(e) => {
                          setStartDateSortOption(e.target.value);
                        }}
                      >
                        <option value="">-</option>
                        <option value="asc">น้อยไปมาก</option>
                        <option value="desc">มากไปน้อย</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <p>วันที่สิ้นสุด</p>
                      <select
                        value={endDateSortOption}
                        onChange={(e) => {
                          setEndDateSortOption(e.target.value);
                        }}
                      >
                        <option value="">-</option>
                        <option value="asc">น้อยไปมาก</option>
                        <option value="desc">มากไปน้อย</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-lg font-semibold mt-4">ราคา</div>
                  <div className="flex flex-col gap-1 mb-2">
                    <select
                      value={priceSortOption}
                      onChange={(e) => {
                        setPriceSortOption(e.target.value);
                      }}
                    >
                      <option value="">-</option>
                      <option value="asc">น้อยไปมาก</option>
                      <option value="desc">มากไปน้อย</option>
                    </select>
                  </div>
                  <div className="text-lg font-semibold mt-4">
                    จำนวนผู้สมัคร
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <select
                      value={applicantsSortOption}
                      onChange={(e) => {
                        setApplicantsSortOption(e.target.value);
                      }}
                    >
                      <option value="">-</option>
                      <option value="asc">น้อยไปมาก</option>
                      <option value="desc">มากไปน้อย</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row justify-end gap-4 mt-10">
                  <button
                    onClick={() => {
                      setStartDateSortOption("");
                      setEndDateSortOption("");
                      setPriceSortOption("");
                      setApplicantsSortOption("");
                    }}
                  >
                    ล้างตัวเลือก
                  </button>
                  <button
                    className="bg-slate-700 text-slate-50 px-10 py-2 rounded-md"
                    onClick={() => {
                      setIsOpeningSideBar(false);
                    }}
                  >
                    จัดเรียง
                  </button>
                </div>
              </div>
            </aside>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TasksPanel;
