import { Link, useNavigate } from "react-router-dom";
import { courses } from "../../frontend/data/CoursesData";

export default function Courses() {
  const navigate = useNavigate();

  // 🔥 ENROLL FUNCTION
 async function handleEnroll(course, e) {
  e.preventDefault();
  e.stopPropagation();

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/students/enroll`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          courseId: course.id
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Enrollment failed");
    }

    alert("Enrolled successfully!");
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

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

                {/* 🔥 FIXED BUTTON */}
                <button
                  className="enroll-btn"
                  onClick={(e) => handleEnroll(course, e)}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}