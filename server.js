require("dotenv").config();
const { ThermalPrinter, PrinterTypes } = require("node-thermal-printer");
const express = require("express");
const cors = require("cors");
const tablePreview = require("./printModels/pdvBar/tablePreview");
const pdvRealease = require("./printModels/pdvBar/pdvRealeases");
const tableRealease = require("./printModels/pdvBar/tableRealease");
const libraryLoan = require("./printModels/library/loan");
const entranceReceipt = require("./printModels/littleClub/entranceReceipt");
const loanReceipt = require("./printModels/loan/loan");
const devolutionReceipt = require("./printModels/loan/devolution");
const sellItems = require("./printModels/pdvBar/report_sell_items");
const cashierClosure = require("./printModels/pdvBar/cashierClosure");
const { SerialPort } = require("serialport");
const app = express();

const dieboldPort = new SerialPort({
  path: "COM1",
  baudRate: 9600,
  autoOpen: false,
});

dieboldPort.open((err) => {
  if (!err) {
    printer = dieboldPrinter;
    console.log("is Connected to DIEBOLD");
  } else {
    console.log({ dieboldErr: err });
  }
});

let printer;

const epsonPrinter = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: "printer:EPSON TM-T88V Receipt",
  options: {
    timeout: 1000,
  },
  width: 56,
  driver: require("@thiagoelg/node-printer"),
});

const dieboldPrinter = new ThermalPrinter({
  type: PrinterTypes.STAR,
  interface: dieboldPort,
  options: {
    timeout: 1000,
  },
  width: 56,
});

epsonPrinter
  .isPrinterConnected()
  .then((connect) => {
    console.log(connect);
    printer = epsonPrinter;
    console.log("is Connected to EPSON TM-T88V");
  })
  .catch((err) => console.log({ epsonError: err }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "✅ Connected" });
});

app.post("/tablePreview", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      tablePreview(printer, req.body);
      res.status(200);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.post("/pdvRealease", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      const data = pdvRealease(printer, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.post("/closeTable", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      const data = tableRealease(printer, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.post("/sell-items", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      const data = sellItems(printer, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.post("/cashier-closure", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      const data = cashierClosure(printer, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.post("/library/loan", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      const data = libraryLoan(printer, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.post("/child-club/entrance", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      const data = entranceReceipt(printer, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.post("/loan", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      const data = loanReceipt(printer, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.post("/loan/devolution", async (req, res) => {
  const isConnected = await printer.isPrinterConnected();

  if (isConnected) {
    try {
      const data = devolutionReceipt(printer, req.body);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro ao gerar NF" });
    }
  } else {
    res.status(500).json({ error: "Impressora não conectada" });
  }
});

app.listen(process.env.PORT || 8000);

module.exports = app;
