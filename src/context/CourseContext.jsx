import { createContext, useState, useEffect } from "react";

export const CourseContext = createContext();

export function CourseProvider({ children }) {

  // LOAD from localStorage
  const [savedCourses, setSavedCourses] = useState(() => {
    const stored = localStorage.getItem("savedCourses");
    return stored ? JSON.parse(stored) : [];
  });

  // SAVE to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedCourses", JSON.stringify(savedCourses));
  }, [savedCourses]);

  // TOGGLE SAVE FUNCTION
  function toggleSave(course) {
    const exists = savedCourses.find(c => c.id === course.id);

    if (exists) {
      setSavedCourses(savedCourses.filter(c => c.id !== course.id));
    } else {
      setSavedCourses([...savedCourses, course]);
    }
  }

  return (
    <CourseContext.Provider value={{ savedCourses, toggleSave }}>
      {children}
    </CourseContext.Provider>
  );
}

