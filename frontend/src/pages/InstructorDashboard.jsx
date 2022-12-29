import { useState, useEffect, Fragment } from "react";
import question from "../Assets/Images/question.svg";
import axios from "axios";
import NavBar from "../components/UI/NavBar/NavBar";
import { BellIcon } from "@heroicons/react/solid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AverageSummary from "../components/Profile/Reviews/AverageSummary";
import ReviewItem from "../components/CourseDetailsComp/ReviewItem";
import { Divider } from "@mui/material";
import InstructorQACard from "../components/QA/InstructorQACard";
import ReportItem from "../components/CourseView/ReportItem";

const questionsStub = [
  {
    _id: 1,
    userName: "Omar Moataz",
    date: "2022-12-27T10:15:58.506+00:00",
    courseName: "React Redux hooks",
    question:
      "I don't understand the concept of forwarding props from parent to child",
  },
  {
    _id: 2,
    userName: "Marwan Ashaf",
    date: "2022-12-27T10:15:58.506+00:00",
    courseName: "React Redux hooks",
    question: "What is the purpose of living",
  },
  {
    _id: 3,
    userName: "Michel Raouf",
    date: "2022-12-27T10:15:58.506+00:00",
    courseName: "React Redux hooks",
    question: "I cant do anything please help",
  },
];
const InstructorDashboard = () => {
  const [receivedData, setReceivedData] = useState({});
  const [questions, setQuestions] = useState(questionsStub);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState([]);
  const [reports, setReports] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //loading as the endpoint contains a lot of data..
  //fetch the data as soon as he logs in..
  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/instructor/myReviews/63a36fd41bd9f2e6163b0481"
      )
      .then((res) => {
        setReceivedData(res.data.instructor);
        setCount(res.data.count);
        setLoaded(true);
      });

    axios
      .get("http://localhost:3000/problem/user/63a36fd41bd9f2e6163b0481")
      .then((res) => {
        setReports(res.data);
      });
  }, []);

  const onConfirmReplyHandler = (id, reply) => {
    //axios post
    var temp = [];
    for (var i = 0; i < questions.length; i++) {
      if (questions[i]._id !== id) {
        temp.push(questions[i]);
      }
    }
    setQuestions(temp);
    console.log(id);
    console.log(reply);
  };

  const stats = [
    {
      id: 1,
      name: "Previous Reports",
      stat: reports.length,
      icon: AccessTimeIcon,
    },
    {
      id: 2,
      name: `Unsolved Questions`,
      stat: questions.length,
      icon: "",
    },
  ];
  //handle the displayed Reviews
  var displayedReviews = [];
  if (loaded && receivedData.reviews !== []) {
    displayedReviews = receivedData.reviews.map((review) => {
      const formattedDate = review.date.substring(0, 10).split("-");
      const year = formattedDate[0];
      const month =
        formattedDate[1] === "1"
          ? "January"
          : formattedDate[1] === "2"
          ? "February"
          : formattedDate[1] === "3"
          ? "March"
          : formattedDate[1] === "4"
          ? "April"
          : formattedDate[1] === "5"
          ? "May"
          : formattedDate[1] === "6"
          ? "June"
          : formattedDate[1] === "7"
          ? "July"
          : formattedDate[1] === "8"
          ? "August"
          : formattedDate[1] === "9"
          ? "September"
          : formattedDate[1] === "10"
          ? "October"
          : formattedDate[1] === "11"
          ? "November"
          : "December";
      const day = formattedDate[2];
      const fullDate = month + " " + day + ", " + year;
      return (
        <ReviewItem
          rating={review.rating}
          username={review.userName}
          review={review.review}
          date={fullDate}
        />
      );
    });
  } else {
    displayedReviews = (
      <div className="mt-4 flex justify-center font-medium">
        No Reviews Found For This Instructor.
      </div>
    );
  }
  var displayedQuestions;
  if (questions !== []) {
    displayedQuestions = questions.map((question) => {
      const formattedDate = question.date.substring(0, 10).split("-");
      const year = formattedDate[0];
      const month =
        formattedDate[1] === "1"
          ? "January"
          : formattedDate[1] === "2"
          ? "February"
          : formattedDate[1] === "3"
          ? "March"
          : formattedDate[1] === "4"
          ? "April"
          : formattedDate[1] === "5"
          ? "May"
          : formattedDate[1] === "6"
          ? "June"
          : formattedDate[1] === "7"
          ? "July"
          : formattedDate[1] === "8"
          ? "August"
          : formattedDate[1] === "9"
          ? "September"
          : formattedDate[1] === "10"
          ? "October"
          : formattedDate[1] === "11"
          ? "November"
          : "December";
      const day = formattedDate[2];
      const fullDate = month + " " + day + ", " + year;
      return (
        <InstructorQACard
          onConfirmReplyHandler={onConfirmReplyHandler.bind(null, question._id)}
          question={question.question}
          date={fullDate}
          userName={question.userName}
          courseName={question.courseName}
        ></InstructorQACard>
      );
    });
  } else {
    displayedQuestions = (
      <div>
        Seems like your students are quiet, they don't have any questions.
      </div>
    );
  }
  var index = 0;
  var displayedReports;
  if (loaded && reports != []) {
    displayedReports = reports.map((report) => {
      index++;
      const formattedDate = report.date.substring(0, 10).split("-");
      const year = formattedDate[0];
      const month =
        formattedDate[1] === "1"
          ? "January"
          : formattedDate[1] === "2"
          ? "February"
          : formattedDate[1] === "3"
          ? "March"
          : formattedDate[1] === "4"
          ? "April"
          : formattedDate[1] === "5"
          ? "May"
          : formattedDate[1] === "6"
          ? "June"
          : formattedDate[1] === "7"
          ? "July"
          : formattedDate[1] === "8"
          ? "August"
          : formattedDate[1] === "9"
          ? "September"
          : formattedDate[1] === "10"
          ? "October"
          : formattedDate[1] === "11"
          ? "November"
          : "December";
      const day = formattedDate[2];
      const fullDate = month + " " + day + ", " + year;
      return (
        <ReportItem
          type={report.type}
          status={report.status}
          index={index}
          date={fullDate}
          description={report.description}
          isReport={true}
        />
      );
    });
  } else {
    displayedReports = <div>No Reports Found!</div>;
  }
  return (
    <Fragment>
      <NavBar></NavBar>
      <div className=" flex space-x-14 mt-4 items-center justify-center">
        <div className="font-semibold text-xl text-center text-gray-700 ">
          <p>Welcome Back,</p>
          <p className="text-center text-3xl font-semibold">
            {receivedData.firstName} {receivedData.lastName}!
          </p>
          <p className="text-center mt-6 text-gray-500 flex space-x-2 items-center justify-center">
            <BellIcon className="fill-yellow-400 w-6 h-8 mr-2"></BellIcon>
            You have {questions.length} unanswered questions from your students
          </p>
        </div>
        <img className="w-[15%] h-[15%]" src={question} alt=""></img>
      </div>
      <div className=" items-center">
        <dl className="mt-5 sm:flex sm:justify-center gap-5">
          <div className="sm:w-[45%]">
            <div
              key={stats[0].id}
              className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden sm:w-[100%]"
            >
              <dt>
                <div className="absolute bg-primaryBlue rounded-md p-3">
                  <AccessTimeIcon className="text-white"></AccessTimeIcon>
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {stats[0].name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {stats[0].stat}
                </p>
              </dd>
            </div>
            {displayedReports}
          </div>
          <div>
            <Divider className="hidden sm:block" orientation="vertical" />
          </div>
          <div>
            <div
              key={stats[1].id}
              className="relative bg-white pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden sm:w-[100%]"
            >
              <dt>
                <div className="absolute bg-primaryBlue rounded-md p-3">
                  <HelpOutlineIcon className="text-white"></HelpOutlineIcon>
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {stats[1].name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {stats[1].stat}
                </p>
              </dd>
            </div>
            {displayedQuestions}
          </div>
        </dl>
      </div>
      <div className="m-4 mt-6">
        <div>
          <div className=" font-semibold text-xl mb-4">Instructor Reviews:</div>
          <div className=" mb-6 mx-12">
            {loaded && <AverageSummary count={count} />}
          </div>
          <div className=" mx-8">{displayedReviews}</div>
        </div>
      </div>
    </Fragment>
  );
};
export default InstructorDashboard;
