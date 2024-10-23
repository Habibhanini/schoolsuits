// Your existing Threads component file
import Image from "next/image";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import ThreadsModal from "../common/threadsModal";
// Adjust the import path as needed

const Threads = () => {
  const initialThreads = [
    {
      user: {
        firstName: "Nichole",
        lastName: "Beauchamp",
        avatar: "/images/avatar.png", // Replace with actual avatar image
      },
      title: "Card for Freya",
      subtitle: "As you may be aware Freya will be leaving us this summer 😥",
      content:
        "If you would like to leave a message in her farewell card and/or make a donation for a gift, there is an envelope and card for her in my pigeon-hole in the staff room. We will be going punting to say goodbye if anyone would like to join science for this please email me and let me know.",
      likes: 0,
    },
    /* {
      user: {
        firstName: "Nichole",
        lastName: "Beauchamp",
        avatar: "/images/avatar.png", // Replace with actual avatar image
      },
      title: "Meeting Reminder",
      subtitle: "Don't forget about the meeting tomorrow at 10 AM.",
      content:
        "We will discuss project updates and deadlines. Please be prepared to share your progress.",
      likes: 0,
    },*/
  ];

  const [threads, setThreads] = useState(initialThreads); // State to hold threads
  const [newThread, setNewThread] = useState({
    title: "",
    subtitle: "",
    content: "",
  }); // State to hold new thread input
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewThread((prev) => ({ ...prev, [name]: value }));
  };

  const addThread = () => {
    if (newThread.title && newThread.subtitle && newThread.content) {
      const newThreads = [
        ...threads,
        {
          user: {
            firstName: "Nichole",
            lastName: "Beauchamp",
            avatar: "/images/avatar.png", // Replace with actual avatar image
          },
          ...newThread,
          likes: 0, // Initialize likes to 0
        },
      ];
      setThreads(newThreads);
      setNewThread({ title: "", subtitle: "", content: "" }); // Reset input fields
      setIsModalOpen(false); // Close the modal
    } else {
      alert("Please fill in all fields!"); // Optional: alert if fields are empty
    }
  };

  const handleLike = (index: number) => {
    const newThreads = [...threads];
    newThreads[index].likes += 1; // Increment likes for the specific thread
    setThreads(newThreads); // Update state
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg h-[400px] w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold font-playfair">Threads</h2>
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal
          className="bg-school-blue text-white rounded-md py-1 px-4 text-sm font-bold hover:bg-school-blue-dark"
        >
          Write a thread
        </button>
      </div>

      {/* Scrollable threads list */}
      <div
        className={`${
          threads.length > 1
            ? "max-h-[300px] overflow-y-auto scrollable "
            : "max-h-[400px]"
        }`}
      >
        {threads.map((thread, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 mb-4 p-4 rounded-lg"
          >
            <div className="w-14 h-12 rounded-full bg-gray-300 overflow-hidden">
              <Image
                src={thread.user.avatar} // Use user's avatar image
                alt="User Avatar"
                className="object-cover w-full h-full"
                width={40}
                height={40}
              />
            </div>
            {/* Thread details */}
            <div className="flex flex-col w-full">
              {/* Name */}
              <div className="text-lg font-bold text-school-blue font-jakarta">
                {thread.user.firstName} {thread.user.lastName}
              </div>

              {/* Thread title */}
              <div className="text-lg font-bold text-gray-700 mt-1 font-jakarta">
                {thread.title}
              </div>

              {/* Thread subtitle */}
              <div className="text-base font-jakarta text-gray-400 mt-2">
                {thread.subtitle}
              </div>

              {/* Thread content */}
              <div className="text-base text-gray-400 mt-1 font-jakarta">
                {thread.content.split("\n").map((line, idx) => (
                  <p key={idx} className="mt-4">
                    {line}
                  </p>
                ))}
              </div>

              {/* Like button */}
              <div className="flex items-center mt-8">
                <div
                  className="flex items-center space-x-2 bg-[#d8e3fe] rounded-full px-3 py-1 border border-school-blue hover:bg-gray-300 hover:cursor-pointer"
                  onClick={() => handleLike(index)} // Pass the index to handleLike
                >
                  <div className="flex items-center space-x-1 text-sm text-school-blue">
                    <BiSolidLike className="w-6 h-6" />
                  </div>
                  <span className="text-school-blue font-medium">
                    {thread.likes}
                  </span>
                  {/* Display likes for the specific thread */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render the ThreadsModal component */}
      <ThreadsModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        newThread={newThread}
        handleInputChange={handleInputChange}
        addThread={addThread}
      />
    </div>
  );
};

export default Threads;
