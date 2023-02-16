const { utcToZonedTime, format } = require("date-fns-tz");
const { ptBR } = require("date-fns/locale");

const DateIndicator = (date, options = "dd/LL/yyyy - HH:mm") => {
  const newDate = new Date(date);
  const timeZone = "America/Sao_Paulo";
  const zonedDate = utcToZonedTime(newDate, timeZone);

  if (date) {
    return format(zonedDate, options, {
      locale: ptBR,
      timeZone: "America/Sao_Paulo",
    });
  }

  return "";
};

module.exports = DateIndicator;
