"use client";
import React, { useState, useRef, useEffect } from "react";

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

type FileType = "pdf" | "doc" | "ppt" | "video" | "quiz";

interface FileData {
  id: number;
  name: string;
  type: FileType;
  size: string;
  url?: string; // Mock URL for demonstration
}

// Mock file viewer components
const PDFViewer = ({
  file,
  onClose,
}: {
  file: FileData;
  onClose: () => void;
}) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10); // Mock total pages
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleZoomReset = () => setZoom(100);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${
        isFullscreen ? "p-0" : "p-4"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-2xl flex flex-col ${
          isFullscreen
            ? "w-full h-full rounded-none"
            : "w-full max-w-6xl h-[90vh]"
        }`}
      >
        {/* Toolbar */}
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-gray-900">{file.name}</h3>
            <span className="text-sm text-gray-500">PDF Viewer</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Page Navigation */}
            <div className="flex items-center space-x-2 border-r pr-4 mr-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                ←
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                →
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 border-r pr-4 mr-4">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-200 rounded"
                title="Zoom Out"
              >
                🔍−
              </button>
              <span className="text-sm w-16 text-center">{zoom}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-200 rounded"
                title="Zoom In"
              >
                🔍+
              </button>
              <button
                onClick={handleZoomReset}
                className="p-2 hover:bg-gray-200 rounded"
                title="Reset Zoom"
              >
                ↺
              </button>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-gray-200 rounded"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? "⊡" : "⊞"}
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 hover:bg-gray-200 rounded"
                title="Print"
              >
                🖨️
              </button>
              <button
                onClick={() => console.log("Download PDF")}
                className="p-2 hover:bg-gray-200 rounded"
                title="Download"
              >
                ⬇
              </button>
            </div>

            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-red-100 rounded text-red-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Content Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div
            className="mx-auto bg-white shadow-lg"
            style={{
              width: `${8.5 * (zoom / 100)}in`,
              minHeight: `${11 * (zoom / 100)}in`,
              padding: "2rem",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            <div className="prose max-w-none">
              <h1>PDF Document - Page {currentPage}</h1>
              <p className="text-gray-600">
                This is a mock PDF viewer. In a real implementation, you would
                use libraries like:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>react-pdf</strong> - For rendering PDF documents
                </li>
                <li>
                  <strong>pdfjs-dist</strong> - Mozilla's PDF.js for advanced
                  PDF rendering
                </li>
                <li>
                  <strong>@react-pdf-viewer/core</strong> - Feature-rich PDF
                  viewer
                </li>
              </ul>
              <p className="mt-4">
                The viewer would display the actual PDF content here with full
                support for: text selection, annotations, bookmarks, and search
                functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocViewer = ({
  file,
  onClose,
}: {
  file: FileData;
  onClose: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    `# ${file.name}\n\nThis is a mock document viewer and editor.\n\nIn a real implementation, you would use:\n- **@microsoft/office-js** for Office integration\n- **docx** library for reading/writing Word files\n- **mammoth.js** for converting .docx to HTML\n- **TinyMCE** or **Quill** for rich text editing\n\nYou can edit this content when in edit mode.`
  );
  const [zoom, setZoom] = useState(100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-gray-900">{file.name}</h3>
            <span className="text-sm text-gray-500">Document Editor</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Editing Controls */}
            <div className="flex items-center space-x-2 border-r pr-4 mr-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-3 py-1 rounded ${
                  isEditing ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {isEditing ? "👁️ Preview" : "✏️ Edit"}
              </button>
              {isEditing && (
                <>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Underline"
                  >
                    <u>U</u>
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Bullet List"
                  >
                    • ―
                  </button>
                  <button
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Numbered List"
                  >
                    1. ―
                  </button>
                </>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 border-r pr-4 mr-4">
              <button
                onClick={() => setZoom((prev) => Math.max(prev - 25, 50))}
                className="p-2 hover:bg-gray-200 rounded"
              >
                🔍−
              </button>
              <span className="text-sm w-16 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom((prev) => Math.min(prev + 25, 200))}
                className="p-2 hover:bg-gray-200 rounded"
              >
                🔍+
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => console.log("Save document")}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              💾 Save
            </button>
            <button
              onClick={() => console.log("Export as PDF")}
              className="p-2 hover:bg-gray-200 rounded"
              title="Export as PDF"
            >
              📄
            </button>

            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-red-100 rounded text-red-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Document Content Area */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <div
            className="mx-auto bg-white shadow-lg p-12 max-w-4xl"
            style={{ zoom: `${zoom}%` }}
          >
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full min-h-[600px] p-4 border-0 outline-none resize-none font-serif text-lg"
                placeholder="Start typing..."
              />
            ) : (
              <div className="prose max-w-none">
                {content.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className={line.startsWith("#") ? "text-2xl font-bold" : ""}
                  >
                    {line.replace(/^#\s/, "")}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PPTViewer = ({
  file,
  onClose,
}: {
  file: FileData;
  onClose: () => void;
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides] = useState(5);
  const [isPresenting, setIsPresenting] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const slides = [
    {
      title: "Introduction",
      content: "Welcome to the presentation",
      notes: "Greet the audience warmly",
    },
    {
      title: "Main Topic",
      content: "Key points and discussion",
      notes: "Emphasize the main concepts",
    },
    {
      title: "Examples",
      content: "Real-world applications",
      notes: "Use relatable examples",
    },
    {
      title: "Summary",
      content: "Recap of key points",
      notes: "Reinforce learning objectives",
    },
    {
      title: "Questions?",
      content: "Thank you for your attention",
      notes: "Allow time for Q&A",
    },
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPresenting) return;
      if (e.key === "ArrowRight")
        setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
      if (e.key === "ArrowLeft")
        setCurrentSlide((prev) => Math.max(prev - 1, 1));
      if (e.key === "Escape") setIsPresenting(false);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPresenting, totalSlides]);

  if (isPresenting) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="absolute top-4 right-4 text-white space-x-4 z-10">
          <span>
            Slide {currentSlide} / {totalSlides}
          </span>
          <button
            onClick={() => setIsPresenting(false)}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            Exit Presentation
          </button>
        </div>
        <div className="w-full h-full flex items-center justify-center p-8">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl aspect-[16/9] p-16 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-8">
              {slides[currentSlide - 1].title}
            </h1>
            <p className="text-3xl text-gray-600">
              {slides[currentSlide - 1].content}
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300"
          disabled={currentSlide === 1}
        >
          ‹
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prev) => Math.min(prev + 1, totalSlides))
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300"
          disabled={currentSlide === totalSlides}
        >
          ›
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Toolbar */}
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-gray-900">{file.name}</h3>
            <span className="text-sm text-gray-500">Presentation</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Slide Navigation */}
            <div className="flex items-center space-x-2 border-r pr-4 mr-4">
              <button
                onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 1))}
                disabled={currentSlide === 1}
                className="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                ←
              </button>
              <span className="text-sm">
                Slide {currentSlide} of {totalSlides}
              </span>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => Math.min(prev + 1, totalSlides))
                }
                disabled={currentSlide === totalSlides}
                className="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                →
              </button>
            </div>

            {/* View Options */}
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`px-3 py-1 rounded ${
                showNotes ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              📝 Notes
            </button>
            <button
              onClick={() => setIsPresenting(true)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              ▶️ Present
            </button>

            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-red-100 rounded text-red-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Slide Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Slide Thumbnails */}
          <div className="w-48 border-r border-gray-200 overflow-y-auto bg-gray-50 p-4">
            <h4 className="text-sm font-semibold mb-3">Slides</h4>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index + 1)}
                className={`w-full mb-2 p-2 rounded border-2 ${
                  currentSlide === index + 1
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="aspect-[16/9] bg-white rounded text-xs flex items-center justify-center">
                  Slide {index + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Main Slide View */}
          <div className="flex-1 p-8 overflow-auto">
            <div className="mx-auto max-w-5xl">
              <div className="bg-white rounded-lg shadow-xl aspect-[16/9] p-12 flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold mb-6">
                  {slides[currentSlide - 1].title}
                </h2>
                <p className="text-xl text-gray-600">
                  {slides[currentSlide - 1].content}
                </p>
              </div>

              {showNotes && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-sm mb-2">Speaker Notes:</h4>
                  <p className="text-sm text-gray-700">
                    {slides[currentSlide - 1].notes}
                  </p>
                </div>
              )}

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>
                  💡 Tip: Click "Present" for fullscreen mode. Use arrow keys to
                  navigate.
                </p>
                <p className="mt-2">In production, integrate with:</p>
                <p className="font-mono text-xs mt-1">
                  reveal.js | impress.js | Google Slides API | Office.js
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonsComponent = () => {
  const [activeSubject, setActiveSubject] = useState<Subject>("French");
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [viewingFile, setViewingFile] = useState<FileData | null>(null);

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

  // Files inside each lesson folder
  const filesByLesson: Record<string, FileData[]> = {
    "Unit 6.1Fr": [
      {
        id: 1,
        name: "French Conjugation Guide.pdf",
        type: "pdf",
        size: "2.3 MB",
      },
      {
        id: 2,
        name: "Grammar Exercises.doc",
        type: "doc",
        size: "1.2 MB",
      },
      {
        id: 3,
        name: "Lesson Presentation.ppt",
        type: "ppt",
        size: "4.5 MB",
      },
      {
        id: 4,
        name: "Vocabulary Quiz.quiz",
        type: "quiz",
        size: "0.8 MB",
      },
    ],
    "Unit 6.2Fr": [
      { id: 1, name: "Grammar Structures.pdf", type: "pdf", size: "3.1 MB" },
      { id: 2, name: "Interactive Lesson.ppt", type: "ppt", size: "4.5 MB" },
      { id: 3, name: "Student Workbook.doc", type: "doc", size: "2.8 MB" },
    ],
    "Unit 6.3Fr": [
      { id: 1, name: "Literature Analysis.pdf", type: "pdf", size: "4.2 MB" },
      {
        id: 2,
        name: "Cultural Context Video.mp4",
        type: "video",
        size: "15.6 MB",
      },
      { id: 3, name: "Discussion Questions.doc", type: "doc", size: "0.9 MB" },
    ],
    "Unit 6.4Fr": [
      { id: 1, name: "Conversation Starters.pdf", type: "pdf", size: "1.8 MB" },
      { id: 2, name: "Role Play Scenarios.doc", type: "doc", size: "1.4 MB" },
      { id: 3, name: "Speaking Presentation.ppt", type: "ppt", size: "3.2 MB" },
    ],
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "doc":
        return "📝";
      case "ppt":
        return "📊";
      case "video":
        return "🎥";
      case "quiz":
        return "❓";
      default:
        return "📄";
    }
  };

  const handleFileClick = (file: FileData) => {
    if (file.type === "pdf" || file.type === "doc" || file.type === "ppt") {
      setViewingFile(file);
    } else {
      alert(
        `Opening ${file.name} - This file type viewer is not implemented yet.`
      );
    }
  };

  const FileCard = ({ file }: { file: FileData }) => (
    <div
      onClick={() => handleFileClick(file)}
      className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{getFileIcon(file.type)}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm truncate">
            {file.name}
          </h3>
          <p className="text-xs text-gray-500">{file.size}</p>
        </div>
        {(file.type === "pdf" ||
          file.type === "doc" ||
          file.type === "ppt") && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
              Click to view
            </span>
          </div>
        )}
      </div>
    </div>
  );

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
    <div
      className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-lg hover:border-teal-300 transition-all duration-200 cursor-pointer group"
      style={{ minWidth: "180px", maxWidth: "220px" }}
      onClick={() => setOpenFolder(lesson.unit)}
    >
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
          <div className="flex items-center space-x-4">
            {openFolder && (
              <button
                onClick={() => setOpenFolder(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span className="text-xl">←</span>
                <span className="text-sm font-medium">Back to Lessons</span>
              </button>
            )}
            <h1 className="text-3xl font-bold text-gray-900">
              {openFolder ? `Files in ${openFolder}` : "Lessons"}
            </h1>
          </div>
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <span className="text-lg">+</span>
            {openFolder ? "Add a file" : "Add a lesson"}
          </button>
        </div>

        {!openFolder && (
          <>
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "16px",
                width: "100%",
              }}
            >
              {getActiveLessons().map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </>
        )}

        {openFolder && (
          <>
            {/* Folder Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {openFolder}
              </h2>
              <p className="text-sm text-gray-600">
                {filesByLesson[openFolder]?.length || 0} files in this lesson
                folder
              </p>
            </div>

            {/* Files Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
                width: "100%",
              }}
            >
              {(filesByLesson[openFolder] || []).map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </div>

            {(!filesByLesson[openFolder] ||
              filesByLesson[openFolder].length === 0) && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📁</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No files yet
                </h3>
                <p className="text-gray-500">
                  This folder is empty. Add some files to get started.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* File Viewers */}
      {viewingFile && viewingFile.type === "pdf" && (
        <PDFViewer file={viewingFile} onClose={() => setViewingFile(null)} />
      )}
      {viewingFile && viewingFile.type === "doc" && (
        <DocViewer file={viewingFile} onClose={() => setViewingFile(null)} />
      )}
      {viewingFile && viewingFile.type === "ppt" && (
        <PPTViewer file={viewingFile} onClose={() => setViewingFile(null)} />
      )}
    </div>
  );
};

export default LessonsComponent;
