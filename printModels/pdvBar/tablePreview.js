const extenso = require("extenso");
const printPdvHeader = require("./header");

const tablePreview = async (printer, data) => {
  const ticketTotal = data.table_items.reduce.((sum, e) => {
    return (
      (sum.value ? sum.value * sum.quantity : sum) + e.value * e.quantity
    );
  }, 0);

  printPdvHeader(printer, data, "PREVIA DO FECHAMENTO DE MESA");

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
      text: "PrUnit",
      width: 0.11,
    },
    {
      text: "Total",
      width: 0.23,
      align: "RIGHT",
    },
  ]);

  data.table_items.map((e) =>
    printer.tableCustom([
      {
        text: e.item.table_product_code.toString().padStart(4, "0") + "",
        width: 0.1,
      },
      {
        text: e.item.description,
        width: 0.42,
      },
      {
        text: e.quantity + "",
        width: 0.1,
      },
      {
        text: e.value.toFixed(2) + "",
        width: 0.11,
      },
      {
        text: (e.value * e.quantity).toFixed(2) + "",
        width: 0.23,
        align: "RIGHT",
      },
    ])
  );

  printer.newLine();
  printer.alignLeft();
  printer.println("ITENS CONSUMIDOS:" + data.table_items.length);
  printer.newLine();
  printer.println(`VALOR DAS DESPESAS: ${ticketTotal.toFixed(2)}`);
  printer.println(`VALOR TOTAL: ${ticketTotal.toFixed(2)}`);
  printer.newLine();
  printer.println(
    `VALOR POR PESSOA (${data.busy_seats}): ${(
      ticketTotal / data.busy_seats
    ).toFixed(2)}`
  );

  printer.println(
    "(" +
      extenso(
        (ticketTotal / data.busy_seats)
          .toFixed(2)
          .toString()
          .replace(".", ","),
        {
          mode: "currency",
        }
      ) +
      ")"
  );
  printer.newLine();
  printer.newLine();
  printer.println(`OBSERVAÇÔES: ${data.observation || ""}`);
  printer.drawLine();

  printer.cut();

  try {
    await printer.execute();
    return true;
  } catch (error) {
    return false;
  }
};
module.exports = tablePreview;
