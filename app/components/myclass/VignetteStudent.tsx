import Image from "next/image";

export type VignetteStudentType = {
  className?: string;

  /** Variant props */
  property1?: "Default01";
};

const VignetteStudent: React.FC<VignetteStudentType> = ({
  className,

  /** Variant props */
  property1 = "Default01",
}) => {
  return (
    <div
      className={`h-[120px] w-[114.9px] flex flex-col items-start justify-start py-[5px] pl-1 pr-[3.9px] box-border relative gap-[5px] text-left text-3xs text-black font-plus-jakarta-sans ${className}`}
      data-property1={property1}
    >
      <section className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-3xs bg-whitesmoke border-whitesmoke border-[4px] border-solid box-border z-[0]" />
      <div className="w-[103.9px] h-3.5 flex flex-row items-end justify-start gap-[68.9px] z-[3] text-white">
        <div className="h-3.5 w-3.5 relative z-[2]">
          <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-black w-4 h-4" />
          <a className="[text-decoration:none] absolute top-[0px] left-[3px] font-medium text-[inherit] inline-block w-[5px] h-[13px]">
            1
          </a>
        </div>
        <div className="h-[9px] w-[21px] flex flex-col items-start justify-end pt-0 px-0 pb-[4.1px] box-border z-[1]">
          <Image
            className="w-[21px] h-[4.9px] relative"
            loading="lazy"
            width={21}
            height={5}
            alt=""
            src="/group-349.svg"
          />
        </div>
      </div>
      <div className="w-[90.9px] h-10 flex flex-row items-end justify-start gap-0.5 z-[2]">
        <div className="h-10 w-10 relative rounded bg-gainsboro-200 shrink-0 z-[2]" />
        <div className="h-[35px] w-[49px] flex flex-col items-start justify-end pt-0 px-0 pb-1 box-border z-[1]">
          <div className="w-[49px] h-[31px] flex flex-col items-start justify-start gap-[5px] shrink-0">
            <a className="[text-decoration:none] w-[50px] h-[13px] text-sm relative font-bold text-[inherit] inline-block shrink-0">
              Firstname
            </a>
            <div className="w-[11px] h-[13px] relative font-medium text-gray-300 text-xs inline-block shrink-0">
              S.
            </div>
          </div>
        </div>
      </div>
      <div className="w-[107px] h-5 flex flex-row items-start justify-start gap-[5px] z-[3] text-center text-smi">
        <div className="h-5 w-[51px] relative z-[2]">
          <div className="absolute h-full w-[31.37%] top-[0%] right-[68.63%] bottom-[0%] left-[0%] rounded-tl rounded-tr-none rounded-br-none rounded-bl bg-gold-100" />
          <div className="absolute top-[0px] left-[16px] w-[35px] h-5">
            <div className="absolute top-[0px] left-[0px] rounded-tl-none rounded-tr rounded-br rounded-bl-none bg-white w-[35px] h-5" />
            <a className="[text-decoration:none] absolute top-[2px] left-[6px] font-semibold text-[inherit] inline-block w-[11px] h-4">
              0
            </a>
            <Image
              className="absolute top-[6px] left-[24px] w-2 h-2"
              loading="lazy"
              width={8}
              height={8}
              alt=""
              src="/vector.svg"
            />
          </div>
          <Image
            className="absolute h-[59.5%] w-[23.53%] top-[20%] right-[72.55%] bottom-[20.5%] left-[3.92%] max-w-full overflow-hidden max-h-full"
            loading="lazy"
            width={12}
            height={12}
            alt=""
            src="/vector-1.svg"
          />
        </div>
        <div className="h-5 w-[51px] flex flex-row items-start justify-start p-0.5 box-border relative gap-[7.9px] z-[1]">
          <div className="h-full w-4 absolute !m-[0] top-[0px] bottom-[0px] left-[0px] rounded-tl rounded-tr-none rounded-br-none rounded-bl bg-indianred z-[0]" />
          <div className="h-full w-[35px] absolute !m-[0] top-[0px] right-[0px] bottom-[0px] rounded-tl-none rounded-tr rounded-br rounded-bl-none bg-white z-[1]" />
          <div className="h-3.5 w-3 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border z-[5]">
            <Image
              className="w-3 h-3 relative"
              loading="lazy"
              width={12}
              height={12}
              alt=""
              src="/subtract.svg"
            />
          </div>
          <a className="[text-decoration:none] h-4 w-[11px] relative font-semibold text-[inherit] inline-block shrink-0 z-[3]">
            0
          </a>
          <div className="h-3 w-2 flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border z-[4]">
            <Image
              className="w-2 h-2 relative"
              loading="lazy"
              width={8}
              height={8}
              alt=""
              src="/vector-2.svg"
            />
          </div>
        </div>
      </div>
      <div className="w-[106.9px] h-[21px] flex flex-row items-start justify-start py-[3px] px-2 box-border relative gap-[10.9px] z-[4] text-xs text-gray-100">
        <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-8xs bg-white z-[0]" />
        <div className="h-[15px] w-[79px] relative font-medium inline-block shrink-0 z-[3]">
          Attendance
        </div>
        <div className="h-[9px] w-[7.4px] flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border z-[2]">
          <Image
            className="w-[7.4px] h-px relative object-contain"
            loading="lazy"
            width={7}
            height={1}
            alt=""
            src="/arrow-2.svg"
          />
        </div>
      </div>
    </div>
  );
};
export default VignetteStudent;
