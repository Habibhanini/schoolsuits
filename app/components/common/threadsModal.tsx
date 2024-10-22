// /components/common/ThreadsModal.tsx
import React from "react";

interface ThreadsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newThread: { title: string; subtitle: string; content: string };
  handleInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  addThread: () => void;
}

const ThreadsModal: React.FC<ThreadsModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  newThread,
  handleInputChange,
  addThread,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">Add a New Thread</h2>
            <input
              type="text"
              name="title"
              placeholder="Thread Title"
              value={newThread.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              name="subtitle"
              placeholder="Thread Subtitle"
              value={newThread.subtitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <textarea
              name="content"
              placeholder="Thread Content"
              value={newThread.content}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mb-2"
              rows={3}
            />
            <div className="flex justify-end">
              <button
                onClick={addThread}
                className="bg-school-blue text-white rounded-md py-1 px-4 mr-2"
              >
                Add Thread
              </button>
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="bg-gray-300 text-gray-700 rounded-md py-1 px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThreadsModal;
