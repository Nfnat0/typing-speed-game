import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import moment from "moment";

const s3Client = new S3Client({
  region: process.env.REACT_APP_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

export const fetchSentence = async (genre, repetitions) => {
  try {
    const bucketName = process.env.REACT_APP_S3_NEWS_STORING_BUCKET_NAME;
    if (!bucketName) {
      console.error("Bucket name is not defined in the environment variables.");
      return [];
    }

    const datePath = moment().format("YYYY/MM/DD");
    const filePath = `${datePath}/${genre}.txt`;

    console.log(`Fetching file from path: ${filePath}`);

    const params = {
      Bucket: bucketName,
      Key: filePath,
    };

    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);

    const response = new Response(data.Body);
    const fileContent = await response.text();

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
      if (!usedIndices.has(randomIndex)) {
        selectedLines.push(lines[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return selectedLines;
  } catch (error) {
    console.error("Error fetching sentences:", error);
    return [];
  }
};

export default fetchSentence;
