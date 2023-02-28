Declare Function MEGENCOM32_DesativarLOG Lib "MEGENCOM32.dll" ( ByVal Camada As Long ) As Long
Declare Function MEGENCOM32_AtivarLOG Lib "MEGENCOM32.dll" ( ByVal Camada As Long, ByVal Nivel As Long ) As Long
Declare Function MEGENCOM32_AbrirDispositivo Lib "MEGENCOM32.dll" ( ByVal Porta As String, ByVal Baudrate As Long, ByVal Paridade As Byte, ByVal NumBits As Long, ByVal NumStopbits As Long, ByVal CtrlFluxo As Long ) As Long
Declare Function MEGENCOM32_FecharDispositivo Lib "MEGENCOM32.dll" ( ByVal Porta As String ) As Long
Declare Function MEGENCOM32_ConfigurarTimeoutsRXTX Lib "MEGENCOM32.dll" ( ByVal Porta As String, ByVal TimeOutRX As Long, ByVal TimeOutTX As Long ) As Long
Declare Function MEGENCOM32_StatusDoDispositivo Lib "MEGENCOM32.dll" ( ByVal Porta As String, ByRef Status As Byte ) As Long
Declare Function MEGENCOM32_EscrevernoDispositivo Lib "MEGENCOM32.dll" ( ByVal Porta As String, ByVal Buffer As String, ByVal NumBytes As Long, ByRef BytesEscritos As Long ) As Long
Declare Function MEGENCOM32_LeroDispositivo Lib "MEGENCOM32.dll" ( ByVal Porta As String, ByVal Buffer As String, ByVal NumBytes As Long, ByRef BytesLidos As Long ) As Long
Declare Function MEGENCOM32_PreparaImpressao Lib "MEGENCOM32.dll" ( ByVal Porta As String ) As Long
Declare Function MEGENCOM32_AguardaImpressao Lib "MEGENCOM32.dll" ( ByVal Porta As String, ByVal Timeout As Long ) As Long
Declare Function MEGENCOM32_AguardaImpressaoStr Lib "MEGENCOM32.dll" ( ByVal Porta As String, ByVal Timeout As String ) As Long
