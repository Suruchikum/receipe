const axios = require("axios");
require("dotenv").config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

const RAPIDAPI_HOST = "large-text-to-speech.p.rapidapi.com";

async function createTTSJob(text) {
  const options = {
    method: "POST",
    url: `https://${RAPIDAPI_HOST}/tts`,
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": RAPIDAPI_HOST,
      "Content-Type": "application/json",
    },
    data: {
      text,
    },
  };

  console.log(options.data);

  try {
    const response = await axios.request(options);
    // console.log("TTS Job Response:", response.data);
    return response;
  } catch (error) {
    console.error(
      "Error creating TTS job:",
      error.response ? error.response.data : error.message
    );
  }
}

async function getTTSJobStatus(jobId) {
  console.log("jbo id", jobId);
  if (jobId) {
    const options = {
      method: "GET",
      url: `https://${RAPIDAPI_HOST}/tts`,
      params: {
        id: jobId,
      },
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("response: ", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching TTS job status:",
        error.response ? error.response.data : error.message
      );
    }
  } else {
    console.log("Job not processed as job not available");
    return null;
  }
}

// executes delay in async function
const delay = async (timeInMs) => {
  return new Promise((resolve) => setTimeout(resolve, timeInMs));
};

// helper function to check status of API
async function checkAPIStatus(interval, jobId) {
  const MAX_ATTEMPTS = 10; //to prevent infinte waiting
  let currentAttempt = 0;

  while (currentAttempt < MAX_ATTEMPTS) {
    try {
      currentAttempt++;
      console.log("---check start -----", currentAttempt);
      const jobResponse = await getTTSJobStatus(jobId);
      if (!jobResponse) {
        console.warn("Invalid job response received");
        break;
      }

      console.log("*********");
      const { status, eta, url } = jobResponse;
      console.log(status, eta, url);

      /*  const jobStatus = jobResponse?.status;
      // exptected time dynamically changing from status or 60s
      const jobExpectedTime = jobResponse?.eta
        ? jobResponse?.eta * 1000
        : 60 * 1000; */
      switch (status) {
        case "success":
          console.log("job completed successfully");
          return url;
        case "processing":
          console.log("job is pending, retrying again...");
          await delay(eta ? eta * 1000 : 60 * 1000);
          break;
        default:
          console.warn("Something unexpected happened.");
          break;
      }
    } catch (error) {
      console.error(`Attempt ${currentAttempt} failed, ${error}`);
      if (currentAttempt >= MAX_ATTEMPTS) {
        console.warn("Maxiumum try attempts exeeded");
        return null;
      }
    }

    /* if (jobStatus === "success") {
      console.log("job completed successfully");
      return jobResponse?.url;
    } else if (jobStatus === "processing") {
      console.log("job is pending, retrying again...");
      await delay(jobExpectedTime);
    } else {
      console.warn("Something unexpected happened.");
      break;
    } */
  }

  console.warn("Maxium retry attempts exceeded...");
  return null;
}
/* 
(async () => {
  const text = ``;
  // const job = await createTTSJob({ text });
  // const jr = await getTTSJobStatus();
  const check = await checkAPIStatus(2, "813bd57a-7065-40e6-b135-67d994d651c6");
  console.log(job.data);
})();
 */
module.exports = {
  createTTSJob,
  checkAPIStatus,
};
