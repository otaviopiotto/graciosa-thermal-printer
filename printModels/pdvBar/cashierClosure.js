const extenso = require("extenso");
const { format } = require("date-fns");
const printPdvHeader = require("./header");
const DateIndicator = require("../../components/dateIndicator");

const body = async (printer, data) => {
  printPdvHeader(
    printer,
    { ...data, is_cashier_closure: true },
    "FECHAMENTO DE CAIXA"
  );

  const ticketTotal = data.items.reduce.((sum, e) => {
    return (
      (sum.value ? Number(sum.total_value) * 1 : sum) +
      Number(e.total_value) * 1
    );
  }, 0);

  const getAllMoneyPayment = data.items.filter(
    (e) => e.payment_plan_code === "2"
  );
  const moneyTotal = getAllMoneyPayment.reduce.((sum, e) => {
    return (
      (sum.value ? Number(sum.total_value) * 1 : sum) +
      Number(e.total_value) * 1
    );
  }, 0);

  const getAllOtherPayment = data.items.filter(
    (e) => e.payment_plan_code !== "2"
  );
  const otherTotal = getAllOtherPayment.reduce.((sum, e) => {
    return (
      (sum.value ? Number(sum.total_value) * 1 : sum) +
      Number(e.total_value) * 1
    );
  }, 0);

  const getAllCanceled = data.items.filter((e) =>
    e.st_payed.toLowerCase().includes("cancelado")
  );
  const canceledTotal = getAllCanceled.reduce.((sum, e) => {
    return (
      (sum.value ? Number(sum.total_value) * 1 : sum) +
      Number(e.total_value) * 1
    );
  }, 0);

  const getAllReturned = data.items.filter((e) =>
    e.st_payed.toLowerCase().includes("estornado")
  );
  const returnedTotal = getAllReturned.reduce.((sum, e) => {
    return (
      (sum.value ? Number(sum.total_value) * 1 : sum) +
      Number(e.total_value) * 1
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
      text: "Data",
      width: 0.2,
    },
    {
      text: "Cód.",
      width: 0.1,
    },
    {
      text: "Nome",
      width: 0.3,
    },
    {
      text: "Total",
      width: 0.2,
    },
    {
      text: "Ticket Nr",
      width: 0.35,
    },
  ]);

  data.items.map((e) =>
    printer.tableCustom([
      {
        text: DateIndicator(e.date, "dd/MM/yyyy") + "",
        width: 0.2,
      },
      {
        text: e.associate_code + "",
        width: 0.1,
      },
      {
        text: e.associate_name + "",
        width: 0.3,
      },
      {
        text: Number(e.total_value).toFixed(2) + "",
        width: 0.2,
      },
      {
        text: e.ticket_number + "",
        width: 0.35,
      },
    ])
  );

  printer.newLine();
  printer.println(
    `QTDE DE NOTAS: ${data.items.length.toString().padStart(2, "0")}`
  );
  printer.println(`VALOR TOTAL: ${ticketTotal.toFixed(2)}`);
  printer.println(
    "(" +
      extenso(ticketTotal.toFixed(2).toString().replace(".", ","), {
        mode: "currency",
      }) +
      ")"
  );
  printer.newLine();
  printer.drawLine();
  printer.println(
    `QTDE DINHEIRO: ${getAllMoneyPayment.length.toString().padStart(2, "0")}`
  );
  printer.println(`VALOR TOTAL DINHEIRO: ${moneyTotal.toFixed(2)}`);
  if (getAllMoneyPayment.length) {
    printer.println(
      "(" +
        extenso(ticketTotal.toFixed(2).toString().replace(".", ","), {
          mode: "currency",
        }) +
        ")"
    );
  }
  printer.newLine();
  printer.println(
    `QTDE OUTROS: ${getAllOtherPayment.length.toString().padStart(2, "0")}`
  );
  printer.println(`VALOR TOTAL OUTROS: ${otherTotal.toFixed(2)}`);
  if (getAllOtherPayment.length) {
    printer.println(
      "(" +
        extenso(otherTotal.toFixed(2).toString().replace(".", ","), {
          mode: "currency",
        }) +
        ")"
    );
  }

  printer.newLine();
  printer.println(
    `QTDE CANCELADOS: ${getAllCanceled.length.toString().padStart(2, "0")}`
  );
  printer.println(`VALOR TOTAL DE CANCELADOS: ${canceledTotal.toFixed(2)}`);

  if (getAllCanceled.length) {
    printer.println(
      "(" +
        extenso(canceledTotal.toFixed(2).toString().replace(".", ","), {
          mode: "currency",
        }) +
        ")"
    );
  }
  printer.newLine();
  printer.println(
    `QTDE ESTORNADOS: ${getAllReturned.length.toString().padStart(2, "0")}`
  );
  printer.println(`VALOR TOTAL DE ESTORNADOS: ${returnedTotal.toFixed(2)}`);

  if (getAllReturned.length) {
    printer.println(
      "(" +
        extenso(returnedTotal.toFixed(2).toString().replace(".", ","), {
          mode: "currency",
        }) +
        ")"
    );
  }
  printer.newLine();
  printer.println(`VALOR MESAS EM ABERTO NO MOMENTO: 00`);
  printer.newLine();
};

const operatorVia = async (printer, data) => {
  body(printer, data);
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

const cashierClosure = async (printer, data) => {
  try {
    await operatorVia(printer, data);
    // await agentVia(printer, data);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = cashierClosure;
