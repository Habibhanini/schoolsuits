import type { NextPage } from "next";
import Image from "next/image";

export type HeaderType = {
  className?: string;
};

const Header: NextPage<HeaderType> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-white border-aliceblue-300 border-[1px] border-solid overflow-hidden flex flex-row items-center justify-between py-2.5 px-5 text-right text-xs text-dimgray font-plus-jakarta-sans ${className}`}
    >
      <div className="h-[35px] w-[194px] rounded-3xs bg-whitesmoke overflow-hidden shrink-0 flex flex-row items-center justify-between p-2.5 box-border">
        <a className="[text-decoration:none] relative font-medium text-[inherit]">
          Search a student ...
        </a>
        <Image
          className="h-[15px] w-[15px] relative"
          width={15}
          height={15}
          alt=""
          src="/union.svg"
        />
      </div>
      <div className="overflow-hidden flex flex-row items-center justify-center py-[3px] px-6 text-black">
        <a className="[text-decoration:none] relative font-bold text-[inherit]">
          notification
        </a>
      </div>
      <div className="h-[35px] flex flex-row items-center justify-start gap-[15px]">
        <button className="cursor-pointer [border:none] py-3 px-2.5 bg-chocolate h-10 rounded-3xs overflow-hidden flex flex-row items-center justify-center box-border gap-[5px] min-w-[107px] max-w-[150px]">
          <Image
            className="w-[8.6px] relative h-[18px]"
            width={9}
            height={18}
            alt=""
            src="/safeguard-icon.svg"
          />
          <a className="[text-decoration:none] relative text-sm font-bold font-plus-jakarta-sans text-white text-right">
            Safeguard
          </a>
        </button>
        <div className="self-stretch w-px relative border-aliceblue-300 border-r-[1px] border-solid box-border" />
        <div className="h-10 w-[66px] relative">
          <Image
            className="absolute top-[0px] left-[0px] rounded-7xl-5 w-10 h-10 object-cover"
            width={40}
            height={40}
            alt=""
            src="/image-19@2x.png"
          />
          <Image
            className="absolute top-[15.6px] left-[50px] w-4 h-[8.9px]"
            width={16}
            height={9}
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
