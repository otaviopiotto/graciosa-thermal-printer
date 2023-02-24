const { format } = require("date-fns");
const { ptBR } = require("date-fns/locale");

const DateIndicator = (date, options = "dd/LL/yyyy - HH:mm") => {
  const newDate = new Date(date);

  if (date) {
    return format(newDate, options, {
      locale: ptBR,
      timeZone: "America/Sao_Paulo",
    });
  }

  return "";
};

module.exports = DateIndicator;
