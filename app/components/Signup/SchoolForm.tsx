import React, { useState, ChangeEvent } from "react";

const SchoolForm: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleSubjectClick = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((item) => item !== subject)
        : [...prev, subject]
    );
  };
  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };
  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [defaultDate] = useState<string>(getTodayDate());
  return (
    <div className=" p-6 bg-white ">
      <h2 className="text-2xl font-semibold mb-6">About your school</h2>

      {/* School Name */}
      <div className="mb-4 flex items-center pb-8 ">
        <label className="w-1/6 text-black font-semibold font-jakarta ">
          School name
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="w-5/6 px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#F1B528]"
        />
      </div>

      {/* School Logo */}
      <div className="mb-4 flex items-center pb-8">
        <label className=" w-1/6 block text-black font-semibold font-jakarta  ">
          School Logo
        </label>
        <div className="flex items-center space-x-4">
          <label className="btn bg-[#F1B528] hover:bg-yellow-500 text-black py-2 px-4 rounded-xl cursor-pointer">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
          <span className="text-gray-500">
            {logo ? "File uploaded" : "No file uploaded yet"}
          </span>
          <div className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
            {logo ? (
              <img
                src={logo}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full"></div>
            )}
          </div>
        </div>
      </div>

      {/* School Description */}
      <div className="mb-4 flex items-center pb-8">
        <label className="block w-1/6 text-black font-semibold font-jakarta ">
          School description
        </label>
        <textarea
          placeholder="Type here"
          className="w-5/6 h-20 px-4  border-2 border-gray-300  py-2  rounded-xl focus:outline-none focus:ring focus:ring-[#F1B528]"
        ></textarea>
      </div>

      {/* Start of the Year */}
      <div className="mb-4 flex items-center pb-8">
        <label className="block w-1/6 text-black font-semibold font-jakarta ">
          Start of the year
        </label>
        <input
          type="date"
          value={defaultDate}
          className="w-5/6 max-w-[400px] px-4 py-2  border-2 border-gray-300  rounded-xl focus:outline-none focus:ring focus:ring-[#F1B528]"
        />
      </div>

      {/* Curriculum */}
      <div className="flex items-center pb-8">
        <label className="block w-1/6 text-black font-semibold font-jakarta">
          Curriculum
        </label>
        <div className="flex flex-wrap gap-2 w-5/6">
          {[
            "English",
            "French",
            "Mathematics",
            "History",
            "German",
            "Mandarin",
            "Science",
            "Physical education",
            "Drama",
            "Computing",
            "Design and Technology",
            "Music",
            "Citizenship",
            "Languages",
          ].map((subject) => (
            <span
              key={subject}
              onClick={() => handleSubjectClick(subject)}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm transition-all duration-300 ${
                selectedSubjects.includes(subject)
                  ? "bg-[#F1B528] text-black"
                  : "bg-[#FEF2EA] text-[#EC7B2B]"
              } hover:bg-yellow-200`}
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <button className="absolute bottom-14 right-14 w-48 py-3 bg-[#F1B528] text-black font-semibold rounded-xl hover:bg-yellow-500">
        Continue
      </button>
    </div>
  );
};

export default SchoolForm;
