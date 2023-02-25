//Possível Solução, achado nos códios do M2V
//https://www.projetoacbr.com.br/forum/topic/23975-contribui%C3%A7%C3%A3o-suporte-a-impressoras-diebold-tsp143mumd-posprinter/

//TEST1
//https://github.com/song940/node-escpos/blob/v3/packages/serialport/README.md
// const escpos = require("escpos");

// escpos.SerialPort = require("escpos-serialport");

// const serialDeviceOnWindows = new escpos.SerialPort("COM1");

//TEST2

// const escpos = require("escpos");
// install escpos-usb adapter module manually
// escpos.USB = require("escpos-usb");

// console.log(escpos.USB.findPrinter());

// Select the adapter based on your printer type
// const device = new escpos.USB();

// const printer = new escpos.Printer(device);

// device.open(function (error) {
//   printer
//     .font("a")
//     .align("ct")
//     .style("bu")
//     .size(1, 1)
//     .text("The quick brown fox jumps over the lazy dog")
//     .text("敏捷的棕色狐狸跳过懒狗")
//     .barcode("1234567", "EAN8")
//     .table(["One", "Two", "Three"])
//     .tableCustom(
//       [
//         { text: "Left", align: "LEFT", width: 0.33, style: "B" },
//         { text: "Center", align: "CENTER", width: 0.33 },
//         { text: "Right", align: "RIGHT", width: 0.33 },
//       ],
//       { encoding: "cp857", size: [1, 1] } // Optional
//     )
//     .qrimage("https://github.com/song940/node-escpos", function (err) {
//       this.cut();
//       this.close();
//     });
// });

//TEST 3

const { ThermalPrinter, PrinterTypes } = require("node-thermal-printer");

const dieboldPrinter = new ThermalPrinter({
  type: PrinterTypes.STAR,
  interface: "COM1",
  options: {
    timeout: 1000,
  },
  width: 56,
});

console.log(dieboldPrinter);
