import { Link } from "react-router-dom";
import { courses } from "../../frontend/data/CoursesData";
import { CourseContext } from "../context/CourseContext";

export default function Courses() {
  return (
    <div className="courses-page">
      <h1>Our Courses</h1>

      <div className="courses-container">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="course-link"
          >
            <div className="course-card">
              <img src={course.image} alt={course.title} />

              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.category}</p>
                <button className="enroll-btn">Enroll Now</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}