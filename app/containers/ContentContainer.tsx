import Dashboard from "./Dashoard";
import Student from "./Student";

interface ContentContainerProps {
  activeContent: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  activeContent,
}) => {
  const renderContent = () => {
    switch (activeContent) {
      case "Progress":
        return <div>Class In Progress</div>;

      case "Dashboard":
        return <Dashboard />;

      case "Schedule":
        return <div>Schedule In Progress</div>;

      case "Lessons":
        return <div>Lessons In Progress</div>;

      case "Students":
        return <Student />;

      case "Classes":
        return <div>Classes In Progress</div>;

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
