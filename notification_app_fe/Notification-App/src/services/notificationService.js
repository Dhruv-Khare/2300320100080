import { getToken } from "../../../../logging_middleware/auth";
import { generateToken } from "../../../../logging_middleware/generateToken";
import Log from "../logger";

export const getNotifications = async ({
  limit = 10,
  page = 1,
  notificationType = "",
} = {}) => {
  if (!getToken()) {
    await generateToken();
  }

  await Log(
    "frontend",
    "info",
    "api",
    "fetching notifications"
  );
  console.log(getToken());
  const queryParams = new URLSearchParams();
  queryParams.set("limit", limit);
  queryParams.set("page", page);

  if (notificationType) {
    queryParams.set("notification_type", notificationType);
  }

  const response = await fetch(
    `http://4.224.186.213/evaluation-service/notifications?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return [];
  }

  return data.notifications || [];
};
