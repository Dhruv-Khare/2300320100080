import { useEffect } from "react";
import Log from "./logger";

function App() {

  useEffect(() => {

    const testLog = async () => {
      await Log(
        "frontend",
        "info",
        "component",
        "application loaded"
      );
    };

    testLog();

  }, []);

  return (
    <h1>Campus Notifications</h1>
  );
}

export default App;