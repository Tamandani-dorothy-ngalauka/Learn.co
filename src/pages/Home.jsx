import React from 'react'
import homePic from "../pictures/homePic.jpg"
import englishTeacher from "../pictures/englishTeacher.jpg"
import drawing from "../pictures/drawing.jpg"

export default function Home() {
  return (
    <div>
    <div className='home'>
      <div className="description">
        <h1>Learn anywhere at your own pace.</h1>
        <p>Learn new skills, grow your confidence, and achieve your goals with expert-led courses. From language learning to creative skills, our platform makes education simple, flexible, and accessible anytime, anywhere.</p>
           <button className='homeButton'>Let's go →</button>
        </div>

        <div className="homeImage">
          <img src={homePic} alt="Picture of lady learning" />
        </div>
</div>

        <section className="courses">
  <h2>Popular Courses</h2>

  <div className="course-grid">
    <div className="card">
      <img src={englishTeacher} />
      <h3>Learn English Basics</h3>
      <p>By Tamandani Ngalauka</p>
      <span>⭐ 4.5</span>
    </div>

    <div className="card">
      <img src={drawing}/>
      <h3>Beginner Drawing</h3>
      <p>By Dorothy Ngalauka</p>
      <span>⭐ 4.7</span>
    </div>
  </div>
</section>

<section className="features">
  <div>
    <h3>🎓 Expert Teachers</h3>
    <p>Learn from industry professionals</p>
  </div>

  <div>
    <h3>⏰ Flexible Learning</h3>
    <p>Learn anytime, anywhere</p>
  </div>
</section>

<section className="testimonials">
  <h2>What Our Students Say</h2>

  <div className="testimonial-card">
    <p>"This platform helped me improve my English!"</p>
    <h4>- Jill</h4>
  </div>
</section>

<section className="cta">
  <h2>Start Learning Today</h2>
  <button>Join Now</button>
</section>
       
</div>
  )
}




