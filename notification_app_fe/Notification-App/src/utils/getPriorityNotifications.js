const priorityWeight = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const getPriorityNotifications = (
  notifications,
  limit = 10
) => {
  return [...notifications]
    .sort((a, b) => {

      const weightDiff =
        priorityWeight[b.Type] -
        priorityWeight[a.Type];

      if (weightDiff !== 0)
        return weightDiff;

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    })
    .slice(0, limit);
};