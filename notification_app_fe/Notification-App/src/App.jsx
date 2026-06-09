import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  Pagination,
} from "@mui/material";
import { getNotifications } from "./services/notificationService";
import NotificationCard from "./components/NotificationCard";
import { getPriorityNotifications }
from "./utils/getPriorityNotifications";
import Log from "./logger";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [pageType, setPageType] = useState("all");
  const [notificationType, setNotificationType] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [viewedIds, setViewedIds] = useState(() => {
  const savedIds = localStorage.getItem("viewedNotifications");

    return savedIds ? JSON.parse(savedIds) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getNotifications({
          limit,
          page,
          notificationType,
        });

        await Log(
          "frontend",
          "info",
          "utils",
          "calculating priority notifications"
        );

        const newNotifications =
          data || [];

        await Log(
          "frontend",
          "info",
          "utils",
          `received ${newNotifications.length} notifications`
        );

        setNotifications(newNotifications);
      } catch (err) {
        console.error(err);
        setError("Unable to load notifications");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit, page, notificationType]);

  const getNotificationId = (notification) => {
    return (
      notification.id ||
      notification.ID ||
      `${notification.Type}-${notification.Timestamp}`
    );
  };

  const markAsViewed = (notification) => {
    const notificationId =
      getNotificationId(notification);

    if (viewedIds.includes(notificationId)) {
      return;
    }

    const updatedIds = [
      ...viewedIds,
      notificationId,
    ];

    setViewedIds(updatedIds);
    localStorage.setItem(
      "viewedNotifications",
      JSON.stringify(updatedIds)
    );
  };

  const notificationsWithStatus =
    notifications.map((notification) => {
      const notificationId =
        getNotificationId(notification);

      return {
        ...notification,
        isViewed: viewedIds.includes(notificationId),
        onView: () => markAsViewed(notification),
      };
    });

  const priorityNotifications =
    getPriorityNotifications(
      notificationsWithStatus,
      limit
    );

  const visibleNotifications =
    pageType === "priority"
      ? priorityNotifications
      : notificationsWithStatus;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e3e8ef",
            borderRadius: 2,
            mb: 3,
            p: { xs: 2.5, md: 4 },
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            fontWeight={700}
            color="text.primary"
          >
            Campus Notifications
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            View all campus updates or open the priority page
            for the most important notices.
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e3e8ef",
            borderRadius: 2,
            mb: 3,
            p: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <Button
                variant={
                  pageType === "all"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => setPageType("all")}
              >
                All Notifications
              </Button>

              <Button
                variant={
                  pageType === "priority"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => setPageType("priority")}
              >
                Priority
              </Button>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  value={notificationType}
                  onChange={(event) => {
                    setPage(1);
                    setNotificationType(event.target.value);
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                  <MenuItem value="Result">Result</MenuItem>
                  <MenuItem value="Placement">
                    Placement
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Limit</InputLabel>
                <Select
                  label="Limit"
                  value={limit}
                  onChange={(event) => {
                    setPage(1);
                    setLimit(event.target.value);
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>
        ) : visibleNotifications.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              border: "1px dashed #cbd5e1",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              color="text.primary"
            >
              No notifications available
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Please check again after some time.
            </Typography>
          </Paper>
        ) : (
          <>
            <Stack spacing={2}>
              {visibleNotifications.map((notification) => (
                <NotificationCard
                  key={getNotificationId(notification)}
                  notification={notification}
                />
              ))}
            </Stack>

            <Stack
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Pagination
                count={10}
                page={page}
                color="primary"
                onChange={(event, value) => setPage(value)}
              />
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
}

export default App;
