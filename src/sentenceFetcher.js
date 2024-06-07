export const fetchSentence = async (genre) => {
  try {
    let url = '';

    switch (genre) {
      case 'sayings':
        url = 'https://api.quotable.io/random';
        break;
      case 'news':
        // Use a free news API that doesn't require registration, such as the mock news API for example purposes
        url = 'https://inshortsapi.vercel.app/news?category=technology';
        break;
      case 'programming':
        url = 'https://programming-quotes-api.herokuapp.com/quotes/random';
        break;
      case 'jokes':
        url = 'https://v2.jokeapi.dev/joke/Any';
        break;
      case 'advice':
        url = 'https://api.adviceslip.com/advice';
        break;
      default:
        throw new Error('Invalid genre');
    }
  
    const response = await fetch(url);
    const data = await response.json();
  
    switch (genre) {
      case 'sayings':
        return data.content;
      case 'news':
        return data.data[0].content;
      case 'programming':
        return data.en;
      case 'jokes':
        return data.setup ? `${data.setup} - ${data.delivery}` : data.joke;
      case 'advice':
        return data.slip.advice;
      default:
        throw new Error('Invalid genre');
    }
  } catch (error) {
    console.error('Error fetching sentence:', error);
    return "Couldn't fetch sentence.";
  }
};
