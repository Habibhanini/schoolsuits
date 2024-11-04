import Image from "next/image";
import React, { useCallback } from "react";

export type RootType = {
  className?: string;
};
const UsersTable = ({ className = "" }) => {
  const onAccordionHeaderClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const element = event.target as HTMLElement;

      const accItem: HTMLElement =
        element.closest("[data-acc-item]") || element;
      const accContent = accItem.querySelector(
        "[data-acc-content]"
      ) as HTMLElement;
      const isOpen = accItem.hasAttribute("data-acc-open");
      const nextOuterSibling =
        accItem?.nextElementSibling ||
        (accItem?.parentElement?.nextElementSibling as HTMLElement);
      const prevOuterSibling =
        accItem?.previousElementSibling ||
        (accItem?.parentElement?.previousElementSibling as HTMLElement);
      const siblingContainerAccItem = accItem?.hasAttribute("data-acc-original")
        ? accItem?.nextElementSibling ||
          nextOuterSibling?.querySelector("[data-acc-item]") ||
          nextOuterSibling
        : accItem?.previousElementSibling ||
          prevOuterSibling?.querySelector("[data-acc-item]") ||
          prevOuterSibling;
      const siblingAccItem =
        (siblingContainerAccItem?.querySelector(
          "[data-acc-item]"
        ) as HTMLElement) || siblingContainerAccItem;

      if (!siblingAccItem) return;
      const originalDisplay = "flex";
      const siblingDisplay = "flex";

      const openClasses = ["grid-rows-[1fr]"];
      const closeClasses = ["pt-0", "pb-0", "mb-0", "mt-0", "grid-rows-[0fr]"];

      if (isOpen) {
        accContent?.classList.remove(...openClasses);
        accContent?.classList.add(...closeClasses);

        setTimeout(() => {
          if (accItem) {
            accItem.style.display = "none";
            siblingAccItem.style.display = siblingDisplay;
          }
        }, 100);
      } else {
        if (accItem) {
          accItem.style.display = "none";
          siblingAccItem.style.display = originalDisplay;
        }
        const siblingAccContent = siblingAccItem?.querySelector(
          "[data-acc-content]"
        ) as HTMLElement;
        setTimeout(() => {
          siblingAccContent?.classList.remove(...closeClasses);
          siblingAccContent?.classList.add(...openClasses);
        }, 1);
      }
    },
    []
  );

  return (
    <form
      className={`m-0 rounded-xl bg-white max-w-full overflow-hidden flex flex-col items-start justify-start p-[15px] box-border gap-[15px] leading-[normal] tracking-[normal] ${className}`}
    >
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-between flex-wrap content-center gap-5">
        <a className="[text-decoration:none] w-[95px] relative text-lg font-extrabold font-playfair-display text-black text-left inline-block shrink-0">
          Users
        </a>
        <button className="cursor-pointer [border:none] py-[7px] pl-2.5 pr-[9px] bg-khaki rounded-3xs overflow-hidden flex flex-row items-start justify-start gap-2.5">
          <a className="[text-decoration:none] flex-1 relative text-smi font-bold font-plus-jakarta-sans text-olivedrab text-right">
            Add a user
          </a>
          <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
            <Image
              className="w-3 h-3 relative"
              width={12}
              height={12}
              alt=""
              src="/add.svg"
            />
          </div>
        </button>
      </div>
      <div className="overflow-hidden flex flex-row items-start justify-start py-0 pl-0 pr-[1299px] gap-2.5 mq450:pr-5 mq450:box-border mq850:pr-[324px] mq850:box-border mq1225:pr-[649px] mq1225:box-border mq1500:flex-wrap">
        <div className="rounded-3xs bg-lavender-100 overflow-hidden flex flex-row items-center justify-start py-2.5 pl-2.5 pr-[9px] gap-[5px]">
          <div className="rounded-8xs bg-royalblue overflow-hidden flex flex-col items-start justify-start py-[5px] pl-[5px] pr-1">
            <a className="[text-decoration:none] self-stretch relative text-smi font-medium font-plus-jakarta-sans text-white text-right">
              80
            </a>
          </div>
          <a className="[text-decoration:none] relative text-smi font-medium font-plus-jakarta-sans text-royalblue text-left">
            Teachers
          </a>
        </div>
        <div className="rounded-3xs border-silver border-[1px] border-solid overflow-hidden flex flex-row items-center justify-start py-2 pl-2.5 pr-[7px] gap-[5px]">
          <div className="rounded-8xs bg-silver overflow-hidden flex flex-col items-start justify-start py-[5px] pl-[5px] pr-1">
            <a className="[text-decoration:none] self-stretch relative text-smi font-medium font-plus-jakarta-sans text-dimgray text-right inline-block min-w-[30px]">
              1239
            </a>
          </div>
          <a className="[text-decoration:none] relative text-smi font-medium font-plus-jakarta-sans text-dimgray text-left inline-block min-w-[59px]">
            Students
          </a>
        </div>
      </div>
      <section className="self-stretch overflow-hidden flex flex-col items-start justify-start pt-[15px] pb-[9.1px] pl-[70px] pr-2.5 relative mq1225:pl-[35px] mq1225:box-border">
        <div className="w-full h-[65px] absolute !m-[0] top-[0px] right-[0px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0">
          <div className="absolute h-[calc(100%_-_15px)] top-[7.5px] bottom-[7.5px] left-[10px] rounded-81xl bg-royalblue w-[50px] overflow-hidden" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute top-[65px] right-[0px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute top-[130px] right-[0px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute top-[195px] right-[0px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute top-[260px] right-[0px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute right-[0px] bottom-[304px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute right-[0px] bottom-[239px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute right-[0px] bottom-[174px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute right-[0px] bottom-[109px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute right-[0px] bottom-[44px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
        </div>
        <div className="w-full h-[65px] !m-[0] absolute right-[0px] bottom-[-21px] left-[0px] border-gainsboro-100 border-b-[1px] border-solid box-border overflow-x-auto shrink-0 flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5 gap-2.5">
          <div className="h-[50px] w-[50px] relative rounded-81xl bg-royalblue overflow-hidden shrink-0" />
          <div className="w-[168px] shrink-0 flex flex-col items-start justify-start pt-[28.5px] pb-0 pl-0 pr-5 box-border">
            <div className="relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block min-w-[129px]">
              @lastnamefirstname01
            </div>
          </div>
          <div className="w-[121px] shrink-0 flex flex-col items-start justify-start pt-[28.5px] px-0 pb-0 box-border">
            <div className="w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block">
              Register Date
            </div>
          </div>
          <div className="w-[103px] shrink-0 flex flex-col items-start justify-start pt-[28.5px] px-0 pb-0 box-border">
            <div className="relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center">
              Renew Date
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-[28.5px] px-0 pb-0">
            <div className="self-stretch relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center">
              Annual revenues
            </div>
          </div>
        </div>
        <div
          className="self-stretch flex-1 flex flex-col items-start justify-start gap-[30px]"
          data-acc-group
        >
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </a>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </a>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-1.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-2.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-3.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-4.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-5.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-6.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-7.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-8.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
              <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                  <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                    Lastname Firstname
                  </b>
                  <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    Oct 01, 2022
                  </div>
                  <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    None
                  </div>
                  <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                    43’500£
                  </div>
                </div>
              </div>
              <Image
                className="h-[4.9px] w-[20.4px] relative shrink-0"
                loading="lazy"
                width={20}
                height={5}
                alt=""
                src="/union-9.svg"
              />
            </div>
            <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
              <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                @lastnamefirstname01
              </div>
              <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Register Date
              </div>
              <div className="h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Renew Date
              </div>
              <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                Annual revenues
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[1.1px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[1.1px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
          <div
            className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] cursor-pointer"
            data-acc-item
            data-acc-header
            data-acc-original
            onClick={onAccordionHeaderClick}
          >
            <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
              <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                  Lastname Firstname
                </b>
                <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                  Oct 01, 2022
                </div>
                <div className="h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                  None
                </div>
                <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                  43’500£
                </div>
              </div>
            </div>
            <Image
              className="h-[4.9px] w-[20.4px] relative shrink-0"
              loading="lazy"
              width={20}
              height={5}
              alt=""
              src="/union-10.svg"
            />
          </div>
          <div
            className="w-[1460px] hidden flex-col"
            data-acc-item
            data-acc-open
          >
            <div
              className="w-[1460px] h-[35px] flex flex-col items-start justify-start gap-[931.6px] cursor-pointer"
              data-acc-header
              onClick={onAccordionHeaderClick}
            >
              <div className="w-[1460px] h-[19.9px] flex flex-row items-end justify-start gap-[931.6px]">
                <div className="h-[19.9px] w-[508px] flex flex-col items-start justify-end pt-0 px-0 pb-[3.9px] box-border">
                  <div className="w-[508px] h-4 flex flex-row items-start justify-start gap-[50px] shrink-0">
                    <b className="h-4 w-[129px] relative text-smi inline-block font-plus-jakarta-sans text-black text-left shrink-0">
                      Lastname Firstname
                    </b>
                    <div className="h-4 w-[82px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      Oct 01, 2022
                    </div>
                    <a className="[text-decoration:none] h-4 w-16 relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      None
                    </a>
                    <div className="h-4 w-[87px] relative text-smi font-semibold font-plus-jakarta-sans text-black text-center inline-block shrink-0">
                      43’500£
                    </div>
                  </div>
                </div>
                <Image
                  className="h-[4.9px] w-[20.4px] relative shrink-0"
                  loading="lazy"
                  width={20}
                  height={5}
                  alt=""
                  src="/union.svg"
                />
              </div>
              <div className="w-[508px] h-3.5 flex flex-row items-start justify-start gap-[50px]">
                <div className="h-3.5 w-[129px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-left inline-block shrink-0">
                  @lastnamefirstname01
                </div>
                <div className="h-3.5 w-[82px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Register Date
                </div>
                <a className="[text-decoration:none] h-3.5 w-16 relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Renew Date
                </a>
                <div className="h-3.5 w-[87px] relative text-2xs font-medium font-plus-jakarta-sans text-dimgray text-center inline-block shrink-0">
                  Annual revenues
                </div>
              </div>
              <div className="relative text-[transparent] hidden" />
            </div>
            <div
              className="w-[1460px] grid flex-col items-start justify-start gap-[931.6px] cursor-default grid-rows-[0fr] [transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] accordion__open:grid-rows-[1fr] accordion__close:grid-rows-[0fr]"
              data-acc-content
            >
              <div className="[transition-property:all] ease-[cubic-bezier(0.4,_0,_0.2,_1)] duration-[150ms] overflow-hidden">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default UsersTable;
