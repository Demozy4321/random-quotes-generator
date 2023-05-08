import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [showQuotes, setShowQuotes] = useState([]);

  const getQuotes = async () => {
    try {
      const res = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );

      const data = res.data.quotes.map(({ quote, author }) => ({
        quote,
        author,
      }));

      console.log(data);
      setQuotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateRandomQuotes = () => {
    const randomQuotes = [];

    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * quotes.length);
      randomQuotes.push(quotes[index]);
    }

    return randomQuotes;
  };

  const handleGenerate = () => {
    const randomQuotes = generateRandomQuotes();
    setShowQuotes(randomQuotes);
    console.log(randomQuotes);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <>
      <div>
        <h2>QUOTES GENERATOR</h2>

        <button onClick={handleGenerate}>Generate</button>
        {showQuotes.map((item) => {
          return (
            <div key={item.index}>
              <h4>{item.quote}</h4>
              <h5>{item.author}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
