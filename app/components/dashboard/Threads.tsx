import Image from "next/image";
import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import ThreadsModal from "../common/threadsModal";

const Threads = () => {
  const initialThreads = [
    {
      user: {
        firstName: "Nichole",
        lastName: "Beauchamp",
        avatar: "/images/avatar.png",
      },
      title: "Card for Freya",
      subtitle: "As you may be aware Freya will be leaving us this summer 😥",
      content:
        "If you would like to leave a message in her farewell card and/or make a donation for a gift, there is an envelope and card for her in my pigeon-hole in the staff room. We will be going punting to say goodbye if anyone would like to join science for this please email me and let me know.",
      likes: 0,
    },
  ];

  const [threads, setThreads] = useState(initialThreads);
  const [newThread, setNewThread] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            avatar: "/images/avatar.png",
          },
          ...newThread,
          likes: 0,
        },
      ];
      setThreads(newThreads);
      setNewThread({ title: "", subtitle: "", content: "" });
      setIsModalOpen(false);
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleLike = (index: number) => {
    const newThreads = [...threads];
    newThreads[index].likes += 1;
    setThreads(newThreads);
  };

  return (
    <div className="bg-white p-3 rounded-3xl w-[45%] h-[45vh] min-h-[350px] overflow-hidden">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-extrabold font-playfair">Threads</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-school-blue text-white rounded-xl py-1 px-4 text-sm font-bold hover:bg-school-blue-dark h-10"
        >
          Write a thread
        </button>
      </div>

      {/* Scrollable threads list */}
      <div
        className="overflow-y-auto scrollable"
        style={{ height: "calc(100% - 80px)" }}
      >
        {threads.map((thread, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 mb-4 p-4 rounded-lg"
          >
            <div className="w-14 h-12 rounded-full bg-gray-300 overflow-hidden">
              <Image
                src={thread.user.avatar}
                alt="User Avatar"
                className="object-cover w-full h-full"
                width={40}
                height={40}
              />
            </div>
            {/* Thread details */}
            <div className="flex flex-col w-full">
              {/* Name */}
              <div className="text-mini font-bold text-school-blue font-jakarta">
                {thread.user.firstName} {thread.user.lastName}
              </div>

              {/* Thread title */}
              <div className="text-mini font-bold text-gray-700 mt-1 font-jakarta">
                {thread.title}
              </div>

              {/* Thread subtitle */}
              <div className="text-mini font-jakarta text-gray-400 mt-2">
                {thread.subtitle}
              </div>

              {/* Thread content */}
              <div className="text-mini text-gray-400 mt-1 font-jakarta">
                {thread.content.split("\n").map((line, idx) => (
                  <p key={idx} className="mt-4">
                    {line}
                  </p>
                ))}
              </div>

              {/* Like button */}
              <div className="flex items-center mt-5">
                <div
                  className="flex items-center space-x-2 bg-[#d8e3fe] rounded-full px-3 py-1 border border-school-blue hover:bg-gray-300 hover:cursor-pointer"
                  onClick={() => handleLike(index)}
                >
                  <div className="flex items-center space-x-1 text-sm text-school-blue">
                    <BiSolidLike className="w-6 h-6" />
                  </div>
                  <span className="text-school-blue font-medium">
                    {thread.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
