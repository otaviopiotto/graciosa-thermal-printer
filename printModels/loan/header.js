const { format } = require("date-fns");

const printLoanHeader = async (
  printer,
  data,
  type = "",
  companyName = "GRACIOSA COUNTRY CLUB"
) => {
  const fullWidth = 1;

  printer.clear();
  printer.setTypeFontB();
  printer.drawLine();
  printer.tableCustom([
    { text: companyName, align: "LEFT", width: 0.5 },
    { text: type, align: "RIGHT", width: 0.5 },
  ]);

  if (data.user) {
    printer.tableCustom([
      {
        text: `Operador: ${data.user.code} ${data.user.name}`,
        align: "LEFT",
        width: fullWidth,
      },
    ]);
  }

  printer.drawLine();
};

module.exports = printLoanHeader;
