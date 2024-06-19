// api.js
import { Auth } from "aws-amplify";

export const checkLoginStatus = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return { isLoggedIn: true, userId: user.attributes.sub };
  } catch (error) {
    return { isLoggedIn: false };
  }
};

export const syncWithCloudAPI = async (highScore, totalCharacters, userId) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ highScore, totalCharacters, userId }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
