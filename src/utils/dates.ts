export const getDateTimeString = (timeStamp: number) => {
  if (!timeStamp) return "";

  return new Date(timeStamp).toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
export const getFullDateTimeString = (timeStamp: number) => {
  if (!timeStamp) return "";

  return new Date(timeStamp).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
