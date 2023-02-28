{function MEGENCOM32_DesativarLOG( Camada: Integer ): Integer; StdCall; External 'MEGENCOM32.dll';
function MEGENCOM32_AtivarLOG( Camada,Nivel: Integer ): Integer; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_ConfigurarTimeoutsRXTX( Porta: PChar; TimeOutRX, TimeOutTX: LongInt ): Integer; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_StatusDoDispositivo( Porta: PChar; Status : PChar ): Integer; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_AbrirDispositivo( Porta : PChar; Baudrate : LongInt; Paridade : Byte; NumBits, NumStopBits, ControleDeFluxo : Integer ): longInt; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_FecharDispositivo( Porta : PChar ): Integer; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_EscrevernoDispositivo( Porta : PChar; Buffer : PChar; NumBytes : LongInt; NumBytesEscritos : PLongInt ): Integer; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_LeroDispositivo( Porta : PChar; Buffer : PChar; NumBytes : LongInt; NumBytesLidos: PLongInt ): Integer; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_PreparaImpressao( Porta : PChar ): Integer; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_AguardaImpressao( Porta : PChar; Tempo : LongInt ): Integer; StdCall; External 'MEGENCOM32.DLL';
function MEGENCOM32_AguardaImpressaoStr( Porta : PChar; Tempo : PChar ): Integer; StdCall; External 'MEGENCOM32.DLL';}
