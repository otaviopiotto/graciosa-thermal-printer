//Possível Solução, achado nos códios do M2V
//https://www.projetoacbr.com.br/forum/topic/23975-contribui%C3%A7%C3%A3o-suporte-a-impressoras-diebold-tsp143mumd-posprinter/

//Teste 1 - simples
// const { ThermalPrinter, PrinterTypes } = require("node-thermal-printer");

// const dieboldPrinter = new ThermalPrinter({
//   type: PrinterTypes.STAR,
//   interface: "LPT1",
//   options: {
//     timeout: 1000,
//   },
//   width: 56,
//   driver: require("./Driver_Impressora_Termica_Diebold_USB TSP143MU-201/MEGENCOM32.dll"),
// });

// console.log(dieboldPrinter);

// const teste1 = () => {
//   dieboldPrinter.drawLine();
//   dieboldPrinter.println("Hello Word");
//   dieboldPrinter.cut();
// };
// teste1();

// //Teste 2 - conversão de pascal pra js
//https://cursos.alura.com.br/forum/topico-como-fazer-chamadas-de-funcoes-de-dll-com-node-js-148887
// const edge = require("edge-js");

// // const openPort = edge.func(
// //   "./Driver_Impressora_Termica_Diebold_USB TSP143MU-201/MEGENCOM32.dll"
// // );
// const openPort = edge.func({
//   assemblyFile:
//     "./Driver_Impressora_Termica_Diebold_USB TSP143MU-201/MEGENCOM32.dll",
//   typeName: "MEGENCOM32_AbrirDispositivo",
// });

// const portOpened = edge.func({
//   assemblyFile:
//     "./Driver_Impressora_Termica_Diebold_USB TSP143MU-201/MEGENCOM32.dll",
//   typeName: "MECAFCOD_RET_SUCESSO",
// });

// function AbrirPorta() {
//   let iRet;
//   iRet = openPort(["LPT1", 0, 0, 0, 0, 0], function (err, res) {});
//   if (iRet !== portOpened) {
//     // Tratamento em caso de Erro
//     console.log("erro ao conectar com a porta LPT1");
//     return false;
//   }
//   console.log("conectado com a porta LPT1");
//   // Tratamento em caso de Sucesso
//   return true;
// }

// AbrirPorta();

//teste pessoal

// const pTeste = edge.func("test.cs");
// const pTeste = edge.func({
//   assemblyFile: "test.cs",
//   typeName: "Samples.FooBar.MyType",
//   methodName: "Soma",
//   references: ["System.dll", "System.Core.dll", "manifest.manifest"],
// });

// pTeste(4, 5, function (err, res) {
//   if (err) throw err;
//   console.log(res);
// });

const ffi = require("ffi-napi");
const path = require("path");
const mecom32 = ffi.Library(path.join(__dirname, 'MECOM32.dll'), {
  // Defina as funções da DLL MECOM32.dll aqui
});
console.log('mecom32 found')
const libprintio = ffi.Library(path.join(__dirname, 'LIBPRINTIO.dll'), {
  // Defina as funções da DLL LIBPRINTIO.dll aqui
});
console.log('libprintio found')

const dlportio = ffi.Library(path.join(__dirname, 'DLPortIO.DLL'), {

});
console.log('dlportio found')

const mepar32 = ffi.Library(path.join(__dirname, 'MEPAR32.dll'), {
  // Defina as funções da DLL MEPAR32.dll aqui
}, {
  'MECOM32.dll': mecom32,
  'LIBPRINTIO.dll': libprintio,
  'DLPortIO.DLL': dlportio,
});
console.log('mepar32 found')
const megencom32 = ffi.Library(path.join(__dirname, 'MEGENCOM32.dll'), {
  "MEGENCOM32_AbrirDispositivo": ['int', ['string', 'int', 'int', 'int', 'int', 'int']]
}, {
  // Lista de dependências necessárias e ordem em que devem ser carregadas
  'MECOM32.dll': mecom32,
  'MEPAR32.dll': mepar32,
  'LIBPRINTIO.dll': libprintio
});
const result = megencom32.MEGENCOM32_AbrirDispositivo("LPT1", 0, 0, 0, 0, 0);
console.log(result);
