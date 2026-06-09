// api.js

const TOKEN= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkaHJ1di4yM2IwMTAxMTkwQGFiZXMuYWMuaW4iLCJleHAiOjE3ODA5ODg1MTcsImlhdCI6MTc4MDk4NzYxNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjBkZWVhYjliLTczZjYtNDgwMC1iZDVlLTVjMWE1NGI4MWE4NyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImRocnV2IGtoYXJlIiwic3ViIjoiYjY4YTc3MGUtYTJhZC00M2MzLTllNWUtY2ZiZTE1M2FjYjcyIn0sImVtYWlsIjoiZGhydXYuMjNiMDEwMTE5MEBhYmVzLmFjLmluIiwibmFtZSI6ImRocnV2IGtoYXJlIiwicm9sbE5vIjoiMjMwMDMyMDEwMDA4MCIsImFjY2Vzc0NvZGUiOiJjWHVxaHQiLCJjbGllbnRJRCI6ImI2OGE3NzBlLWEyYWQtNDNjMy05ZTVlLWNmYmUxNTNhY2I3MiIsImNsaWVudFNlY3JldCI6IkVDSEdIbVRrVmh2YlZCeGUifQ.76WM5db1Th02_uB_ih-OqRyFdULi9obr4tf66lxdxyM"
export async function sendLog(data) {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`
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