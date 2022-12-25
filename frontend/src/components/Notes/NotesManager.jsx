import { useState, Fragment } from "react";
import axios from "axios";
import Notes from "./Notes";
import Video from "../Video/Video";
import ToolbarTabs from "./ToolbarTabs";
import Reports from "../CourseView/Reports";
import ReviewsCourseView from "../CourseView/ReviewsCourseView";

const NotesManager = (props) => {
  const [showNotes, setShowNotes] = useState(true);
  const [showQA, setShowQA] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [currentTab, setCurrentTab] = useState("Notes");
  const [timestamp, setTimeStamp] = useState(0);
  const [playing, setPlaying] = useState(true);

  // add delete edit notes
  const addNote = (note) => {
    var obj = {
      sourceId: props.currentSourceId,
      note: note,
      sourceDescription: props.source,
      subtitleDescription: props.subtitle,
      timestamp: timestamp,
    };
    var temp = [];
    var flag = false;
    for (var i = 0; i < props.notes.length; i++) {
      if (props.notes[i].sourceId === props.currentSourceId) {
        temp.push(props.notes[i]);
        flag = true;
      } else {
        if (flag) {
          break;
        }
      }
    }
    var sentData = {
      courseId: props.courseId,
      sourceId: props.currentSourceId,
      notes: [...temp, obj],
    };
    var newNotes = [...props.notes, obj];
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
  };

  const editNote = (noteIndex, newNote) => {
    var newNotes = [];
    var sourceId;
    for (var i = 0; i < props.notes.length; i++) {
      if (noteIndex === i) {
        sourceId = props.notes[i].sourceId;
        var obj = {
          ...props.notes[i],
          note: newNote,
        };
        newNotes.push(obj);
      } else {
        newNotes.push(props.notes[i]);
      }
    }

    var temp = [];

    for (var j = 0; j < newNotes.length; j++) {
      if (newNotes[j].sourceId === sourceId) {
        temp.push(newNotes[j]);
      }
    }

    var sentData = {
      courseId: props.courseId,
      sourceId: sourceId,
      notes: temp,
    };
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
  };

  const deleteNote = (noteIndex) => {
    var newNotes = [];
    var sourceId;
    for (var i = 0; i < props.notes.length; i++) {
      if (noteIndex !== i) {
        newNotes.push(props.notes[i]);
      } else {
        sourceId = props.notes[i].sourceId;
      }
    }

    var temp = [];

    for (var j = 0; j < newNotes.length; j++) {
      if (newNotes[j].sourceId === sourceId) {
        temp.push(newNotes[j]);
      }
    }
    var sentData = {
      courseId: props.courseId,
      sourceId: sourceId,
      notes: temp,
    };
    axios.patch(
      `http://localhost:3000/user/notes/${props.studentId}`,
      sentData
    );
    props.setNotes(newNotes);
  };

  //controls
  const timeChangeHandler = (time) => {
    setTimeStamp(time);
  };
  const stopVideo = () => {
    setPlaying(false);
  };
  const resumeVideo = () => {
    setPlaying(true);
  };

  const onTabChangeHandler = (tab) => {
    setCurrentTab(tab);
    if (tab === "Notes") {
      setShowNotes(true);
      setShowQA(false);
      setShowReviews(false);
      setShowReports(false);
    } else if (tab === "Q&A") {
      setShowNotes(false);
      setShowQA(true);
      setShowReviews(false);
      setShowReports(false);
    } else if (tab === "Reviews") {
      setShowNotes(false);
      setShowQA(false);
      setShowReviews(true);
      setShowReports(false);
    } else if (tab === "Reports") {
      setShowNotes(false);
      setShowQA(false);
      setShowReviews(false);
      setShowReports(true);
    }
  };

  const selectedNotesChangeHandler = (newSelected) => {
    props.changeNotesFilter(newSelected);
  };

  const selectedReportsChangeHandler = (newSelected) => {
    props.changeReportsSelector(newSelected);
  };

  return (
    <Fragment>
      <Video
        playing={playing}
        isVisible={props.isVisible}
        link={props.link}
        onWatch={props.onWatch}
        getTime={timeChangeHandler}
      />
      <div className="">
        <ToolbarTabs
          currentTab={currentTab}
          onTabChangeHandler={onTabChangeHandler}
        />
        {showNotes && (
          <Notes
            selected={props.currentNotesFilter}
            selectedChangeHandler={selectedNotesChangeHandler}
            timestamp={timestamp}
            stopVideo={stopVideo}
            notes={props.notes}
            resumeVideo={resumeVideo}
            addNote={addNote}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        )}
        {showQA && <></>}
        {showReviews && (
          <ReviewsCourseView
            onSubmit={props.submitReviewHandler}
            courseId={props.courseId}
            reviews={props.reviews}
          />
        )}
        {showReports && (
          <Reports
            onSubmit={props.submitReportHandler}
            selected={props.currentReportsSelector}
            selectedChangeHandler={selectedReportsChangeHandler}
            courseId={props.courseId}
            reports={props.reports}
          />
        )}
      </div>
    </Fragment>
  );
};
export default NotesManager;
