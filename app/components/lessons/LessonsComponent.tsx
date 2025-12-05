import React, { useState } from "react";

type Subject =
  | "Citizenship"
  | "Computing"
  | "Drama"
  | "English"
  | "French"
  | "German"
  | "Mandarin"
  | "Math"
  | "Music"
  | "Languages"
  | "Science";

const LessonsComponent = () => {
  const [activeSubject, setActiveSubject] = useState<Subject>("French");

  const subjects: Subject[] = [
    "Citizenship",
    "Computing",
    "Drama",
    "English",
    "French",
    "German",
    "Mandarin",
    "Math",
    "Music",
    "Languages",
    "Science",
  ];

  // Subject-specific lesson data
  const lessonsBySubject: Record<
    Subject,
    { id: number; unit: string; title: string; author: string }[]
  > = {
    French: [
      {
        id: 1,
        unit: "Unit 6.1Fr",
        title: "Lesson about conjugation and social abilities",
        author: "@IsomPaim & 5 teachers",
      },
      {
        id: 2,
        unit: "Unit 6.2Fr",
        title: "Advanced French grammar structures",
        author: "@MarieT & 3 teachers",
      },
      {
        id: 3,
        unit: "Unit 6.3Fr",
        title: "French literature and culture",
        author: "@PierreL & 4 teachers",
      },
      {
        id: 4,
        unit: "Unit 6.4Fr",
        title: "Conversational French practice",
        author: "@IsomPaim & 6 teachers",
      },
    ],
    English: [
      {
        id: 1,
        unit: "Unit 5.1En",
        title: "Shakespeare and modern interpretations",
        author: "@JohnS & 4 teachers",
      },
      {
        id: 2,
        unit: "Unit 5.2En",
        title: "Creative writing techniques",
        author: "@SarahM & 3 teachers",
      },
      {
        id: 3,
        unit: "Unit 5.3En",
        title: "Poetry analysis and appreciation",
        author: "@DavidW & 5 teachers",
      },
      {
        id: 4,
        unit: "Unit 5.4En",
        title: "Essay writing and structure",
        author: "@EmilyR & 2 teachers",
      },
    ],
    Math: [
      {
        id: 1,
        unit: "Unit 7.1M",
        title: "Advanced calculus concepts",
        author: "@AlexK & 3 teachers",
      },
      {
        id: 2,
        unit: "Unit 7.2M",
        title: "Statistics and probability",
        author: "@LisaC & 4 teachers",
      },
      {
        id: 3,
        unit: "Unit 7.3M",
        title: "Geometry and trigonometry",
        author: "@MikeB & 3 teachers",
      },
      {
        id: 4,
        unit: "Unit 7.4M",
        title: "Algebraic problem solving",
        author: "@AnnaD & 5 teachers",
      },
    ],
    Science: [
      {
        id: 1,
        unit: "Unit 8.1S",
        title: "Chemical reactions and bonds",
        author: "@DrSmith & 6 teachers",
      },
      {
        id: 2,
        unit: "Unit 8.2S",
        title: "Physics: Motion and energy",
        author: "@ProfJones & 4 teachers",
      },
      {
        id: 3,
        unit: "Unit 8.3S",
        title: "Biology: Cell structure",
        author: "@MsBrown & 5 teachers",
      },
      {
        id: 4,
        unit: "Unit 8.4S",
        title: "Environmental science",
        author: "@DrGreen & 3 teachers",
      },
    ],
    Computing: [
      {
        id: 1,
        unit: "Unit 9.1C",
        title: "Introduction to programming",
        author: "@CodeMaster & 4 teachers",
      },
      {
        id: 2,
        unit: "Unit 9.2C",
        title: "Web development basics",
        author: "@WebDev & 3 teachers",
      },
      {
        id: 3,
        unit: "Unit 9.3C",
        title: "Database design principles",
        author: "@DataExpert & 5 teachers",
      },
      {
        id: 4,
        unit: "Unit 9.4C",
        title: "Algorithms and data structures",
        author: "@TechGuru & 4 teachers",
      },
    ],
    Citizenship: [],
    Drama: [],
    German: [],
    Mandarin: [],
    Music: [],
    Languages: [],
  };

  const getActiveLessons = () => {
    const subjectLessons = lessonsBySubject[activeSubject] || [];
    if (subjectLessons.length === 0) {
      return [
        {
          id: 1,
          unit: `No ${activeSubject} lessons`,
          title: "Coming soon...",
          author: "Add lessons for this subject",
        },
      ];
    }

    const allLessons = [];
    for (let i = 0; i < 32; i++) {
      const baseLesson = subjectLessons[i % subjectLessons.length];
      allLessons.push({
        ...baseLesson,
        id: `${activeSubject}-${i + 1}`,
      });
    }
    return allLessons;
  };

  const LessonCard = ({
    lesson,
  }: {
    lesson: {
      id: number | string;
      unit: string;
      title: string;
      author: string;
    };
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-lg hover:border-teal-300 transition-all duration-200 cursor-pointer group">
      {/* Folder Shape */}
      <div className="relative mb-3 h-16">
        {/* Folder Tab */}
        <div
          className="absolute top-0 left-0 w-10 h-3 rounded-t-md z-10"
          style={{
            background: "linear-gradient(to right, #14b8a6, #0f766e)",
          }}
        ></div>

        {/* Main Folder Body */}
        <div
          className="absolute top-2 left-0 w-full h-12 rounded-md shadow-sm"
          style={{
            background: "linear-gradient(to bottom right, #0f766e, #0d9488)",
            clipPath: "polygon(0 20%, 25% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        ></div>

        {/* Folder Bottom Edge */}
        <div
          className="absolute bottom-0 left-0 w-full h-1 opacity-30"
          style={{
            background: "linear-gradient(to bottom, #14b8a6, transparent)",
          }}
        ></div>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-gray-900 text-sm">{lesson.unit}</h3>
        <p className="text-xs text-gray-600 leading-relaxed overflow-hidden line-clamp-2">
          {lesson.title}
        </p>
        <p className="text-xs text-gray-500 mt-2">{lesson.author}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lessons</h1>
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <span className="text-lg">+</span>
            Add a lesson
          </button>
        </div>

        {/* Subject Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeSubject === subject
                  ? "bg-orange-400 text-white border-b-2 border-orange-400"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
          {getActiveLessons().map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonsComponent;
