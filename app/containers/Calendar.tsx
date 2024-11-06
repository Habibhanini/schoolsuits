import CalendarComponent from "../components/Schedule/Calendar";
import ActualClass from "../components/myclass/ActualClass";
import Interaction from "../components/myclass/Interaction";
import MyClass from "../components/myclass/MyClass";

const Calendar = () => {
  return (
    <div className="flex flex-col gap-4 2xl:overflow-hidden lg:overflow-y-auto 2xl:h-full lg:h-grow ">
      <CalendarComponent />
    </div>
  );
};

export default Calendar;
