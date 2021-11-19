import moment from "moment";

export enum EDateFormats {
  HTML_CALENDAR = "YYYY-MM-DDTHH:mm",
  DISPLAY_FORMAT = "DD-MM-YYYY hh:mm a",
}

export const getTodaysDateWithTime = (): string => {
  return moment(new Date()).format(EDateFormats.HTML_CALENDAR);
};

export const displayDate = (date: string): string => {
  return moment(date).format(EDateFormats.DISPLAY_FORMAT);
};
