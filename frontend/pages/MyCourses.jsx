import { useEffect, useState } from "react";
import { courses } from "../data/CoursesData";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const student = JSON.parse(localStorage.getItem("user"));

      if (!student) return;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/${student._id}`
      );

      const data = await res.json();

      const enrolled = courses.filter(course =>
        data.enrolledCourses.includes(course.id)
      );

      setMyCourses(enrolled);
    }

    fetchCourses();
  }, []);

  return (
    <div className="courses-page">
      <h1>My Courses</h1>

      <div className="courses-container">
        {myCourses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          myCourses.map(course => (
            <div className="course-card" key={course.id}>
              <img src={course.image} alt={course.title} />

              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}