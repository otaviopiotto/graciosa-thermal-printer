const extenso = require("extenso");
const { format } = require("date-fns");
const printPdvHeader = require("./header");

const body = async (printer, data) => {
  printPdvHeader(
    printer,
    { ...data, is_sell_items: true },
    "RELATORIO DE VENDA DE ITENS"
  );

  const ticketTotal = data.items.reduce((sum, e) => {
    return (
      (sum.value ? Number(sum.total_value) * Number(sum.quantity) : sum) +
      Number(e.total_value) * Number(e.quantity)
    );
  }, 0);

  printer.println(
    `${format(new Date(), "dd/MM/yyyy HH:mm:ss")} - Usuario: ${
      data.user.code
    } - ${data.user.name}`
  );
  printer.newLine();

  printer.tableCustom([
    {
      text: "Cód.",
      width: 0.1,
    },
    {
      text: "Item",
      width: 0.42,
    },
    {
      text: "Qtde",
      width: 0.1,
    },
    {
      text: "Total",
      width: 0.23,
      align: "RIGHT",
    },
  ]);

  data.items.map((e) =>
    printer.tableCustom([
      {
        text: e.code + "",
        width: 0.1,
      },
      {
        text: e.description + "",
        width: 0.42,
      },
      {
        text: e.quantity + "",
        width: 0.1,
      },
      {
        text: Number(e.total_value).toFixed(2) + "",
        width: 0.23,
        align: "RIGHT",
      },
    ])
  );

  printer.newLine();
  printer.println(
    `NUM; ITENS: ${data.items.length.toString().padStart(2, "0")}`
  );
  printer.println(`TOTAL VENDA: ${ticketTotal.toFixed(2)}`);
  printer.newLine();
  printer.println(
    "(" +
      extenso(ticketTotal.toFixed(2).toString().replace(".", ","), {
        mode: "currency",
      }) +
      ")"
  );
};

const operatorVia = async (printer, data) => {
  body(printer, data);
  printer.newLine();
  printer.newLine();
  printer.drawLine();
  printer.cut();

  try {
    await printer.execute();
    return true;
  } catch (error) {
    return false;
  }
};
const agentVia = async (printer, data) => {
  body(printer, data);

  printer.newLine();
  printer.println("RECONHEÇO E PAGAREI A IMPORTÂNCIA ACIMA");
  printer.newLine();
  printer.newLine();
  printer.alignCenter();
  printer.println("-------------------------");
  printer.println(data.associate.name);
  printer.newLine();
  printer.drawLine();
  printer.cut();

  try {
    printer.execute();
    return true;
  } catch (error) {
    return false;
  }
};

const sellItems = async (printer, data) => {
  try {
    await operatorVia(printer, data);
    // await agentVia(printer, data);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = sellItems;
