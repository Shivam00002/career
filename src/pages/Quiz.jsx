import React, { useState, useEffect } from "react";
import questions from "../data/questions";
import styles from "../styles/Quiz.module.css";
import ProgressBar from "./ProgressBar";

const Quiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Retrieve the selected answers from session storage
    const storedAnswers = sessionStorage.getItem("selectedAnswers");

    if (storedAnswers) {
      setSelectedAnswers(JSON.parse(storedAnswers) || []);
    }
  }, []);

  const handleAnswerSelect = (questionId, optionIndex) => {
    // Remove previously selected answer for the same question
    const updatedAnswers = selectedAnswers.filter(
      (selectedAnswer) => selectedAnswer.questionId !== questionId
    );

    const answer = { questionId, optionIndex };

    const newAnswers = [...updatedAnswers, answer];
    setSelectedAnswers(newAnswers);

    // Save the selected answers in session storage
    sessionStorage.setItem("selectedAnswers", JSON.stringify(newAnswers));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setProgress((prev) => prev + 20);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setProgress((prev) => prev - 20);
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
 
  
//total pages
const questionsPerPage = 5;
const totalPages = Math.ceil(questions.length / questionsPerPage);
console.log("Total Pages:", totalPages);


  const paginatedQuestions = questions.slice(startIndex, endIndex);

  const isNextButtonDisabled = paginatedQuestions.some((question) => {
    return !selectedAnswers.some(
      (selectedAnswer) => selectedAnswer.questionId === question.id
    );
  });

  return (
    <>
      <h1 className="h1 text-[22px] font-bold ml-[0px]">
        Career Profiling Test
      </h1>

      <div className={styles.quizContainer}>
        {paginatedQuestions.map((question) => (
          <div key={question.id} className="box">
            <p className="question">{question.question}</p>

            <div className="option-div">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers.some(
                  (selectedAnswer) =>
                    selectedAnswer.questionId === question.id &&
                    selectedAnswer.optionIndex === index
                );

                return (
                  <div>
                    <div
                      id="btn-style"
                      key={index}
                      className={`${styles.option} ${
                        isSelected ? styles.highlighted : ""
                      }`}
                      onClick={() => handleAnswerSelect(question.id, index)}
                    >
                      <p>{option}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}


  
        <div className="pagination">

          <div className="pagination-btn">
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
           className="paginationButton "
            >
              Previous
            </button>
            <button
            disabled={isNextButtonDisabled || currentPage === totalPages}
              onClick={handleNextPage}
              className={`paginationButton ${!isNextButtonDisabled && currentPage !== totalPages ? 'active' : ''}`}
      
            >
              Next
            </button>
          </div>
        </div>
        </div>
        <ProgressBar totalPages={totalPages} currentPage={currentPage} progress={progress} />
    
    </>
  );
};

export default Quiz;

