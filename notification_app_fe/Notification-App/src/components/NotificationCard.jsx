import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

const typeColor = {
  Placement: "success",
  Result: "primary",
  Event: "warning",
};

function NotificationCard({ notification }) {
  const notificationType = notification.Type || "Notice";
  const isViewed = notification.isViewed;

  return (
    <Card
      elevation={0}
      onClick={notification.onView}
      sx={{
        border: isViewed
          ? "1px solid #e3e8ef"
          : "1px solid #1976d2",
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: isViewed ? "#ffffff" : "#f8fbff",
        transition:
          "border-color 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          borderColor: "#90caf9",
          boxShadow:
            "0 10px 30px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Chip
            label={notificationType}
            color={typeColor[notificationType] || "default"}
            size="small"
            sx={{ fontWeight: 700 }}
          />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Chip
              label={isViewed ? "Viewed" : "New"}
              color={isViewed ? "default" : "info"}
              size="small"
              variant={isViewed ? "outlined" : "filled"}
            />

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {notification.Timestamp}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="h6"
          component="h2"
          sx={{
            mt: 2,
            fontWeight: 700,
            lineHeight: 1.35,
          }}
        >
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;
