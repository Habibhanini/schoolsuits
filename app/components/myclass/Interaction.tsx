import {
  StarIcon,
  UnionLeftIcon,
  UnionRightIcon,
  WarningIcon,
} from "@/app/icons/SvgIcons";
import type { NextPage } from "next";
import { IoEllipsisHorizontal } from "react-icons/io5";

export type RootType = {
  className?: string;
};

const Interaction: NextPage<RootType> = ({ className = "" }) => {
  return (
    <div
      className={`flex flex-col items-start justify-start gap-4 h-full ${className}`}
    >
      {/* Interaction Section */}
      <section className="w-full h-[45vh] min-h-[300px] max-h-[400px] rounded-xl bg-white flex flex-col items-start justify-start p-4 box-border gap-3 text-left text-mini text-black font-plus-jakarta-sans">
        <div className="self-stretch flex flex-row items-center justify-between flex-wrap content-center gap-3 text-lg font-playfair-display">
          <a className="font-playfair relative font-extrabold text-[inherit] text-base lg:text-lg">
            Interaction
          </a>
          <IoEllipsisHorizontal className="w-5 h-5 lg:w-6 lg:h-6" />
        </div>

        <div className="self-stretch flex flex-col gap-3">
          <b className="self-stretch relative text-sm">Slides</b>
          <div className="self-stretch flex flex-row items-start justify-start gap-2">
            <button
              onClick={() => {}}
              className="btn flex flex-1 rounded-xl text-xs lg:text-sm items-center justify-center transition-colors duration-300 bg-gray-300 text-black hover:bg-gray-400 h-12 min-w-0"
            >
              <UnionLeftIcon className="h-4 w-4 lg:h-5 lg:w-5 mr-1" />
              <span className="truncate">Prev. Slide</span>
            </button>
            <button
              onClick={() => {}}
              className="btn flex flex-1 rounded-xl text-xs lg:text-sm items-center justify-center transition-colors duration-300 bg-goldenrod text-white hover:bg-continue-yellow-dark h-12 min-w-0"
            >
              <span className="truncate">Next Slide</span>
              <UnionRightIcon className="ml-1 h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </div>

          <b className="self-stretch relative text-sm">Board</b>
          <div className="self-stretch flex flex-row items-start justify-start gap-2">
            <button
              onClick={() => {}}
              className="btn flex flex-1 rounded-xl text-xs lg:text-sm items-center justify-center transition-colors duration-300 bg-[#ead04f] text-white hover:bg-continue-yellow-dark h-12 min-w-0"
            >
              <StarIcon className="h-4 w-4 lg:h-5 lg:w-5 mr-1" />
              <span className="truncate">House pts</span>
            </button>
            <button
              onClick={() => {}}
              className="btn flex flex-1 rounded-xl text-xs lg:text-sm items-center justify-center transition-colors duration-300 bg-[#db6c6d] text-white hover:bg-safeguard-red-dark h-12 min-w-0"
            >
              <WarningIcon className="h-4 w-4 lg:h-5 lg:w-5 mr-1" />
              <span className="truncate">Warning</span>
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="w-full flex-1 min-h-[400px] rounded-xl bg-white flex flex-col items-start justify-start p-4 box-border gap-4 text-left text-lg text-black font-playfair-display">
        <div className="self-stretch flex flex-row items-center justify-between flex-wrap content-center gap-3">
          <h3 className="m-0 relative text-base lg:text-lg font-extrabold font-playfair inline-block">
            Timeline
          </h3>
          <IoEllipsisHorizontal className="w-5 h-5 lg:w-6 lg:h-6" />
        </div>

        <div className="self-stretch flex-1 overflow-y-auto flex flex-col items-start justify-start gap-3 text-xs text-white font-plus-jakarta-sans">
          <div className="self-stretch flex flex-row items-center justify-start gap-2">
            <div className="rounded-2xl bg-teal flex flex-col items-start justify-start py-1 px-2">
              <div className="relative font-medium text-xs">08:30</div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start text-black min-w-0">
              <div className="self-stretch flex flex-row items-center justify-start">
                <div className="relative font-medium text-xs lg:text-sm truncate">
                  Firstname S.
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-start text-2xs text-gray-300">
                <div className="relative font-medium truncate">
                  got a warning
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-row items-center justify-start py-0 px-4">
            <div className="h-4 w-px relative border-teal border-r-[1px] border-solid box-border" />
          </div>

          <div className="self-stretch flex flex-row items-center justify-start gap-2">
            <div className="rounded-2xl bg-teal flex flex-col items-start justify-start py-1 px-2">
              <div className="relative font-medium text-xs">08:30</div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start text-black min-w-0">
              <div className="self-stretch flex flex-row items-center justify-start">
                <div className="relative font-medium text-xs lg:text-sm truncate">
                  Firstname S.
                </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-start text-2xs text-gray-300">
                <div className="relative font-medium truncate">
                  got a house point
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Interaction;
