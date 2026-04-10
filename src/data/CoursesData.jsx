import course1 from "../pictures/course1.jpg";
import course2 from "../pictures/course2.jpg";
import course3 from "../pictures/course3.jpg";
import course4 from "../pictures/course4.jpg";

export const courses = [
  {
    id: 1,
    title: "English Basics",
    category: "Language",
    image: course1,
    instructor: "Tamandani Ngalauka",
    description:
      "Learn the fundamentals of English including grammar, vocabulary, and basic communication skills.",
    lessons: [
      "Introduction to English",
      "Basic Grammar",
      "Vocabulary Building",
      "Sentence Formation",
      "Basic Conversations"
    ]
  },
  {
    id: 2,
    title: "Advanced English",
    category: "Language",
    image: course2,
    instructor: "Dorothy Ngalauka",
    description:
      "Improve your fluency, writing, and advanced grammar skills.",
    lessons: [
      "Advanced Grammar",
      "Essay Writing",
      "Public Speaking",
      "Professional Communication"
    ]
  },
  {
    id: 3,
    title: "Drawing for Beginners",
    category: "Art",
    image: course3,
    instructor: "Emily Daudi",
    description:
      "Learn basic drawing techniques, shapes, shading, and sketching.",
    lessons: [
      "Basic Shapes",
      "Line Drawing",
      "Shading Techniques",
      "Still Life Drawing"
    ]
  },
  {
    id: 4,
    title: "Digital Painting",
    category: "Art",
    image: course4,
    instructor: "Jill Zanga",
    description:
      "Master digital painting using modern tools and techniques.",
    lessons: [
      "Intro to Digital Tools",
      "Color Theory",
      "Brush Techniques",
      "Character Design"
    ]
  }
];