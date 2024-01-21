import { useEffect, useState } from "react";
import styles from "./Quiz.module.css";

const BASE_URL = "http://localhost:8000";
const DELAY_TIME = 4000; // Reduced delay for quicker response

const LoadingSpinner = () => (
  <div className={styles.spinner}>
    <div className={styles.spinnerDot}></div>
    <div className={styles.spinnerDot}></div>
    <div className={styles.spinnerDot}></div>
  </div>
);

const QuizQuestion = ({
  correctAnswer,
  quizOptions,
  handleOptionClick,
  feedbackMessage,
}) => (
  <div>
    <img
      className={styles.emoji}
      src={`https://flagcdn.com/w2560/${correctAnswer.code.toLowerCase()}.png`}
      alt="flag"
    />
    <div className={styles.options}>
      {quizOptions.map((country, index) => (
        <button
          className={styles.optionBtn}
          key={index}
          onClick={() => handleOptionClick(country)}
          disabled={feedbackMessage !== null}
        >
          {country.name}
        </button>
      ))}
    </div>
    <div className={styles.feedbackMessage}>
      {feedbackMessage && <p>{feedbackMessage}</p>}
    </div>
  </div>
);

const Quiz = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizOptions, setQuizOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchCountries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/countries`);
      const data = await response.json();
      setCountriesData(data);

      const randomIndex = Math.floor(Math.random() * data.length);
      const correctCountry = data[randomIndex];
      setCorrectAnswer(correctCountry);

      const otherOptions = data.filter((country) => country !== correctCountry);
      const randomOptions = [];
      while (randomOptions.length < 3) {
        const randomIndex = Math.floor(Math.random() * otherOptions.length);
        const randomCountry = otherOptions[randomIndex];
        if (!randomOptions.includes(randomCountry)) {
          randomOptions.push(randomCountry);
        }
      }

      const shuffledOptions = [correctCountry, ...randomOptions].sort(
        () => Math.random() - 0.5
      );
      setQuizOptions(shuffledOptions);

      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error.message);
      setFeedbackMessage("Error loading data. Please try again.");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [currentQuestion]); // Change showNextQuestion to currentQuestion

  const handleOptionClick = (selectedCountry) => {
    if (selectedCountry === correctAnswer) {
      setFeedbackMessage("Correct!");
    } else {
      setFeedbackMessage(
        `Incorrect. The correct answer is ${correctAnswer.name}.`
      );
    }

    // After the delay, show the next question
    delay(DELAY_TIME).then(() => {
      handleNextQuestion();
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1); // Increment currentQuestion
    setShowNextQuestion(false); // Reset showNextQuestion to false
    setFeedbackMessage(null);
    setLoading(true);
  };

  return (
    <div className={styles.box}>
      <h1>FLAGS GAME</h1>
      {loading ? (
        <LoadingSpinner />
      ) : currentQuestion < countriesData.length ? (
        <QuizQuestion
          correctAnswer={correctAnswer}
          quizOptions={quizOptions}
          handleOptionClick={handleOptionClick}
          feedbackMessage={feedbackMessage}
        />
      ) : (
        <div>
          <p>Congratulations! You have completed the quiz.</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
