const { format } = require("date-fns");
const printPdvHeader = require("./header");

const body = async (printer, data) => {
  printPdvHeader(
    printer,
    { ...data, is_pdv_realease: true },
    "COMPROVANTE DE EMPRÉSTIMO NA BIBLIOTECA"
  );

  printer.tableCustom([
    {
      text: "Cód.",
      width: 0.1,
    },
    {
      text: "Titulo",
      width: 0.58,
    },

    {
      text: "Dt. Devolução",
      width: 0.3,
      align: "RIGHT",
    },
  ]);

  data.books.map((e) =>
    printer.tableCustom([
      {
        text: e.book_code.toString().padStart(4, "0") + "",
        width: 0.1,
      },
      {
        text: e.book_title,
        width: 0.58,
      },
      {
        text: format(new Date(e.expected_return_date), "dd/MM/yyyy"),
        width: 0.3,
        align: "RIGHT",
      },
    ])
  );

  printer.newLine();
  printer.alignCenter();
  printer.println("******************** ATENCAO ********************");
  printer.println(
    "AS DEVOLUCOES DEVERAO SER REALIZADAS NAS DATAS ESPECIFICADAS ACIMA. O ATRASO ESTARA SUJEITO A MULTA DIARIA"
  );
  printer.println("******************************************************");
  printer.newLine();
  printer.newLine();
  printer.newLine();
  printer.println("---------------------------------------");
  printer.println("Assinatura");
};

const operatorVia = async (printer, data) => {
  body(printer, data);
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

const libraryLoan = async (printer, data) => {
  try {
    await operatorVia(printer, data);
    // await agentVia(printer, data);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = libraryLoan;
