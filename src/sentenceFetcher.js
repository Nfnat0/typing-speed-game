let fileContentCache = null;

export const fetchSentence = async (genre, minLength = 30, maxLength = 120) => {
  const fetchAndCheckLength = async () => {
    try {
      let url = "";
      if (genre === "sayings") {
        url = "https://api.quotable.io/random";
      } else if (genre === "news") {
        url = "https://inshortsapi.vercel.app/news?category=technology";
      } else if (genre === "programming") {
        url = "https://programming-quotes-api.herokuapp.com/Quotes/random";
      } else if (genre === "jokes") {
        url = "https://v2.jokeapi.dev/joke/Any";
      } else if (genre === "advice") {
        url = "https://api.adviceslip.com/advice";
      } else if (genre === "file") {
        url = "/words.txt";
      } else if (genre === "file2") {
        url = "/words2.txt";
      } else if (genre === "test") {
        return "This is a test sentence for the typing game.";
      }

      if (genre === "file" || genre === "file2") {
        if (!fileContentCache) {
          const response = await fetch(url);
          const data = await response.text();
          fileContentCache = data.split("\n");
        }
        if (fileContentCache.length > 0) {
          return fileContentCache[
            Math.floor(Math.random() * fileContentCache.length)
          ];
        } else {
          return "No suitable text found in file.";
        }
      }

      const response = await fetch(url);
      const data = await response.json();
      let sentence = "";

      if (genre === "sayings") {
        sentence = data.content || "Couldn't fetch saying.";
      } else if (genre === "news") {
        sentence = data.data[0].content.split(".")[0] || "Couldn't fetch news.";
      } else if (genre === "programming") {
        sentence = data.en || "Couldn't fetch programming quote.";
      } else if (genre === "jokes") {
        sentence = data.setup
          ? `${data.setup} - ${data.delivery}`
          : data.joke || "Couldn't fetch joke.";
      } else if (genre === "advice") {
        sentence = data.slip.advice || "Couldn't fetch advice.";
      }

      console.log(sentence, sentence.length);

      if (sentence.length >= minLength && sentence.length <= maxLength) {
        return sentence;
      } else {
        return await fetchAndCheckLength(); // Retry fetching if the sentence is too short
      }
    } catch (error) {
      console.error("Error fetching sentence:", error);
      return "Couldn't fetch sentence.";
    }
  };

  return fetchAndCheckLength();
};
