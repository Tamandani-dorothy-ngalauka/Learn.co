import { useEffect, useState } from "react";
import { courses } from "../data/CoursesData";

export default function MyCourses() {

  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {

    const student = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:3000/api/students/${student._id}`)
      .then(res => res.json())
      .then(data => {

        const enrolled = courses.filter(course =>
          data.enrolledCourses.includes(course.id)
        );

        setMyCourses(enrolled);

      });

  }, []);

  return (
    <div>
      <h1>My Courses</h1>

      {myCourses.map(course => (
        <div key={course.id}>
          <h3>{course.title}</h3>
        </div>
      ))}
    </div>
  );
}