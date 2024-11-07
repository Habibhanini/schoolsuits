import CalendarComponent from "../components/Schedule/Calendar";

const Calendar = () => {
  return (
    <div className="flex flex-col gap-4 2xl:overflow-hidden lg:overflow-y-auto 2xl:h-full lg:h-grow ">
      <CalendarComponent />
    </div>
  );
};

export default Calendar;
