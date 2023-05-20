

import React, { useState, useEffect } from 'react';
import questions from '../data/questions';
import styles from '../styles/Quiz.module.css';
import ProgressBar from './ProgressBar';

const Quiz = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Retrieve the selected answers from session storage
    const storedAnswers = sessionStorage.getItem('selectedAnswers');
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
    sessionStorage.setItem('selectedAnswers', JSON.stringify(newAnswers));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setProgress(prev => prev + 20)
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setProgress(prev => prev - 20)
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const paginatedQuestions = questions.slice(startIndex, endIndex);

  const isNextButtonDisabled = paginatedQuestions.some((question) => {
    return !selectedAnswers.some(
      (selectedAnswer) => selectedAnswer.questionId === question.id
    );
  });

  return (
    <div className={styles.quizContainer}>
      {paginatedQuestions.map((question) => (
        <div key={question.id} className={styles.questionContainer}>
          <h2>{question.question}</h2>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers.some(
              (selectedAnswer) =>
                selectedAnswer.questionId === question.id &&
                selectedAnswer.optionIndex === index
            );

            return (
              <button
                key={index}
                className={`${styles.option} ${
                  isSelected ? styles.highlighted : ''
                }`}
                onClick={() => handleAnswerSelect(question.id, index)}
              >
                {option}
              </button>
            );
          })}
        </div>
      ))}
      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <button
          disabled={isNextButtonDisabled}
          onClick={handleNextPage}
          className={styles.paginationButton}
        >
          Next
        </button>
        <ProgressBar currentPage={currentPage} progress={progress } />
      </div>

   
    </div>
  );
};

export default Quiz;

