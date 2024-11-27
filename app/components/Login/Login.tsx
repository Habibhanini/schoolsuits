import type { NextPage } from "next";

const LoginFormContainer: NextPage = ({}) => {
  return (
    <div
      className={`relative shadow-[0px_0px_70.6px_-19px_rgba(63,_61,_56,_0.25)] rounded-xl bg-white w-full overflow-hidden flex flex-col items-center justify-start p-10 box-border gap-[30px] leading-[normal] tracking-[normal] text-center text-mini text-gray-400 font-inter mq450:gap-[15px] `}
    >
      <section className="w-[331px] flex flex-col items-center justify-start gap-2.5 max-w-full text-left text-5xl text-gray-400 font-inter">
        <a className="[text-decoration:none] relative font-bold text-[inherit] mq450:text-lgi">
          School Login
        </a>
        <div className="self-stretch relative text-lg text-center">
          <p className="m-0">{`Please enter your details to get sign in `}</p>
          <p className="m-0">to your account</p>
        </div>
      </section>
      <section className="self-stretch flex flex-col items-start justify-start gap-[18px] text-left text-base text-dimgray-100 font-inter">
        <div className="self-stretch h-[55px] rounded-3xs border-silver-300 border-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-center justify-start py-4 px-5">
          <input
            className="w-[175px] [border:none] [outline:none] font-inter text-base bg-[transparent] relative text-dimgray-100 text-left inline-block p-0"
            placeholder="Enter Email / Phone No"
            type="text"
          />
        </div>
        <div className="self-stretch rounded-3xs border-silver-300 border-[1px] border-solid overflow-hidden flex flex-row items-center justify-between py-4 px-5 gap-5 mq450:flex-wrap">
          <div className="relative">Passcode</div>
          <div className="relative text-gray-400">Hide</div>
        </div>
        <div className="relative text-mini font-medium text-gray-400 text-center">
          Having trouble in sign in?
        </div>
      </section>
      <button className="cursor-pointer [border:none] py-[18px] px-[183px] bg-goldenrod rounded-3xs overflow-hidden flex flex-row items-center justify-center hover:bg-darkgoldenrod mq450:pl-5 mq450:pr-5 mq450:box-border">
        <div className="relative text-base font-semibold font-inter text-black text-left inline-block min-w-[54px]">
          Sign in
        </div>
      </button>
      <div className="relative">
        <span>{`Doesn’t have an account? `}</span>
        <span className="font-semibold">Sign up</span>
      </div>
    </div>
  );
};

export default LoginFormContainer;
