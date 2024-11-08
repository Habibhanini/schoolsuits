import Calendar from "./Calendar";
import ClassInProg from "./ClassInProg";
import Dashboard from "./Dashoard";
import Student from "./Student";
import Users from "./Users";

interface ContentContainerProps {
  activeContent: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  activeContent,
}) => {
  const renderContent = () => {
    switch (activeContent) {
      case "Progress":
        return (
          <div>
            <ClassInProg />
          </div>
        );

      case "Dashboard":
        return <Dashboard />;

      case "Schedule":
        return (
          <div>
            <Calendar />
          </div>
        );

      case "Lessons":
        return <div>Lessons In Progress</div>;

      case "Students":
        return <Student />;

      case "Classes":
        return <div>Classes In Progress</div>;

      case "Users":
        return <Users />;

      case "Messages":
        return <div>Messages In Progress</div>;

      case "Documents":
        return <div>Documents In Progress</div>;

      case "Help":
        return <div>Help & FAQ</div>;

      default:
        return <Dashboard />;
    }
  };

  return <div className="flex-1 p-4 bg-gray-100">{renderContent()}</div>;
};

export default ContentContainer;
