const { format } = require("date-fns");
const printLoanHeader = require("./header");

const body = async (printer, data) => {
  printLoanHeader(
    printer,
    { ...data, is_pdv_realease: true },
    "DEVOLUCAO COMPULSORIO"
  );
  printer.alignLeft();
  printer.println(
    `${format(new Date(), "dd/MM/yyyy HH:mm:ss")} - Matric. ${
      data?.associate_code
    }`
  );
  printer.newLine();
  printer.println(`CODIGO DO EMPRESTIMO: ${data?.code}`);
  printer.println(
    `DATA DO EMPRESTIMO: ${format(new Date(), "dd/MM/yyyy HH:mm:ss")}`
  );
  printer.println(
    `DATA DA DEVOLUCAO: ${format(
      new Date(data?.borrow_date),
      "dd/MM/yyyy HH:mm:ss"
    )}`
  );
  printer.println(`OBJETO: ${data?.object?.name}`);
  printer.println(`LOCAL DE EMPRESTIMO: ${data?.location?.description}`);
  printer.println(`LOCAL DE DEVOLUCAO: ${data?.devolution_cashier?.name}`);
  printer.println(`QUANTIDADE: ${data?.quantity}`);
  printer.println(`IDENTIFICADOR/ARMARIO: ${data?.identification}`);
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
  printer.newLine();
  printer.alignCenter();
  printer.println("******************** ATENCAO ********************");
  printer.println(
    `A NAO DEVOLUCAO DO OBJETO ACIMA DESCRITO, IMPLICA NO LANCAMENTO DE DEBITO NO VALOR DE R$ ${data?.fine} EM SUA FATURA MENSAL.`
  );
  printer.println("******************************************************");
  printer.newLine();
  printer.newLine();
  printer.alignLeft();
  printer.println("DE ACORDO:");
  printer.newLine();
  printer.newLine();
  printer.newLine();
  printer.alignCenter();
  printer.println("---------------------------------------");
  printer.println(`${data?.associate_code} - ${data?.associate?.name}`);
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

const devolutionReceipt = async (printer, data) => {
  try {
    await operatorVia(printer, data);
    await agentVia(printer, data);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = devolutionReceipt;
