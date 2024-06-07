const API_KEYS = {
  news: 'YOUR_NEWS_API_KEY',
  // Add more API keys if needed
};

export const fetchSentence = async (genre) => {
  let url = '';
  switch (genre) {
    case 'sayings':
      url = 'https://api.quotable.io/random';
      break;
    case 'news':
      url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEYS.news}`;
      break;
    // Add more cases for additional genres
    default:
      // Handle default case here
      break;
  }
  // Add more genres here
  const response = await fetch(url);
  const data = await response.json();

  switch (genre) {
    case 'sayings':
      return data.content;
    case 'news':
      return data.articles[0].title;
    default:
      // Handle default case here
      break;
  }
  // Handle more genres here
};
