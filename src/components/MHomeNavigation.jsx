import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

// Example local questions array
const QUESTIONS = [
  {
    question_number: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct_answer: "1",
  },
  {
    question_number: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct_answer: "2",
  },
  {
    question_number: 3,
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correct_answer: "2",
  },
  {
    question_number: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct_answer: "4",
  },
];

const MHomeNavigation = ({
  className = "",
  option1,
  option2,
  option3,
  option4,
  text,
  showButton2,
  showButton3,
  showButton4,
  homeNavigationPosition,
  homeNavigationTop,
  homeNavigationLeft,
  homeNavigationWidth,
  homeNavigationHeight,
  homeNavigationRight,
  homeNavigationBottom,
}) => {
  const [question, setQuestion] = useState({
    question_number: "",
    question: "",
    options: [],
    correct_answer: "",
  });

  const navigate = useNavigate();

  const resetBack = () => {
    for (let i = 1; i < 5; i++) {
      const el = document.getElementById(`back${i}`);
      if (el) el.style.background = "black";
    }
  };

  // Use local questions instead of backend
  const fetchQuestion = () => {
    const idx = Math.floor(Math.random() * QUESTIONS.length);
    const data = QUESTIONS[idx];
    setQuestion({
      question_number: data.question_number,
      question: data.question,
      options: data.options,
      correct_answer: data.correct_answer,
    });
  };

  useEffect(() => {
    // if its the question page
    const loadQuestion = () => {
      if (showButton4) {
        fetchQuestion();
      }
    };
    loadQuestion();
    // eslint-disable-next-line
  }, [showButton4]);

  useEffect(() => {
    if (showButton4 && question.options.length) {
      // update the text for the questions
      const o1 = document.getElementById("option1");
      const o2 = document.getElementById("option2");
      const o3 = document.getElementById("option3");
      const o4 = document.getElementById("option4");
      const t = document.getElementById("text");
      if (o1) o1.textContent = question.options[0];
      if (o2) o2.textContent = question.options[1];
      if (o3) o3.textContent = question.options[2];
      if (o4) o4.textContent = question.options[3];
      if (t) t.textContent = question.question;
    }
  }, [question, showButton4]);

  const handleClick = (path) => {
    if (option1 === "Practice") {
      navigate(path);
    } else if (option1 === "I Understand") {
      navigate("/home");
    } else {
      const choiceMap = {
        "/question": "1",
        "/help": "2",
        "/": "3",
        " ": "4",
      };
      questionClick(choiceMap[path] || -1);
    }
  };

  const questionClick = (choice) => {
    // if they chose same as correct answer
    if (question.correct_answer == choice) {
      const el = document.getElementById(`back${choice}`);
      if (el) el.style.background = "green";
    } else {
      // if they chose different answer
      const el = document.getElementById(`back${choice}`);
      if (el) el.style.background = "red";
    }
    // Fetch a new question after 1.5 seconds
    setTimeout(() => {
      resetBack();
      fetchQuestion();
    }, 1500);
  };

  const homeNavigationStyle = useMemo(
    () => ({
      position: homeNavigationPosition,
      top: homeNavigationTop,
      left: homeNavigationLeft,
      width: homeNavigationWidth,
      height: homeNavigationHeight,
      right: homeNavigationRight,
      bottom: homeNavigationBottom,
    }),
    [
      homeNavigationPosition,
      homeNavigationTop,
      homeNavigationLeft,
      homeNavigationWidth,
      homeNavigationHeight,
      homeNavigationRight,
      homeNavigationBottom,
    ],
  );

  return (
    <div
      className={`font-small-text h-[507px] w-[279px] text-left text-base text-white ${className}`}
      style={homeNavigationStyle}>
      <div className="absolute bottom-[1.38%] left-[2.87%] right-[2.87%] top-[31.95%] h-[66.67%] w-[94.27%]">
        <div
          id="back1"
          onClick={() => handleClick("/question")}
          className="absolute bottom-[87.87%] left-[0%] right-[0.76%] top-[0%] box-border flex h-[12.13%] w-[99.24%] cursor-pointer flex-row items-center justify-center rounded-lg bg-black px-6 py-3.5 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] hover:opacity-80">
          <div id="option1" className="relative font-medium leading-[150%]">
            {option1}
          </div>
        </div>
        {showButton2 && (
          <div
            id="back2"
            onClick={() => handleClick("/help")}
            className="absolute bottom-[58.58%] left-[0%] right-[0.76%] top-[29.29%] box-border flex h-[12.13%] w-[99.24%] cursor-pointer flex-row items-center justify-center rounded-lg bg-black px-6 py-3.5 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] hover:opacity-80">
            <div id="option2" className="relative font-medium leading-[150%]">
              {option2}
            </div>
          </div>
        )}
        {showButton3 && (
          <div
            id="back3"
            onClick={() => handleClick("/")}
            className="absolute bottom-[29.29%] left-[0.38%] right-[0.38%] top-[58.58%] box-border flex h-[12.13%] w-[99.24%] cursor-pointer flex-row items-center justify-center rounded-lg bg-black px-6 py-3.5 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] hover:opacity-80">
            <div id="option3" className="relative font-medium leading-[150%]">
              {option3}
            </div>
          </div>
        )}
        {showButton4 && (
          <div
            id="back4"
            onClick={() => handleClick(" ")}
            className="absolute bottom-[0%] left-[0.76%] right-[0%] top-[87.87%] box-border flex h-[12.13%] w-[99.24%] cursor-pointer flex-row items-center justify-center rounded-lg bg-black px-6 py-3.5 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] hover:opacity-80">
            <div id="option4" className="relative font-medium leading-[150%]">
              {option4}
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-[77.71%] left-[2.15%] right-[2.87%] top-[0%] h-[22.29%] w-[94.98%] text-center text-black">
        <div
          id="text"
          className="absolute left-[0%] top-[0%] flex h-full w-full items-center justify-center font-medium leading-[150%]">
          {text}
        </div>
      </div>
    </div>
  );
};

MHomeNavigation.propTypes = {
  className: PropTypes.string,
  option1: PropTypes.string,
  option2: PropTypes.string,
  option3: PropTypes.string,
  option4: PropTypes.string,
  loremIpsumDolorSitAmetCon: PropTypes.string,
  showButton2: PropTypes.bool,
  showButton3: PropTypes.bool,
  showButton4: PropTypes.bool,

  /** Style props */
  homeNavigationPosition: PropTypes.any,
  homeNavigationTop: PropTypes.any,
  homeNavigationLeft: PropTypes.any,
  homeNavigationWidth: PropTypes.any,
  homeNavigationHeight: PropTypes.any,
  homeNavigationRight: PropTypes.any,
  homeNavigationBottom: PropTypes.any,
};

export default MHomeNavigation;
