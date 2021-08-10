import React, { useState, useEffect } from "react";
import Question from "./Question";

function App() {
  const [results, setResults] = useState("");

  const fetchTriviaData = () => {
    fetch(
      "https://opentdb.com/api.php?amount=30&category=11&difficulty=easy&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTriviaData();
  }, []);

  return (
    <div className="App">
      <Question results={results} />
    </div>
  );
}

export default App;
