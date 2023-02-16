const { format } = require("date-fns");

const printLibraryHeader = async (
  printer,
  data,
  type = "",
  companyName = "GCC"
) => {
  const date = format(new Date(), "dd/MM/yyyy HH:mm:ss");
  const fullWidth = 1;

  printer.clear();
  printer.setTypeFontB();
  printer.drawLine();
  printer.println(`${companyName} - ${type}`);
  printer.println(`Data: ${date}`);

  if (data.user) {
    printer.tableCustom([
      {
        text: `Usuário: ${data.user.code} ${data.user.name}`,
        align: "LEFT",
        width: fullWidth,
      },
    ]);
  }
  if (data.associate) {
    printer.tableCustom([
      {
        text: `Matrícula Agente: ${data.associate.code} ${data.associate.name}`,
        align: "LEFT",
        width: fullWidth,
      },
    ]);
  }

  printer.drawLine();
};

module.exports = printLibraryHeader;
