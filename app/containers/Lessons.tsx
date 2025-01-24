import LessonsComponent from "../components/lessons/LessonsComponent";

const Lessons = () => {
  return (
    <div className="flex flex-col gap-4 2xl:overflow-hidden lg:overflow-y-auto 2xl:h-full lg:h-grow ">
      <LessonsComponent />
    </div>
  );
};

export default Lessons;
