import { useEffect, useState } from "react";
import { courses } from "../data/CoursesData";

export default function MyCourses() {

  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {

    const student = JSON.parse(localStorage.getItem("user"));

    fetch(`${import.meta.env.VITE_API_URL}/api/students/${student._id}`)
      .then(res => res.json())
      .then(data => {

        const enrolled = courses.filter(course =>
          data.enrolledCourses.includes(course.id)
        );

        setMyCourses(enrolled);

      });

  }, []);

  return (
  <div className="courses-page">
    <h1>My Courses</h1>

    <div className="courses-container">
      {myCourses.map(course => (
        <div className="course-card" key={course.id}>
          <img src={course.image} alt={course.title} />
          <div className="course-content">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}