import { Fragment, useState, useEffect, useReducer } from "react";
import axios from "axios";
import Table from "../components/Table/Table";
import NavBar from "../components/UI/NavBar/NavBar";
import InstructorControls from "../components/Table/InstructorControls";
import Filters from "../components/Filters/Filters";
import TableListViewCard from "../components/Table/TableListViewCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
const options = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Machine Learning" },
  { id: 3, name: "Computer Science" },
  { id: 4, name: "Database Administration" },
  { id: 5, name: "Data Analysis" },
];
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#3970AC",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const IntructorCoursePage = (props) => {
  const defaultState = {
    displayedCourses: [],
    search: "",
    filters: {
      price: null,
      subjects: [],
      rating: null,
    },
    myCourses: false,
  };
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const ReducerFunction = (state, action) => {
    if (action.type === "SEARCH") {
      const newState = { ...state, search: action.value };
      return newState;
    }
    if (action.type === "FILTER") {
      const newState = { ...state, filters: action.value };
      return newState;
    }
    if (action.type === "COURSES") {
      const newState = { ...state, displayedCourses: action.value };
      return newState;
    }
    if (action.type === "MYCOURSES") {
      const newState = { ...defaultState, myCourses: !state.myCourses };
      return newState;
    }
  };

  const [searchState, dispatchSearch] = useReducer(
    ReducerFunction,
    defaultState
  );
  const [showFilters, setShowFilters] = useState(false);

  const [showPromotationModal, setShowPromotationModal] = useState(false);
  const [promotionId, setPromotionId] = useState(-1);
  const [promotionCourse, setPromotionCourse] = useState("");
  const [promotionAmount, setPromotionAmount] = useState("");
  const [promotionEndDate, setPromotionEndDate] = useState("");

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportId, setReportId] = useState(-1);
  const [reportCourse, setReportCourse] = useState("");
  const [currentReportsSelector, setCurrentReportsSelector] = useState({
    id: 1,
    name: "Technical",
  });
  const [enteredReport, setEnteredReport] = useState("");

  const openReportModal = (id, course) => {
    setShowReportModal(true);
    setReportId(id);
    setReportCourse(course);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportId(-1);
  };

  const reportSelectorChangeHandler = (data) => {
    setCurrentReportsSelector(data);
  };

  const enteredReportChangeHandler = (event) => {
    setEnteredReport(event.target.value);
  };

  const reportSubmitHandler = () => {
    closeReportModal();
    //axios post you have the course id..
    //set the report data..
    const data = {
      courseId: reportId,
      type: currentReportsSelector.name,
      description: enteredReport,
    };
    axios
      .post("http://localhost:3000/problem/", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "text/json",
        },
      })
      .then((res) => {
        console.log("report submitted successfully");
      });
  };

  //funtion to handle the pagination
  const onChangePageHandler = (event, value) => {
    setPage(value);
  };

  const openPromotionModal = (id, course) => {
    setShowPromotationModal(true);
    setPromotionId(id);
    setPromotionCourse(course);
    //console.log(showPromotationModal);
  };

  const closePromotionModal = () => {
    setShowPromotationModal(false);
  };

  const promotionAmountChangeHandler = (event) => {
    setPromotionAmount(event.target.value);
  };

  const promotionEndDateChangeHandler = (event) => {
    setPromotionEndDate(new Date(event.target.value).toISOString());
  };

  const showFiltersHandler = () => {
    setShowFilters(true);
  };
  const hideFiltersHandler = () => {
    setShowFilters(false);
  };
  const promotionSubmitHandler = () => {
    closePromotionModal();
    const data = {
      discount: +promotionAmount / 100,
      discountStartDate: new Date().toISOString(),
      discountEndDate: promotionEndDate,
    };
    axios
      .patch(
        "http://localhost:3000/instructor/createDiscount/" + promotionId,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "content-type": "text/json",
          },
        }
      )
      .then((res) => {
        var courses = [];
        for (var i = 0; i < searchState.displayedCourses.length; i++) {
          console.log(searchState.displayedCourses[i].course._id);
          console.log(
            searchState.displayedCourses[i].course._id !== res.data._id
          );
          if (searchState.displayedCourses[i].course._id !== res.data._id) {
            courses.push(searchState.displayedCourses[i]);
          } else {
            var temp = { course: res.data, mine: true };
            courses.push(temp);
          }
        }
        dispatchSearch({ type: "COURSES", value: courses });
      });
  };
  const searchBarChangeHandler = (searchValue) => {
    dispatchSearch({ type: "SEARCH", value: searchValue });
  };
  const filtersChangeHandler = (newFilter) => {
    dispatchSearch({ type: "FILTER", value: newFilter });
    setShowFilters(false);
  };
  const viewMyCoursesHandler = () => {
    dispatchSearch({ type: "MYCOURSES" });
  };
  useEffect(() => {
    var param = "";
    if (searchState.search !== "")
      param = param + "?search=" + searchState.search;

    for (var i = 0; i < searchState.filters.subjects.length; i++) {
      for (var j = 0; j < options.length; j++) {
        if (options[j].id === searchState.filters.subjects[i]) {
          param = param + (param ? "&" : "?") + "subject=" + options[j].name;
        }
      }
    }
    if (searchState.filters.rating !== null)
      param =
        param + (param ? "&" : "?") + "rating=" + searchState.filters.rating;
    if (searchState.filters.price !== null) {
      param =
        param +
        (param ? "&" : "?") +
        "minPrice=" +
        searchState.filters.price.minValue;
      param =
        param +
        (param ? "&" : "?") +
        "maxPrice=" +
        searchState.filters.price.maxValue;
    }
    var param2 = param; //will change iId
    if (!searchState.myCourses) {
      axios
        .get("http://localhost:3000/course/" + param, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "content-type": "text/json",
          },
        })
        .then((res) => {
          dispatchSearch({ type: "COURSES", value: res.data.courses });
        });
    } else {
      axios
        .get("http://localhost:3000/instructor/searchCourses" + param, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "content-type": "text/json",
          },
        })
        .then((res) => {
          dispatchSearch({ type: "COURSES", value: res.data.courses });
        });
    }
  }, [searchState.search, searchState.filters, searchState.myCourses]);
  var rows = searchState.displayedCourses.map((course) => {
    return {
      courseId: course.course._id,
      courseTitle: course.course.courseTitle,
      instructorName: course.course.instructorName,
      subject: course.course.subject,
      rating: course.course.rating,
      level: course.course.level,
      price: course.course.coursePrice,
      discountedPrice: course.course.discountedPrice,
      totalMins: course.course.totalMins,
      discount: course.course.discount,
      discountEndDate: course.course.discountEndDate,
      mine: course.mine,
    };
  });

  var cards = rows.map((row) => {
    return (
      <TableListViewCard
        courseId={row.courseId}
        title={row.courseTitle}
        instructor={row.instructorName}
        subject={row.subject}
        totalHours={Math.round(+row.totalMins / 60)}
        rating={row.rating}
        level={row.level}
        price={row.price}
        discount={row.discount}
        discountedPrice={row.discountedPrice}
        discountEndDate={row.discountEndDate}
        mine={row.mine}
        promotionCourse={promotionCourse}
        showPromotationModal={showPromotationModal}
        promotionId={promotionId}
        promotionAmount={promotionAmount}
        promotionEndDate={promotionEndDate}
        closePromotionModal={closePromotionModal}
        openPromotionModal={openPromotionModal}
        reportCourse={reportCourse}
        showReportModal={showReportModal}
        reportId={reportId}
        currentReportsSelector={currentReportsSelector}
        enteredReport={enteredReport}
        openReportModal={openReportModal}
        closeReportModal={closeReportModal}
      />
    );
  });

  return (
    <Fragment>
      {showFilters && (
        <Filters
          prevState={searchState.filters}
          onConfirm={filtersChangeHandler}
          exchange={1}
          options={options}
          onClick={hideFiltersHandler}
        />
      )}
      <InstructorControls
        onChange={searchBarChangeHandler}
        onShowFilters={showFiltersHandler}
        onCoursesClick={viewMyCoursesHandler}
        prevmyCoursesState={searchState.myCourses}
        prevSearchState={searchState.search}
      />
      <div className="hidden xl:block">
        <Table
          rows={rows}
          promotionCourse={promotionCourse}
          showPromotationModal={showPromotationModal}
          promotionAmountChangeHandler={promotionAmountChangeHandler}
          promotionEndDateChangeHandler={promotionEndDateChangeHandler}
          promotionSubmitHandler={promotionSubmitHandler}
          promotionId={promotionId}
          promotionAmount={promotionAmount}
          promotionEndDate={promotionEndDate}
          closePromotionModal={closePromotionModal}
          openPromotionModal={openPromotionModal}
          reportSelectorChangeHandler={reportSelectorChangeHandler}
          enteredReportChangeHandler={enteredReportChangeHandler}
          reportSubmitHandler={reportSubmitHandler}
          reportCourse={reportCourse}
          showReportModal={showReportModal}
          reportId={reportId}
          currentReportsSelector={currentReportsSelector}
          enteredReport={enteredReport}
          openReportModal={openReportModal}
          closeReportModal={closeReportModal}
        />
      </div>
      <div className="flex justify-around flex-wrap xl:hidden">{cards}</div>
      {searchState.displayedCourses.length !== 0 && (
        <div className="flex items-center justify-center">
          <ThemeProvider theme={theme}>
            <Pagination
              className="ml-2 mr-2"
              count={Math.ceil(noOfPages / 10)}
              color="primary"
              page={page}
              onChange={onChangePageHandler}
            />
          </ThemeProvider>
        </div>
      )}
    </Fragment>
  );
};
export default IntructorCoursePage;
