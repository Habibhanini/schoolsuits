import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

export type SalutationsType = {
  className?: string;
  headOfYear?: string;
  philipWey?: string;
  tutor?: string;
  coralieJohnson?: string;
  headOfHouse?: string;
  marthaJenkins?: string;

  /** Style props */
  philipWeyMinWidth?: CSSProperties["minWidth"];
  tutorDisplay?: CSSProperties["display"];
  tutorMinWidth?: CSSProperties["minWidth"];
  coralieJohnsonDisplay?: CSSProperties["display"];
  coralieJohnsonMinWidth?: CSSProperties["minWidth"];
  headOfHouseDisplay?: CSSProperties["display"];
  headOfHouseMinWidth?: CSSProperties["minWidth"];
  marthaJenkinsMinWidth?: CSSProperties["minWidth"];
};

const Salutations: NextPage<SalutationsType> = ({
  className = "",
  headOfYear,
  philipWey,
  tutor,
  coralieJohnson,
  headOfHouse,
  marthaJenkins,
  philipWeyMinWidth,
  tutorDisplay,
  tutorMinWidth,
  coralieJohnsonDisplay,
  coralieJohnsonMinWidth,
  headOfHouseDisplay,
  headOfHouseMinWidth,
  marthaJenkinsMinWidth,
}) => {
  const philipWeyStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: philipWeyMinWidth,
    };
  }, [philipWeyMinWidth]);

  const tutorStyle: CSSProperties = useMemo(() => {
    return {
      display: tutorDisplay,
      minWidth: tutorMinWidth,
    };
  }, [tutorDisplay, tutorMinWidth]);

  const coralieJohnsonStyle: CSSProperties = useMemo(() => {
    return {
      display: coralieJohnsonDisplay,
      minWidth: coralieJohnsonMinWidth,
    };
  }, [coralieJohnsonDisplay, coralieJohnsonMinWidth]);

  const headOfHouseStyle: CSSProperties = useMemo(() => {
    return {
      display: headOfHouseDisplay,
      minWidth: headOfHouseMinWidth,
    };
  }, [headOfHouseDisplay, headOfHouseMinWidth]);

  const marthaJenkinsStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: marthaJenkinsMinWidth,
    };
  }, [marthaJenkinsMinWidth]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-2.5 text-left text-smi text-black font-plus-jakarta-sans ${className}`}
    >
      <div className="self-stretch overflow-hidden flex flex-row items-start justify-between gap-5">
        <div className="relative font-medium">{headOfYear}</div>
        <b
          className="relative inline-block text-royalblue text-right min-w-[67px]"
          style={philipWeyStyle}
        >
          {philipWey}
        </b>
      </div>
      <div className="self-stretch overflow-hidden flex flex-row items-start justify-between gap-5">
        <div
          className="relative font-medium inline-block min-w-[40px]"
          style={tutorStyle}
        >
          {tutor}
        </div>
        <b
          className="relative text-royalblue text-right"
          style={coralieJohnsonStyle}
        >
          {coralieJohnson}
        </b>
      </div>
      <div className="self-stretch overflow-hidden flex flex-row items-start justify-between gap-5">
        <div
          className="relative font-medium inline-block min-w-[98px]"
          style={headOfHouseStyle}
        >
          {headOfHouse}
        </div>
        <b
          className="relative inline-block text-royalblue text-right min-w-[97px]"
          style={marthaJenkinsStyle}
        >
          {marthaJenkins}
        </b>
      </div>
    </div>
  );
};

export default Salutations;
