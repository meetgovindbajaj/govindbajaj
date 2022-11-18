const c = new Date();
const Time = () => {
  const convertTZ = (date, tzString) => {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        {
          timeZone: tzString,
        }
      )
    );
  };
  const a = convertTZ(c, "Asia/Kolkata");
  return (a.getHours() % 12) + ":" + a.getMinutes() + ":" + a.getSeconds();
};
module.exports = Time;
