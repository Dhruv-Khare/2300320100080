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
        accessCode: "cXuqht",
        clientID: "b68a770e-a2ad-43c3-9e5e-cfbe153acb72",
        clientSecret: "ECHGHmTkVhvbVBxe",
      }),
    }
  );

  const data = await res.json();

  setToken(data.access_token);

  return data.access_token;
}