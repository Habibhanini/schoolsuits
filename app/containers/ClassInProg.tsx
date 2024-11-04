import ActualClass from "../components/myclass/ActualClass";
import Interaction from "../components/myclass/Interaction";
import MyClass from "../components/myclass/MyClass";

const ClassInProg = () => {
  return (
    <div className="flex flex-col gap-4 overflow-y-scroll ">
      <ActualClass />
      <div className="flex flex-row gap-4 ">
        <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full">
          <div className="col-span-5 row-span-5 ">
            {" "}
            <MyClass />
          </div>
          <div className="row-span-5 col-start-6 col-span-5">
            {" "}
            <Interaction />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassInProg;
