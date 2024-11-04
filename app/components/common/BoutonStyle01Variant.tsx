import type { NextPage } from "next";
import Image from "next/image";

export type BoutonStyle01VariantType = {
  className?: string;
};

const BoutonStyle01Variant: NextPage<BoutonStyle01VariantType> = ({
  className = "",
}) => {
  return (
    <button
      className={`cursor-pointer [border:none] py-[7px] px-2.5 bg-royalblue h-[30px] rounded-3xs overflow-hidden flex flex-row items-center justify-center box-border gap-2.5 ${className}`}
    >
      <b className="relative text-smi font-plus-jakarta-sans text-white text-right">
        Write a message
      </b>
      <Image
        className="w-[5.5px] relative h-[9.1px] hidden"
        width={6}
        height={9}
        alt=""
        src="/vector.svg"
      />
    </button>
  );
};

export default BoutonStyle01Variant;
