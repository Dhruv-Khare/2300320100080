import { setToken } from "./auth.js";

export async function generateToken() {
  const res = await fetch(
    "http://4.224.186.213/evaluation-service/auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "dhruv.23b0101190@abes.ac.in",
        name: "Dhruv Khare",
        rollNo: "2300320100080",
        accessCode: "zbMtpf",
        clientID: "2519e125-b14f-4f39-8200-e518f4450560",
        clientSecret: "JWXCQPEKknyHyDEp",
      }),
    }
  );

  const data = await res.json();

  setToken(data.access_token);

  return data.access_token;
}