export const getDate = (timeStamp: number) => {
  const date = new Date(timeStamp);
  const offset = date.getTimezoneOffset() * 60000;
  const localISOdate = new Date(timeStamp - offset).toISOString().slice(0, 10);
  return localISOdate;
};
