import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Challenges.css";

const challenges = [
  {
    id: 1,
    question: "Make the area exactly 25 units",
    target: 25,
    hint: "Try making the triangle smaller by lowering the top point or reducing base length.",
  },
  {
    id: 2,
    question: "Make the area between 30 and 35 units",
    target: [30, 35],
    hint: "Increase the height a little by dragging the top point upward.",
  },
  {
    id: 3,
    question: "Make the area greater than 50 units",
    target: 50,
    hint: "Drag the top point far upward or spread the base wider for a big area.",
  },
];

const Challenges = ({ currentArea }) => {
  const [completed, setCompleted] = useState([]);
  const [showHints, setShowHints] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const checkChallenge = (challenge) => {
    let success = false;

    if (Array.isArray(challenge.target)) {
      success = currentArea >= challenge.target[0] && currentArea <= challenge.target[1];
    } else if (challenge.id === 3) {
      success = currentArea > challenge.target;
    } else {
      success = Math.abs(currentArea - challenge.target) <= 0.5;
    }

    if (success && !completed.includes(challenge.id)) {
      setCompleted([...completed, challenge.id]);
      setSuccessMsg(`🎉 Challenge ${challenge.id} Completed!`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const toggleHint = (id) => {
    setShowHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="challenges-container">
      <h3 className="challenges-title">🔥 Challenges</h3>

      <ul className="challenge-list">
        {challenges.map((c) => (
          <li key={c.id} className={`challenge-item ${completed.includes(c.id) ? "completed" : ""}`}>
            <div className="challenge-row">
              <span className="challenge-question">{c.question}</span>
              <div className="challenge-actions">
                <button
                  onClick={() => toggleHint(c.id)}
                  className="hint-btn"
                >
                  {showHints[c.id] ? "Hide Hint" : "Show Hint"}
                </button>
                <button
                  onClick={() => checkChallenge(c)}
                  className="check-btn"
                >
                  Check
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showHints[c.id] && (
                <motion.p
                  className="hint-text"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  💡 {c.hint}
                </motion.p>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>

      <p className="completed-text">
        ✅ Completed: {completed.length}/{challenges.length}
      </p>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="success-popup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Challenges;
