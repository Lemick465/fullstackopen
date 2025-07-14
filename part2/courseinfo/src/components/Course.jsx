import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const Course = ({ courses }) => {
    return(
        <div>
            <h1>Web development curriculum</h1>
            {courses.map((course) => <div key={course.id}>
                <Header courseName={course.name} />
                <Content parts={course.parts} />
                <Footer courseParts={course.parts} />
            </div>)}
        </div>
    )
}

export default Course