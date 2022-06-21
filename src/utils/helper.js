export const getUniqueId = () => Math.floor(Math.random() * 1000000);

export function formatAMPM(time) {
  const date = new Date(time);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const getDayByDateFormat = (date) => {
  const d = new Date(date);
  return d.getDate() + "-" + Number(d.getMonth() + 1) + "-" + d.getFullYear();
};
