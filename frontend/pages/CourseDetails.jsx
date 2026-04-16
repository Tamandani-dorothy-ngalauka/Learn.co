import { useParams } from "react-router-dom";
import { courses } from "../../frontend/data/CoursesData";
import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";

export default function CourseDetails() {

  const { id } = useParams();
  const { toggleSave } = useContext(CourseContext);

  const course = courses.find(
    (c) => c.id === parseInt(id)
  );

  if (!course) return <h2>Course not found</h2>;

  return (
    <div className="course-details">

      <div className="course-hero">
        <img src={course.image} alt={course.title} />

        <div className="course-info">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <p><strong>Instructor:</strong> {course.instructor}</p>

          <button onClick={() => toggleSave(course)}>
            Enroll Now
          </button>
        </div>
      </div>

      <div className="course-lessons">
        <h2>Lessons</h2>

        <ul>
          {course.lessons.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}