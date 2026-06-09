import { generateToken } from "./generateToken.js";
import { Log } from "./index.js";

await generateToken();

await Log(
  "frontend",
  "info",
  "component",
  "logging middleware test"
);