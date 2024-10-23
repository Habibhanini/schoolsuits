import Calendar from "../components/dashboard/Calendar";
import Messages from "../components/dashboard/Messages";
import Threads from "../components/dashboard/Threads";
import Todo from "../components/dashboard/Todo";
const messagesData = [
  {
    id: 1,
    sender: "Jen Bartley",
    title: "Classes next year behaviour flags",
    body: "I have done the classlists for L2 for 8s and 9s next year here, thank you for all the colours that you added, this was very helpful.",
    summary:
      "The email details the class placements for L2 French and Spanish for next year 8 and 9, considering student language choices, behaviour, and family ties to Spain.",
  },
  {
    id: 2,
    sender: "Jen Bartley",
    title: "Classes next year behaviour flags",
    body: "I have done the classlists for L2 for 8s and 9s next year here, thank you for all the colours that you added, this was very helpful.",
    summary:
      "The email details the class placements for L2 French and Spanish for next year 8 and 9, considering student language choices, behaviour, and family ties to Spain.",
  },
];

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
