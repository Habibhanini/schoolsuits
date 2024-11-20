import type { NextPage } from "next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export type RootType = {
  className?: string;
};

const CalendarComponent: NextPage<RootType> = ({ className = "" }) => {
  return (
    <div
      className={`rounded-xl bg-white max-w-full overflow-hidden flex flex-col items-start justify-start py-[5px] px-[15px] box-border leading-[normal] tracking-[normal] text-right text-sm text-black font-plus-jakarta-sans ${className}`}
    >
      <div className="self-stretch border-whitesmoke-100 border-b-[2px] border-solid overflow-hidden flex flex-row items-center justify-between pt-2.5 px-0 pb-[7px] gap-5 mq450:flex-wrap">
        <div className="overflow-hidden flex flex-row items-center justify-center gap-[15px]">
          <FaChevronLeft />
          <a className=" flex-1 relative font-bold  inline-block min-w-[112px]">
            December 2024
          </a>
          <FaChevronRight />
        </div>
        <div className="flex flex-row items-center justify-center gap-5 rounded-xl bg-whitesmoke-100 border-gainsboro-100 border-[1px] border-solid box-border overflow-hidden shrink-0 text-left text-xs text-black font-jakarta">
          <div className="flex-1 bg-white border-gainsboro-100 border-r-[1px] border-solid overflow-hidden flex flex-col items-center justify-center py-[5px] px-3">
            <div className="relative font-semibold">Day</div>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[5px] px-[4px]">
            <a className="relative font-semibold">Month</a>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[5px] px-2.5">
            <a className="relative font-semibold ">Year</a>
          </div>
        </div>
      </div>
      <header className="self-stretch overflow-hidden flex flex-row items-center justify-start max-h-[60px] max-w-full text-right text-sm text-black font-plus-jakarta-sans">
        <div className="self-stretch border-whitesmoke-100 border-r-[2px] border-solid border-b-[2px] overflow-hidden flex flex-row items-center justify-center pt-6 px-[26px] pb-[21px]">
          <FaChevronLeft />
        </div>
        <div className="self-stretch border-whitesmoke-100 border-r-[2px] border-b-[2px] border-solid overflow-hidden flex flex-col items-center justify-center pt-6 px-[26px] pb-[21px]">
          <FaChevronRight />
        </div>
        <div className="flex-1 overflow-hidden flex flex-row items-start justify-start max-w-full">
          <div className="flex-1 border-r-[2px] border-whitesmoke-100 border-b-[2px] border-solid overflow-hidden flex flex-row items-center justify-center">
            <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[11px] pl-[67px] pr-[68px] gap-[5px] mq1425:hidden">
              <a className=" relative font-bold text-[inherit] inline-block min-w-[68px]">
                Monday 8
              </a>
              <div className="w-[34px] relative text-xs font-medium text-darkgray-300 inline-block">
                01:45
              </div>
            </div>
          </div>
          <div className="flex-1 border-whitesmoke-100 border-r-[2px]  border-b-[2px] border-solid overflow-hidden flex flex-row items-center justify-center">
            <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[11px] px-[67px] gap-[5px] lg:hidden">
              <a className=" self-stretch relative font-bold text-[inherit] inline-block min-w-[69px]">
                Tuesday 9
              </a>
              <div className="w-10 relative text-xs font-medium text-darkgray-300 inline-block">
                00:00
              </div>
            </div>
          </div>
          <div className="flex-1 border-whitesmoke-100 border-r-[2px]  border-b-[2px] border-solid overflow-hidden flex flex-row items-center justify-center z-[1]">
            <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[11px] px-[51px] gap-[5px] lg:hidden">
              <a className=" self-stretch relative font-bold text-[inherit] inline-block min-w-[101px]">
                Wednesday 10
              </a>
              <div className="w-10 relative text-xs font-medium text-darkgray-300 inline-block">
                00:00
              </div>
            </div>
          </div>
          <div className="flex-1 border-r-[2px]  border-whitesmoke-100 border-b-[2px] border-solid overflow-hidden flex flex-row items-center justify-center">
            <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[11px] pl-[62px] pr-[63px] gap-[5px] lg:hidden">
              <a className=" self-stretch relative font-bold text-[inherit] inline-block min-w-[78px]">
                Thursday 11
              </a>
              <div className="w-10 relative text-xs font-medium text-darkgray-300 inline-block">
                00:00
              </div>
            </div>
          </div>
          <div className="flex-1 border-whitesmoke-100 border-r-[2px] border-b-[2px] border-solid overflow-hidden flex flex-row items-center justify-center z-[1]">
            <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[11px] pl-[72px] pr-[71px] gap-[5px] lg:hidden">
              <a className=" self-stretch relative font-bold text-[inherit] inline-block min-w-[60px]">
                Friday 12
              </a>
              <div className="w-10 relative text-xs font-medium text-darkgray-300 inline-block">
                00:00
              </div>
            </div>
          </div>
          <div className="flex-1 border-whitesmoke-100 border-r-[2px]  border-b-[2px] border-solid overflow-hidden flex flex-row items-center justify-center z-[1]">
            <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[11px] px-[51px] gap-[5px] lg:hidden">
              <a className=" self-stretch relative font-bold text-[inherit] inline-block min-w-[101px]">
                Saturday 13
              </a>
              <div className="w-10 relative text-xs font-medium text-darkgray-300 inline-block">
                00:00
              </div>
            </div>
          </div>
          <div className="flex-1 border-whitesmoke-100 border-b-[2px] border-solid overflow-hidden flex flex-row items-center justify-center z-[1]">
            <div className="flex-1 overflow-hidden flex flex-col items-center justify-center py-[11px] pl-[67px] pr-[66px] gap-[5px]">
              <a className=" self-stretch relative font-bold text-[inherit] inline-block min-w-[70px]">
                Sunday 14
              </a>
              <div className="w-10 relative text-xs font-medium text-darkgray-300 inline-block">
                00:00
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="self-stretch rounded-t-none rounded-br-xl rounded-bl-none overflow-hidden flex flex-row items-start justify-start max-w-full text-right text-smi text-black font-plus-jakarta-sans">
        <div className="h-[710px] overflow-hidden flex flex-col items-start justify-start pt-[50px] px-[39px] pb-44 box-border gap-[140px] lg:hidden mq450:pt-[21px] mq450:pb-[74px] mq450:box-border mq825:pt-8 mq825:pb-[114px] mq825:box-border">
          <div className="w-[42px] h-[50px] overflow-hidden shrink-0 hidden" />
          <div className="self-stretch relative font-semibold">08:00</div>
          <div className="w-[42px] h-[140px] overflow-hidden shrink-0 hidden" />
          <div className="self-stretch relative font-semibold">09:00</div>
          <div className="w-[42px] h-[140px] overflow-hidden shrink-0 hidden" />
          <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-0.5">
            <div className="flex-1 relative font-semibold">10:00</div>
          </div>
          <div className="w-[42px] h-[140px] overflow-hidden shrink-0 hidden" />
          <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[3px] pr-1">
            <div className="flex-1 relative font-semibold">11:00</div>
          </div>
          <div className="w-[42px] h-[140px] overflow-hidden shrink-0 hidden" />
          <div className="w-[42px] h-[110px] overflow-hidden shrink-0 hidden" />
          <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0.5 pr-[3px]">
            <div className="flex-1 flex flex-col items-start justify-start gap-[110px]">
              <div className="self-stretch relative font-semibold">12:00</div>
              <div className="w-[38px] relative font-semibold inline-block z-[1]">
                13:00
              </div>
            </div>
          </div>
        </div>
        <div className="h-[634px] flex-1 flex flex-col items-start justify-start pt-[58px] px-0 pb-0 box-border max-w-[calc(100%_-_120px)] text-left text-xs lg:max-w-full mq825:pt-[38px] mq825:box-border">
          <div className="self-stretch flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-0.5 box-border max-w-full">
            <div className="self-stretch h-[315px] flex flex-col items-start justify-start pt-0 px-0 pb-0.5 box-border gap-1.5 max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-1.5 box-border max-w-full">
                <div className="self-stretch flex-1 relative border-whitesmoke-100 border-t-[2px] border-solid box-border max-w-full" />
              </div>
              <div className="w-[209px] h-[122px] flex flex-row items-start justify-start pt-0 px-[7px] pb-3 box-border">
                <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[9px]">
                  <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-1">
                    <div className="self-stretch flex-1 rounded-lg bg-lavender-200 border-lightskyblue border-[1px] border-solid overflow-hidden flex flex-row items-start justify-between py-[3px] pl-1 pr-1.5 gap-5">
                      <div className="h-[15px] overflow-hidden flex flex-col items-start justify-start gap-0.5">
                        <b className="relative shrink-0">5 min meeting</b>
                        <div className="relative text-2xs font-semibold text-cornflowerblue shrink-0">
                          8:10AM - 8:20AM
                        </div>
                      </div>
                      <div className="rounded-md bg-cornflowerblue overflow-hidden flex flex-row items-start justify-start py-0 pl-1.5 pr-[5px] text-smi text-white">
                        <b className="relative inline-block min-w-[19px]">A6</b>
                      </div>
                    </div>
                    <div className="self-stretch flex-1 rounded-lg bg-whitesmoke-200 border-silver-200 border-[1px] border-solid box-border overflow-hidden flex flex-row items-start justify-between py-[3px] pl-1 pr-1.5 min-h-[24px] gap-5">
                      <div className="flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0">
                        <b className="relative">10 min + meeting</b>
                      </div>
                      <div className="rounded-md bg-silver-300 overflow-hidden flex flex-row items-start justify-start py-[3px] pl-1.5 pr-[5px] box-border min-h-[15px] max-h-[30px] text-smi text-white">
                        <b className="relative">H8</b>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-10 rounded-lg bg-whitesmoke-200 border-silver-200 border-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-between py-[3px] pl-1 pr-1.5 min-h-[24px] gap-5">
                    <div className="flex flex-col items-start justify-start gap-px">
                      <div className="flex flex-row items-start justify-start py-0 px-px">
                        <b className="relative">20 min meeting</b>
                      </div>
                      <div className="relative text-2xs font-semibold text-silver-300">
                        8:10AM - 8:20AM
                      </div>
                    </div>
                    <div className="rounded-md bg-silver-300 overflow-hidden flex flex-row items-start justify-start py-[7px] pl-1.5 pr-[5px] box-border min-h-[15px] max-h-[30px] text-smi text-white">
                      <b className="relative">H8</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-row items-start justify-start py-0 px-[7px]">
                <div className="self-stretch flex-1 rounded-lg bg-oldlace border-goldenrod border-[1px] border-solid box-border overflow-hidden flex flex-col items-start justify-start py-[3px] px-1 gap-2.5 min-h-[24px] z-[1]">
                  <div className="self-stretch overflow-hidden flex flex-row items-start justify-between min-h-[14px] max-h-[30px] gap-5">
                    <div className="w-[135px] overflow-hidden shrink-0 flex flex-col items-start justify-start py-0 pl-0 pr-5 box-border gap-px">
                      <b className="relative inline-block min-w-[60px]">
                        Class 10Fr
                      </b>
                      <div className="relative text-2xs font-semibold text-goldenrod">
                        8:50AM - 10:00AM
                      </div>
                    </div>
                    <div className="rounded-8xs bg-goldenrod overflow-hidden flex flex-col items-center justify-center py-[7px] px-[5px] box-border max-h-[30px] text-smi text-white">
                      <b className="relative inline-block min-w-[19px]">A6</b>
                    </div>
                  </div>
                  <div className="self-stretch h-[117px] overflow-hidden flex flex-col items-start justify-start text-smi text-white">
                    <div className="self-stretch rounded-md bg-goldenrod overflow-hidden flex flex-row items-center justify-between py-[5px] px-2.5 gap-5">
                      <b className="relative inline-block min-w-[51px]">
                        Unit 4.5
                      </b>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-0.5 relative border-whitesmoke-100 border-t-[2px] border-solid box-border" />
            </div>
            <div className="self-stretch flex-1 flex flex-row items-start justify-start pt-0 px-0 pb-[470px] box-border max-w-full mt-[-158px] mq825:pb-[305px] mq825:box-border">
              <div className="self-stretch flex-1 relative border-whitesmoke-100 border-t-[2px] border-solid box-border max-w-full" />
            </div>
            <footer className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[263px] box-border max-w-full mt-[-158px]">
              <div className="self-stretch flex-1 relative border-whitesmoke-100 border-t-[2px] border-solid box-border max-w-full" />
            </footer>
            <div className="self-stretch h-0.5 relative border-whitesmoke-100 border-t-[2px] border-solid box-border mt-[-158px]" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarComponent;
