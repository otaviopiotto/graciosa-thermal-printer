const { format } = require("date-fns");

const printPdvHeader = async (
  printer,
  data,
  type = "",
  companyName = "GRACIOSA COUNTRY CLUB"
) => {
  const date = format(new Date(), "dd/MM/yyyy HH:mm:ss");
  const fullWidth = 1;

  printer.clear();
  printer.setTypeFontB();
  printer.drawLine();
  printer.tableCustom([
    { text: companyName, align: "LEFT", width: 0.5 },
    { text: type, align: "RIGHT", width: 0.5 },
  ]);

  if (data?.cashier) {
    printer.tableCustom([
      {
        text: `Caixa: ${data?.cashier?.name}`,
        align: "LEFT",
        width: fullWidth,
      },
    ]);
  }
  if (data?.user) {
    printer.tableCustom([
      {
        text: `Operador: ${data?.user?.code} ${data?.user?.name}`,
        align: "LEFT",
        width: fullWidth,
      },
    ]);
  }
  if (data?.waiter) {
    printer.tableCustom([
      {
        text: `Garçom/Atend: ${data?.waiter?.code} ${data?.waiter?.name}`,
        align: "LEFT",
        width: fullWidth,
      },
    ]);
  }

  if (data?.is_table_preview) {
    printer.tableCustom([
      {
        text: "Mesa:" + data?.number + " - Data/Hora: " + date,
        align: "LEFT",
        width: fullWidth,
      },
    ]);
  }
  if (data?.is_pdv_realease) {
    printer.tableCustom([
      {
        text:
          date +
          " - Ticket N:" +
          data?.ticket_number +
          " - Cod. Agente: " +
          data?.associate?.code,
        align: "LEFT",
        width: 2,
      },
    ]);
  }

  printer.drawLine();
};

module.exports = printPdvHeader;
