import React from "react";

function QuestionList({ questions, onUpdateQuestion, onDeleteQuestion }) {
  function handleChange(event, id) {
    const updatedQuestion = {
      correctIndex: parseInt(event.target.value, 10),
    };

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedQuestion),
    })
    .then((response) => response.json())
    .then((data) => {
      onUpdateQuestion(data);
    })
    .catch((error) => console.error("Error updating question:", error));
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(() => onDeleteQuestion(id))
    .catch((error) => console.error("Error deleting question:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h4>{question.prompt}</h4>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(event) => handleChange(event, question.id)}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>{answer}</option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDelete(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
