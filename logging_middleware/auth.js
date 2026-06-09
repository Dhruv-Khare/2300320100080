let token = "";

export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => token;

// body: JSON.stringify({
//         email: "dhruv.23b0101190@abes.ac.in",
//         name: "Dhruv Khare",
//         rollNo: "2300320100080",
//         accessCode: "cXuqht",
//         clientID: "b68a770e-a2ad-43c3-9e5e-cfbe153acb72",
//         clientSecret: "ECHGHmTkVhvbVBxe"
//       })