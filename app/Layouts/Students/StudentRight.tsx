import AdditionalInfo from "@/app/components/student/AdditionalInfo";
import DietaryNeeds from "@/app/components/student/DietaryNeeds";
import StudentContacts from "@/app/components/student/StudentContacts";

const StudentRight = () => {
  /* const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1536); // 1536px is the breakpoint for '2xl'
    };

    // Set initial value
    handleResize();

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);*/
  return (
    <div className="flex flex-col gap-4">
      <div>
        <StudentContacts />
      </div>
      <div>
        <DietaryNeeds />
      </div>
      <div>
        <AdditionalInfo />
      </div>
    </div>
  );
};

export default StudentRight;
