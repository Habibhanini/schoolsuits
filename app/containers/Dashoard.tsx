import Calendar from "../components/dashboard/Calendar";
import Messages from "../components/dashboard/Messages";
import Threads from "../components/dashboard/Threads";
import Todo from "../components/dashboard/Todo";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-4">
            <Todo />
            <Threads />
          </div>
          <Messages />
        </div>

        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
