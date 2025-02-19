import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import BottleneckChart from "./BottleneckChart";
import PieChart from "./PieChart";

const ChartsContainer = () => {
  return (
    <div className="bg-white  p-3 rounded-3xl ">
      <h1 className="text-xl font-bold text-gray-800">
        Report for the last quarters for every schools
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Conclusions: Every school’s note is looking good overall. You can add
        more details or insights here as needed.
      </p>

      {/* Charts layout */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-row gap-4">
          <BottleneckChart />
          <AreaChart />
        </div>
        <div className="flex flex-row gap-4">
          <BarChart />
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default ChartsContainer;
