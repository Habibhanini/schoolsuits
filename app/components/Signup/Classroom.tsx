import React, { useState } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
interface ClassroomEntry {
  name: string;
  data1: string;
  data2: string;
  data3: string;
}
const Classroom: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to hold classroom data
  const [classrooms, setClassrooms] = useState<ClassroomEntry[]>([]);

  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    data1: "",
    data2: "",
    data3: "",
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add the new classroom to the list
    setClassrooms([...classrooms, formData]);

    // Close modal and reset form
    setIsModalOpen(false);
    setFormData({ name: "", data1: "", data2: "", data3: "" });
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">About your classes</h2>

      {/* Classroom Entry */}
      {classrooms.map((classroom, index) => (
        <div
          key={index}
          className={`border-gainsboro-100 border-b-[1px] border-solid box-border max-w-full  flex flex-row items-start justify-start pt-[7.5px] px-2.5 pb-1.5 gap-2.5 leading-[normal] tracking-[normal] text-center text-smi text-black font-plus-jakarta-sans mq1225:flex-wrap mb-3`}
        >
          <div className="h-[40px] w-[40px] relative rounded-full bg-[#3971ff]  shrink-0" />
          <div className="flex-1 flex flex-col items-start justify-start pt-[7.5px] px-0 pb-0 box-border min-w-[929px] max-w-full mq1050:min-w-full">
            <div className="w-[528px] flex flex-col items-start justify-start py-0 pl-0 pr-5 box-border gap-[5px] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-between gap-5 mq450:flex-wrap">
                <b className="relative inline-block text-left min-w-[129px]">
                  {classroom.name}
                </b>
                <a className="relative font-semibold text-[inherit] inline-block min-w-[82px]">
                  {classroom.data1}
                </a>
                <a className="w-16 relative font-semibold text-[inherit] inline-block shrink-0">
                  {classroom.data2}
                </a>
                <a className=" w-[87px] relative font-semibold text-[inherit] inline-block shrink-0">
                  {classroom.data3}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-[10px] px-0 pb-0">
            <HiEllipsisHorizontal className="w-8 h-8 relative " />
          </div>
        </div>
      ))}
      {/* Add Classroom Button */}
      <button
        className="w-48 py-3  mt-8 bg-[#F1B528] text-black font-semibold rounded-xl hover:bg-yellow-500"
        onClick={() => setIsModalOpen(true)}
      >
        Add a new classroom
      </button>

      {/* Continue Button */}
      <button className="absolute bottom-14 right-14 w-48 py-3 bg-yellow-300 text-gray-500 font-semibold rounded-xl">
        Continue
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
            <h3 className="text-xl font-semibold mb-4">Add New Classroom</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Classroom Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="data1"
                placeholder="Data 1"
                value={formData.data1}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="data2"
                placeholder="Data 2"
                value={formData.data2}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="data3"
                placeholder="Data 3"
                value={formData.data3}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classroom;
