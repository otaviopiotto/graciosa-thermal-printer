const printLittleClubHeader = async (
  printer,
  data,
  type = "",
  companyName = "GCC"
) => {
  printer.clear();
  printer.setTypeFontB();
  printer.drawLine();
  printer.println(`${companyName} - ${type}`);
  printer.alignCenter();
  printer.println("CLUBINHO DA CRIANÇA");

  // if (data.user) {
  //   printer.tableCustom([
  //     {
  //       text: `Usuário: ${data.user.code} ${data.user.name}`,
  //       align: "LEFT",
  //       width: fullWidth,
  //     },
  //   ]);
  // }
  // if (data.associate) {
  //   printer.tableCustom([
  //     {
  //       text: `Matrícula Agente: ${data.associate.code} ${data.associate.name}`,
  //       align: "LEFT",
  //       width: fullWidth,
  //     },
  //   ]);
  // }

  printer.drawLine();
};

module.exports = printLittleClubHeader;
