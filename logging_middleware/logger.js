// logger.js

import { sendLog } from "./api.js";

export async function Log(
  stack,
  level,
  packageName,
  message
) {
  return await sendLog({
    stack,
    level,
    package: packageName,
    message
  });
}