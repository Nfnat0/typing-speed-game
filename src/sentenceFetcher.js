import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import moment from "moment";

const s3Client = new S3Client({
  region: process.env.REACT_APP_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

const fetchFileContent = async (bucketName, filePath) => {
  const params = { Bucket: bucketName, Key: filePath };
  const command = new GetObjectCommand(params);

  try {
    const data = await s3Client.send(command);
    const response = new Response(data.Body);
    return await response.text();
  } catch (error) {
    console.error(`Error fetching file from path: ${filePath}`, error);
    throw error;
  }
};

const getFilePath = (date, genre) =>
  `${date.format("YYYY/MM/DD")}/${genre}.txt`;

const containsDifficultString = (str) => {
  const difficultPattern = /[^a-zA-Z0-9\s!'@#$%^&*(),.?":{}|<>]/;
  return difficultPattern.test(str);
};

export const fetchSentence = async (genre, repetitions) => {
  const bucketName = process.env.REACT_APP_S3_NEWS_STORING_BUCKET_NAME;
  if (!bucketName) {
    console.error("Bucket name is not defined in the environment variables.");
    return "Error: Bucket name not defined.";
  }

  const today = moment();
  let filePath = getFilePath(today, genre);

  let fileContent;
  try {
    fileContent = await fetchFileContent(bucketName, filePath);
  } catch (error) {
    const yesterday = today.subtract(1, "day");
    filePath = getFilePath(yesterday, genre);

    try {
      fileContent = await fetchFileContent(bucketName, filePath);
    } catch (error) {
      return "Error: Unable to fetch file from both today and yesterday's paths.";
    }
  }

  const lines = fileContent.split("\n").filter((line) => line.trim() !== "");
  if (lines.length < repetitions) {
    console.warn(
      "The file does not contain enough lines for the requested repetitions."
    );
    return lines;
  }

  const selectedLines = [];
  const usedIndices = new Set();

  while (selectedLines.length < repetitions) {
    const randomIndex = Math.floor(Math.random() * lines.length);
    const line = lines[randomIndex];

    if (!usedIndices.has(randomIndex) && !containsDifficultString(line)) {
      selectedLines.push(line);
      usedIndices.add(randomIndex);
    }
  }

  return selectedLines;
};

export default fetchSentence;
