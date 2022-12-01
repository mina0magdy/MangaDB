import React from "react";
import { Fragment, useState, useEffect } from "react";
import NavBar from "../NavBar";
import CourseDetailsCard from "./CourseDetailsCard";
import axios from "axios";
import AddToCartCard from "./AddToCartCard";
import CourseContent from "./CourseContent";
import CourseReviews from "./CourseReviews";

const courseId = "638643b087d3f94e4cb7a2be";

const rev = [
  {
    rating: 1,
    username: "Misho",
    review:
      "lorem Ipsum is simply  dummy. Lorem Ipsum is simply Lorem Ipsum. Lorem Ips    incorrectly reports that Lorem Ips is simply Lorem Ipsum. Lorem Ips incorrectly reports that Lorem Ips incorrectly reports that Lore      mips Lorem Ips incorrectly reports that Lore ",
    date: "July 23, 2021",
  },
  {
    rating: 2,
    username: "Misho",
    review: "This is review 2",
    date: "July 23, 2021",
  },
  {
    rating: 4.5,
    username: "Misho",
    review: "This is review 3",
    date: "July 23, 2021",
  },
];

const CourseDetailsPageNew = (props) => {
  const [courseDetails, setCourseDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:3000/course/".concat(courseId)).then((res) => {
      setCourseDetails(res.data.course);
      setLoaded(true);
      console.log(res.data.course);
    });
  }, []);

  return (
    <Fragment>
      <NavBar />
      <div className="bg-veryLightBlue py-4 px-6 flex justify-between">
        <CourseDetailsCard
          courseTitle={courseDetails.courseTitle}
          level={courseDetails.level}
          instructorName={courseDetails.instructorName}
          subject={courseDetails.subject}
          courseDescription={courseDetails.courseDescription}
          rating={courseDetails.rating}
          discount={courseDetails.discount}
          coursePrice={courseDetails.coursePrice}
          discountedPrice={courseDetails.discountedPrice}
          currencySymbol="$"
        />
      </div>
      <AddToCartCard courseImage={courseDetails.courseImage} />
      <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
        <div className="mb-3">Course Summary</div>
        {/* <div className="ml-10 align-middle">{props.courseSummary}</div> */}
        <div className="ml-10 align-middle font-normal">
          {courseDetails.summary}
        </div>
      </div>
      {loaded && (
        <CourseContent
          content={courseDetails.subtitles}
          courseDuration={courseDetails.totalMins}
        />
      )}
      <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
        <div className="mb-3">Course Requirements</div>
        <div className="ml-10 text-md font-normal">
          {courseDetails.requirements}
        </div>
      </div>
      {!loaded && (
        <CourseReviews
          //reviews={courseDetails.reviews}
          reviews={rev}
        />
      )}
    </Fragment>
  );
};

export default CourseDetailsPageNew;
