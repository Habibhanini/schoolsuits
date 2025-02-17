import AreaChart from "../components/reports/AreaChart";
import BarChart from "../components/reports/BarChart";
import BottleneckChart from "../components/reports/BottleneckChart";
const Reports = () => {
  return (
    <div className="flex flex-col gap-4 2xl:overflow-hidden lg:overflow-y-auto 2xl:h-full lg:h-grow ">
      <AreaChart /> <BottleneckChart /> <BarChart />
    </div>
  );
};

export default Reports;
