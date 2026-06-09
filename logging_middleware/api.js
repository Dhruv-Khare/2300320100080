import { getToken } from "./auth.js";

export async function sendLog(data) {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
}