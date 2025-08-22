import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Quiz.css";

const quizData = [
  {
    q: "What is the formula for the area of a triangle?",
    options: ["base × height", "½ × base × height", "base + height"],
    answer: 1,
  },
  {
    q: "If base = 10 units and height = 6 units, area is?",
    options: ["60", "30", "16"],
    answer: 1,
  },
  {
    q: "What does the shoelace formula calculate?",
    options: ["Perimeter", "Area", "Height"],
    answer: 1,
  },
  {
    q: "If vertices are (0,0), (4,0), (0,3), area is?",
    options: ["12", "6", "8"],
    answer: 1,
  },
  {
    q: "Area changes when you move the vertex along the same altitude. (True/False)",
    options: ["True", "False"],
    answer: 1,
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSelect = (qIndex, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const calculateScore = () => {
    let sc = 0;
    quizData.forEach((q, i) => {
      if (answers[i] === q.answer) sc++;
    });
    setScore(sc);
  };

  return (
    <div className="quiz-container">
      <h3 className="quiz-title">📝 Quick Quiz</h3>

      {quizData.map((q, i) => (
        <div key={i} className="quiz-question-card">
          <p className="quiz-question-text">
            {i + 1}. {q.q}
          </p>

          <div className="quiz-options">
            {q.options.map((opt, idx) => (
              <label
                key={idx}
                className={`quiz-option ${answers[i] === idx ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${i}`}
                  checked={answers[i] === idx}
                  onChange={() => handleSelect(i, idx)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button onClick={calculateScore} className="quiz-submit-btn">
        Submit
      </button>

      <AnimatePresence>
        {score !== null && (
          <motion.p
            className="quiz-score"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            🎯 Score: {score}/{quizData.length}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
