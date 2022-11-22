import { useState, Fragment, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import ExamChoices from "./ExamChoices";
import SecondaryButton from "../SecondaryButton";
import SolvedExamChoices from "./SolvedExamChoices";
import { createTheme,ThemeProvider } from "@mui/material/styles";
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

const Exam = (props) => {
  const [examState, setExamState] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [prevButtonState, setPrevButtonState] = useState(true);
  //const [nextButtonState, setNextButtonState] = useState(false);
  const onChangeQuestionHandler = (event, value) => {
    setSelectedQuestion(value);
  };
  // useEffect to Disable/Enable the buttons
  useEffect(() => {
    if (selectedQuestion === 1) {
      setPrevButtonState(true);
    } else {
      setPrevButtonState(false);
    }
    // if (selectedQuestion === props.exam.length) {
    //   setNextButtonState(true);
    // } else {
    //   setNextButtonState(false);
    // }
  }, [selectedQuestion, props.exam]);

  // 2 functions to handle the onClick of the buttons
  const prevOnClickHandler = () => {
    setSelectedQuestion((prev) => {
      return (prev = prev - 1);
    });
  };

  const nextOnClickHandler = () => {
    setSelectedQuestion((prev) => {
      return (prev = prev + 1);
    });
  };

  const onSaveChoice = (QuestionNumber, Choice) => {
    var newExamState = [];
    var found = false;
    if (examState.length !== 0) {
      for (var i = 0; i < examState.length; i++) {
        if (QuestionNumber === examState[i].questionNumber) {
          var changedAnswer = {
            questionNumber: QuestionNumber,
            choice: Choice,
          };
          found = true;
          newExamState.push(changedAnswer);
        } else {
          newExamState.push(examState[i]);
        }
      }
      if (!found) {
        var newlySolved = {
          questionNumber: QuestionNumber,
          choice: Choice,
        };
        newExamState.push(newlySolved);
      }
    } else {
      var newSolved = {
        questionNumber: QuestionNumber,
        choice: Choice,
      };
      newExamState.push(newSolved);
    }
    setExamState(newExamState);
  };
  const onSubmitHandler = () => {
    console.log(examState);
  };
  var SolvedBefore;
  for (var j = 0; j < examState.length; j++) {
    if (selectedQuestion === examState[j].questionNumber) {
      SolvedBefore = examState[j].choice;
    }
  }
  return (
    <Fragment>
      <p className="tracking-wide text-gray-500 md:text-lg dark:text-gray-400 m-4">
        {"Question " + selectedQuestion + ": "}
        {props.exam[selectedQuestion - 1].description}
      </p>
      <ExamChoices
        selected={SolvedBefore}
        correct={props.answers[selectedQuestion - 1]}
        studentAnswers={
          props.studentAnswers[selectedQuestion - 1].questionID ===
          selectedQuestion
            ? props.studentAnswers[selectedQuestion - 1]
            : false
        }
        choices={props.exam[selectedQuestion - 1].choices}
        onSaveChoice={onSaveChoice.bind(null, selectedQuestion)}
      ></ExamChoices>
      <div className="mt-2 flex items-center justify-center">
        <SecondaryButton
          disabled={prevButtonState}
          onClick={prevOnClickHandler}
          text="prev Question"
        ></SecondaryButton>
        <ThemeProvider theme={theme}>
          <Pagination
            className="ml-2 mr-2"
            count={4}
            color="primary"
            page={selectedQuestion}
            onChange={onChangeQuestionHandler}
          />
        </ThemeProvider>

        <SecondaryButton
          //disabled={nextButtonState}
          onClick={
            selectedQuestion === props.exam.length
              ? onSubmitHandler
              : nextOnClickHandler
          }
          text={
            selectedQuestion === props.exam.length
              ? "Submit Your answers"
              : "Next Question"
          }
        ></SecondaryButton>
      </div>
    </Fragment>
  );
};

export default Exam;
