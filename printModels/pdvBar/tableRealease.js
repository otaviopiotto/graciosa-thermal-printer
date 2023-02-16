const extenso = require("extenso");
const printPdvHeader = require("./header");

const body = async (printer, data) => {
  printPdvHeader(
    printer,
    { ...data, is_pdv_realease: true },
    "COMPROVANTE DE VENDA"
  );

  const ticketTotal = data?.table_items.reduce?.((sum, e) => {
    return (
      (sum?.value ? sum?.value * sum.quantity : sum) + e?.value * e.quantity
    );
  }, 0);

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

  data?.table_items?.map((e) =>
    printer.tableCustom([
      {
        text:
          (data?.isSelected ? "#" : "") +
          e?.item?.table_product_code?.toString().padStart(4, "0") +
          "",
        width: 0.1,
      },
      {
        text: e?.item?.description,
        width: 0.42,
      },
      {
        text: e?.quantity + "",
        width: 0.1,
      },
      {
        text: e?.value.toFixed(2) + "",
        width: 0.11,
      },
      {
        text: (e?.value * e?.quantity).toFixed(2) + "",
        width: 0.23,
        align: "RIGHT",
      },
    ])
  );

  printer.newLine();
  printer.alignLeft();
  printer.println(`VALOR DAS DESPESAS: ${ticketTotal.toFixed(2)}`);
  printer.println(`VALOR PAGO: ${ticketTotal.toFixed(2)}`);
  printer.newLine();
  printer.println(
    "(" +
      extenso(ticketTotal?.toFixed(2)?.toString()?.replace(".", ","), {
        mode: "currency",
      }) +
      ")"
  );
  printer.println(
    `Divisão de despesas por: ${
      !data?.associate ? data?.associates_id?.length : "*"
    } pessoa(s) `
  );

  printer.newLine();
  printer.newLine();

  if (data?.isSelected) {
    printer.println("# Pagamento Individual por item.");
    printer.newLine();
    printer.newLine();
  }

  printer.println(`FORMA PGTO: ${data?.payment_method_description || ""}`);
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
  printer.println(data?.associate?.name);
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

const tableRealease = async (printer, data) => {
  try {
    await operatorVia(printer, data);
    await agentVia(printer, data);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = tableRealease;
