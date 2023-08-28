import moment from "moment";

export const dateHandler = (date) => {
  let now = moment();
  let momentDate = moment(date);
  let time = momentDate?.fromNow(true);
  let dateByHourAndMin = momentDate?.format("HH:MM");

  const getDay = () => {
    let days = time?.split(" ")[0];
    if (Number(days < 8)) {
      return now?.subtract(Number(days), "days")?.format("dddd");
    } else {
      return momentDate?.format("DD/MM/YYY");
    }
  };

  if (time === "a few seconds") {
    return "Now";
  }

  if (time.search("minute") !== -1) {
    let minutes = time?.split("")[0];
    if (minutes === "a") {
      return "1 min";
    } else {
      return `${minutes} min`;
    }
  }

  if (time.search("hour") !== -1) {
    return dateByHourAndMin;
  }

  if (time === "a day") {
    return "Yestrday";
  }

  if (time.search("days") !== -1) {
    return getDay();
  }

  return time;
};
