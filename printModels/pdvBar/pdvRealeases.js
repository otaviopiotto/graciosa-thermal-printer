const extenso = require("extenso");
const printPdvHeader = require("./header");

const body = async (printer, data) => {
  printPdvHeader(
    printer,
    { ...data, is_pdv_realease: true },
    "COMPROVANTE DE VENDA"
  );
  const ticketTotal = data?.items?.reduce?.((sum, e) => {
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
      width: 0.2,
      align: "RIGHT",
    },
  ]);

  data?.items?.map((e) =>
    printer.tableCustom([
      {
        text: e?.table_product_code?.toString().padStart(4, "0") + "",
        width: 0.1,
      },
      {
        text: e?.description,
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
        width: 0.2,
        align: "RIGHT",
      },
    ])
  );

  printer.newLine();
  printer.println(`VALOR DAS DESPESAS: ${ticketTotal.toFixed(2)}`);
  printer.println(`VALOR TOTAL: ${ticketTotal.toFixed(2)}`);
  printer.newLine();

  printer.println(
    "(" +
      extenso(ticketTotal?.toFixed(2)?.toString()?.replace(".", ","), {
        mode: "currency",
      }) +
      ")"
  );
  printer.newLine();
  printer.newLine();
  printer.println(
    `FORMA PGTO: ${
      data?.payment_plan_description || data?.payment_method_description || ""
    }`
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

const pdvRealease = async (printer, data) => {
  if (data?.multiple) {
    data?.data.forEach(async (e) => {
      try {
        await operatorVia(printer, e);
        await agentVia(printer, e);
        return true;
      } catch (error) {
        return false;
      }
    });

    return;
  }

  try {
    await operatorVia(printer, data);
    await agentVia(printer, data);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = pdvRealease;
