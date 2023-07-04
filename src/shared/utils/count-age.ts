import moment from "moment";

export function countAge(birthDate: string) {
  const date = moment(birthDate, "YYYY-MM-DD HH:mm:ss.SSSSSS");
  const age = moment().diff(date, "years");
  return age;
}
