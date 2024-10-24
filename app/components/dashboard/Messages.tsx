import React from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
const Messages: React.FC = () => {
  // Message data
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
    {
      id: 3,
      sender: "Jen Bartley",
      title: "Classes next year behaviour flags",
      body: "I have done the classlists for L2 for 8s and 9s next year here, thank you for all the colours that you added, this was very helpful.",
      summary:
        "The email details the class placements for L2 French and Spanish for next year 8 and 9, considering student language choices, behaviour, and family ties to Spain.",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full h-[405px] overflow-hidden border-gray-200">
      {/* Title */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-extrabold font-playfair">Last Messages</h2>
        <button>
          <IoEllipsisHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Messages List */}
      <div className="space-y-3 overflow-y-auto scrollable h-[325px] p-2">
        {messagesData.map((message) => (
          <div
            key={message.id}
            className="bg-[#fef8f4] rounded-xl p-4 shadow-sm flex justify-between items-start mb-4"
          >
            {/* Left: Avatar */}
            <div className="flex space-x-1 w-full">
              <div className="flex items-start">
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-[#e57c36] flex items-center justify-center">
                  <span className="font-bold text-xl text-white">
                    {message.sender[0]}
                  </span>
                </div>
              </div>

              {/* Right: Sender, Title, and Body */}
              <div className="flex-1">
                {/* Sender and Title on the right of Avatar */}
                <div className="flex justify-between w-full">
                  <div className="flex flex-col ml-4">
                    <p className="text-orange-600 font-bold font-jakarta">
                      {message.sender}
                    </p>
                    <p className="text-lg font-semibold mb-1 font-jakarta">
                      {message.title}
                    </p>
                  </div>
                </div>

                <div className="ml-[-50px] mt-4">
                  <p className="text-sm text-gray-500 mb-2 font-jakarta">
                    {message.body}
                  </p>

                  <div className="flex items-center">
                    <p className="text-sm text-orange-600 font-semibold font-jakarta mr-2">
                      Assistant’s summary
                    </p>
                    <div className="flex-grow h-[3px] rounded-sm bg-safeguard-orange"></div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <p className="text-sm font-semibold text-gray-800 font-jakarta">
                      {message.summary}
                    </p>

                    {/* Interact Button positioned here */}
                    <button className="bg-safeguard-orange text-white px-4 py-2 rounded-lg font-semibold">
                      Interact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
