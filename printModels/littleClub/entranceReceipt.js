const { format } = require("date-fns");
const printLittleClubHeader = require("./header");

const body = async (printer, data) => {
  printLittleClubHeader(
    printer,
    { ...data, is_pdv_realease: true },
    "COMPROVANTE DE ENTRADA"
  );
  printer.alignLeft();
  printer.println(
    `${format(new Date(), "dd/MM/yyyy HH:mm:ss")} - Código Seq. ${
      data.code
    } Mat. ${data.dependent_code} Tit.`
  );
  printer.newLine();
  printer.println(`NOME DA CRIANÇA: ${data.dependent.name}`);
  printer.newLine();
  printer.println(
    `ENTRADA: ${format(new Date(data.entry_date), "dd/MM/yyyy HH:mm:ss")}`
  );

  printer.newLine();
  printer.alignCenter();
  printer.println("******************** ATENCAO ********************");
  printer.println("PARA BUSCAR A CRIANÇA APRESENTE ESTE COMPROVANTE");
  printer.println("******************************************************");
  printer.newLine();
  printer.newLine();
  printer.newLine();
  printer.println("---------------------------------------");
  printer.println("Responsável");
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

const entranceReceipt = async (printer, data) => {
  try {
    await operatorVia(printer, data);
    // await agentVia(printer, data);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = entranceReceipt;
