/*
	Arquivo:	MEGENCOM32.H
				Header da biblioteca MEGENCOM32.
*/
#ifndef MEGENCOM32_H
#define MEGENCOM32_H

#if !defined( _MEGENCOM_DLL32_ )
	#define MEGENCOM32_API		__declspec( dllimport )
#else
	#define MEGENCOM32_API		__declspec( dllexport )
#endif

#define CallingConvention	__stdcall

/* Camadas de comunicacao */
enum {
	 CAMADA_GENERICA = 0
	,CAMADA_SERIAL
	,CAMADA_PARALELA
	,CAMADA_TODAS
	,CAMADA_USB
	};


#ifdef _cplusplus
	extern "C" {
#endif

	MEGENCOM32_API int CallingConvention	MEGENCOM32_DesativarLOG( int Camada );
	MEGENCOM32_API int CallingConvention	MEGENCOM32_AtivarLOG( int Camada ,int Nivel );
	MEGENCOM32_API int CallingConvention	MEGENCOM32_ConfigurarTimeoutsRXTX( char *Port ,DWORD TimeOutRX ,DWORD TimeOutTX );
	MEGENCOM32_API int CallingConvention	MEGENCOM32_StatusDoDispositivo( char *Port ,BYTE *Status );
	MEGENCOM32_API int CallingConvention	MEGENCOM32_AbrirDispositivo(
								 char *Port
								,DWORD Parametro
								,char Paridade
								,int NumBits
								,int NumStopbits
								,int ControleDeFluxo
								);
	MEGENCOM32_API int CallingConvention	MEGENCOM32_AbrirDispArqINI( char *Port );
	MEGENCOM32_API int CallingConvention	MEGENCOM32_FecharDispositivo( char *Port );
	MEGENCOM32_API int CallingConvention	MEGENCOM32_EscrevernoDispositivo(
								char *Port
								,BYTE *Buffer
								,DWORD NumBytes
								,DWORD *BytesEscritos
								);
	MEGENCOM32_API int CallingConvention	MEGENCOM32_LeroDispositivo(
								char *Port
								,BYTE *Buffer
								,DWORD NumBytes
								,DWORD *BytesLidos
								);
	MEGENCOM32_API int CallingConvention	MEGENCOM32_AguardaImpressaoStr(char *Port ,char * Timeout);
	MEGENCOM32_API int CallingConvention	MEGENCOM32_AguardaImpressao(char *Port ,DWORD Timeout);
	MEGENCOM32_API int CallingConvention	MEGENCOM32_PreparaImpressao(char *Port );

#ifdef _cplusplus
		}
#endif

#endif
