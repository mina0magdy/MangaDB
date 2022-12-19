import React from "react";
import { Fragment, useState, useEffect } from "react";
import NavBar from "../components/UI/NavBar/NavBar";
import CourseDetailsCard from "../components/CourseDetailsComp/CourseDetailsCard";
import axios from "axios";
import AddToCartCard from "../components/CourseDetailsComp/AddToCartCard";
import CourseContent from "../components/CourseDetailsComp/CourseContent";
import CourseReviews from "../components/CourseDetailsComp/CourseReviews";
import { useLocation } from "react-router-dom";

const CourseDetailsPage = () => {
  const location = useLocation();
  const [courseDetails, setCourseDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [courseReviews, setCourseReviews] = useState([]);
  useEffect(() => {
    const courseId = location.state.courseId;
    axios
      .get(
        "http://localhost:3000/course/"
          .concat(courseId)
          .concat("?uid=638a07cdbc3508481a2d7da9")
      )
      .then((res) => {
        setCourseDetails(res.data.course);
        console.log(res.data.course);
        setLoaded(true);
        if (
          res.data.userData!==null
        
              ) {
                setUserRegistered(true);
              } else {
                setUserRegistered(false);
              }
      });
    const userId = "638a07cdbc3508481a2d7da9";
   
    // axios
    //   .post(`http://localhost:3000/invoice/${location.state.courseId}`, {
    //     userId: userId,
    //   })
    //   .then((res) => {})
    //   .catch((error) => {
    //     if (
    //       +error.message.split(" ")[error.message.split(" ").length - 1] === 400
    //     ) {
    //       setUserRegistered(true);
    //     } else {
    //       setUserRegistered(false);
    //     }
    //   });

    axios.get("http://localhost:3000/course/rate/".concat(courseId)).then((res) => {
      // setCourseDetails(res.data.course);
      // console.log(res.data.course);
      // setLoaded(true);
      console.log(res.data.review);
      setCourseReviews(res.data.review);
    });

    // axios
    //   .get("http://localhost:3000/course/rate/".concat(courseId).concat("/"))
    //   .then((res) => {
    //     console.log(res);
    //   });
  }, []);

  const submitReviewHandler = (data) => {
    console.log(data);
    const courseId = location.state.courseId;
    axios
      .post(
        "http://localhost:3000/course/rate/".concat(courseId),
        data
      )
      .then((res) => {
        console.log(res);
      });
  };

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
      <AddToCartCard
        courseOverview={courseDetails.courseOverview}
        id={courseDetails._id}
        userRegister={userRegistered}
        courseImage={courseDetails.courseImage}
      />
      <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
        <div className="mb-3">Course Summary</div>
        <div
          className="ml-10 align-middle font-normal"
          dangerouslySetInnerHTML={{ __html: courseDetails.summary }}
        ></div>
      </div>
      {loaded && (
        <CourseContent
          content={courseDetails.subtitles}
          courseDuration={courseDetails.totalMins}
        />
      )}
      <div className="text-xl font-semibold py-4 mx-10 md:w-7/12">
        <div className="mb-3">Course Requirements</div>
        <div
          className="ml-10 font-normal"
          dangerouslySetInnerHTML={{ __html: courseDetails.requirements }}
        ></div>
      </div>
      {loaded && (
        <CourseReviews
          reviews={courseReviews}
          onSubmit={submitReviewHandler}
          userRegister={userRegistered}
        />
      )}
    </Fragment>
  );
};

export default CourseDetailsPage;