async function handleSubmit(e) {
  e.preventDefault();

  if (!formData.email.includes("@")) {
    setError("Invalid Email");
    return;
  }

  if (formData.password.length < 6) {
    setError("Password is too short!");
    return;
  }

  try {
    const response = await fetch(
      "https://satisfied-adaptation-production-cf47.up.railway.app", // ✅ FIXED
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      navigate("/my-courses");
    } else {
      setError(data.message || "Login failed");
    }

  } catch (err) {
    console.error(err); // helps debugging
    setError("Server connection failed");
  }
}