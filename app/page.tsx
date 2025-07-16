"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Download, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ClientData {
  nome: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    referencia: string
  }
  usuario: string
  codigoServico: string
  sinalHST: {
    rxMedia: string
    txMedia: string
    rxPower: string
    txPower: string
  }
  temSinalZero: boolean
}

export default function PDFSignalProcessor() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState("")
  const [processedData, setProcessedData] = useState<ClientData[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.type !== "application/pdf") {
      setError("Por favor, selecione apenas arquivos PDF.")
      return
    }

    setFile(selectedFile)
    setError("")

    // Simular extração de texto do PDF
    // Em um ambiente real, você usaria uma biblioteca como pdf-parse
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = await simulatePDFExtraction(selectedFile)
      setExtractedText(text)
    }
    reader.readAsArrayBuffer(selectedFile)
  }

  const simulatePDFExtraction = async (file: File): Promise<string> => {
    // Simulação da extração do PDF - em produção use pdf-parse ou similar
    return `INTERMICRO LTDATOPSAPP SISTEMAS - (66)3211-0010 - 16/07/2025 15:09 - Pag 0001
RELATÓRIO DE NIVEL DE SINAL                                                                    	
---------------------------------------------------------------------------------------------------------------------------------------
DATA       SERVIÇO CLIENTE           USUÁRIO           CTO/PORTA       RX MÉDIA TX MÉDIA RX POWER  TX POWER PERFIL       
=======================================================================================================================================
                         BASE OLT UBA APARTAMENTO INES
=======================================================================================================================================
SSID/OLT: 172.16.26.22                             	
---------------------------------------------------------------------------------------------------------------------------------------
PORTA: SLOT 2 PON 1                                	
---------------------------------------------------------------------------------------------------------------------------------------
16/07/2025 	158190  	ALINE APARECIDA D 	enila.7@imicro.co 	/            	  -13,43 	    2,01 	    0,00 	      0,00 	INTERNET                  	
Travessa Antônio Silvério                	15         	beco do Canechi                          	Louriçal                                 	
16/07/2025 	69167   	ANGELA CRISTINA F 	cristina.flores7@ 	/            	  -14,53 	    2,03 	    0,00 	      0,00 	INTERNET                  	
Travessa Antônio Silvério                	115        	ESCADÃO QUE SAI NA MARIA DO SOPÃO        	Louriçal                                 	
16/07/2025 	79221   	ANTONIO DE PADUA  	antonio.padua7@im 	/            	  -11,51 	    2,29 	    0,00 	      0,00 	INTERNET                  	
RUA ALVARO JANUZZI                       	160        	(A) AO LADO DA ESCOLA CURUMIN            	Louriçal                                 	
16/07/2025 	132300  	CARLOS ALBERTO MA 	calberto.7@imicro 	/            	  -14,76 	    1,57 	    0,00 	      0,00 	INTERNET                  	
Rua Álvaro Januzzi                       	41         	EM FRENTE A IGREJA  DA ASSEMBLEIA RUA DO 	Louriçal                                 	
16/07/2025 	130879  	FLAVIO FERNANDO M 	fernanda.fp@imicr 	/            	  -13,39 	    1,82 	    0,00 	      0,00 	INTERNET                  	
Avenida Hermes Bigonha                   	318        	APTO 103-EM FRENTE AO XODO FUNDO DE QUIN 	Louriçal                                 	
16/07/2025 	124952  	GLAUCIUS ALOISIO  	glaucius@imicro.c 	/            	  -12,80 	    2,25 	    0,00 	      0,00 	INTERNET                  	
Avenida Hermes Bigonha                   	40         	                                         	Louriçal                                 	
16/07/2025 	125792  	JOÃO VICTOR FERRE 	joaovf7@imicro.co 	/            	  -12,81 	    1,92 	    0,00 	      0,00 	INTERNET                  	
Rua Luiz Bigonha                         	15         	APTO 104 AO LADO DO SUPERMERCADO FORTALE 	Louriçal                                 	
16/07/2025 	108490  	JOSIANE OLIVEIRA  	josiane.o7@imicro 	/            	  -14,56 	    1,61 	    0,00 	      0,00 	INTERNET                  	
 Avenida Hermes Bigonha                  	318        	APTO 202, EM FRENTE AO BAR FUNDO DE QUIN 	Louriçal                                 	
16/07/2025 	118372  	JULIANA PEREIRA L 	ju.lima77@imicro. 	/            	  -11,98 	    1,63 	    0,00 	      0,00 	INTERNET                  	
Rua Luiz Bigonha                         	15         	                                         	Louriçal                                 	
16/07/2025 	116078  	KATIA APARECIDA M 	katia.ap7@imicro. 	/            	  -14,78 	    2,01 	    0,00 	      0,00 	INTERNET                  	
Rua Álvaro Januzzi                       	327        	FUNDOS                                   	Louriçal                                 	
16/07/2025 	109686  	KENNEDY DE PAULA  	kennedy.p7@imicro 	/            	  -12,47 	    1,89 	    0,00 	      0,00 	INTERNET                  	
 Rua Álvaro Januzzi                      	30         	                                         	Louriçal                                 	
16/07/2025 	61213   	LAIANA APARECIDA  	laiana.pedro7@imi 	/            	  -17,92 	    2,28 	    0,00 	      0,00 	INTERNET                  	
 AVENIDA HERMES BIGONHA                  	340        	CASA - PROXIMO A AGRONATIVA              	Louriçal                                 	
16/07/2025 	55235   	LAURA BEATRIZ DE  	lauraalvez7@imicr 	/            	  -15,28 	    1,29 	    0,00 	      0,00 	INTERNET                  	
 Avenida Hermes Bigonha                  	326        	EM FRENTE AO ANTIGO BAR XODÓ             	LOURIÇAL                                 	
16/07/2025 	104729  	LUIZ CLAUDIO DIAS 	luiz.dias7@imicro 	/            	  -13,80 	    1,97 	    0,00 	      0,00 	INTERNET                  	
 AVENIDA HERMES BIGONHA                  	62         	IGREJA PETENCOSTAL ESCOLA DE PROFETAS    	LOURIÇAL                                 	
16/07/2025 	123531  	MARIA DAS GRAÇAS  	mariabadaro@imicr 	/            	  -13,59 	    1,68 	    0,00 	      0,00 	INTERNET                  	
Avenida Hermes Bigonha                   	70         	EM FRENTE AO DR                          	Louriçal                                 	
16/07/2025 	148437  	NATHANY DE PAULA  	nathany.7@imicro. 	/            	  -13,27 	    1,99 	    0,00 	      0,00 	INTERNET                  	
Rua Antônio Bigonha                      	318        	apt 101 Prédio amarelo da esquina        	Louriçal                                 	
16/07/2025 	132698  	PAULO MAURICIO NA 	paulomau.7@imicro 	/            	  -12,74 	    2,08 	    0,00 	      0,00 	INTERNET                  	
Rua Maria Rogéria de Jesus               	11         	APTO 102                                 	Louriçal                                 	
16/07/2025 	120668  	PAULO ROBERTO DE  	paulo.rd7@imicro. 	/            	    0,00 	    0,00 	    0,00 	      0,00 	INTERNET                  	
Rua Álvaro Januzzi                       	83         	PROXIMO A ESCOLA                         	Louriçal                                 	
16/07/2025 	130721  	SABRINA QUELLEN S 	sabrinaque.7@imic 	/            	  -13,36 	    2,25 	    0,00 	      0,00 	INTERNET                  	
Avenida Hermes Bigonha                   	80         	AO LADO DO DER                           	Louriçal                                 	
16/07/2025 	125763  	WILSON SORELI TEI 	wilson.soreli7@im 	/            	  -14,16 	    1,73 	    0,00 	      0,00 	INTERNET                  	
Rua Álvaro Januzzi                       	82         	CASA DE CIMA,RUA DO CURUMIN              	Louriçal                                 	
16/07/2025 	63893   	CLAUDIO ONIZIO RI 	claudio.onizio7@i 	/            	  -19,72 	    2,29 	    0,00 	      0,00 	INTERNET                  	
 Avenida Comendador Jacinto Soares de So 	00         	RESTAURANTE DA RODOVIARIA                	Centro                                   	
16/07/2025 	137478  	CRISTIANO RODRIGU 	cristiano2022@imi 	/            	  -15,55 	    1,64 	    0,00 	      0,00 	INTERNET                  	
Avenida Comendador Jacinto Soares de Sou 	436        	APT 101 - AO LADO DO SACOLÃO             	Centro                                   	
16/07/2025 	111482  	ELCY PIRES DA CUN 	elcy.7@imicro.com 	/            	  -18,06 	    1,28 	    0,00 	      0,00 	INTERNET                  	
AVENIDA COMENDADOR JACINTO SOARES DE SOU 	250        	BOX 8                                    	CENTRO                                   	
16/07/2025 	124199  	IGREJA MUNDIAL DO 	igrejamun@imicro. 	/            	  -15,68 	    1,93 	    0,00 	      0,00 	INTERNET                  	
Avenida Comendador Jacinto Soares de Sou 	404        	B                                        	Centro                                   	
16/07/2025 	63894   	JARDEL DE MELO SE 	jardel.mello7@imi 	/            	  -19,72 	    1,48 	    0,00 	      0,00 	INTERNET                  	
 AVENIDA COMENDADOR JACINTO SOARES DE SO 	15         	LANCHONETE PLATAFORMA 15                 	Centro                                   	
16/07/2025 	105651  	LIDIANE DARC LAUR 	lidiane.darc7@imi 	/            	  -16,09 	    1,65 	    0,00 	      0,00 	INTERNET                  	
Rua Henrique Russo                       	19         	AP 302 - CHEGANDO NO LACTARIO            	Centro                                   	
16/07/2025 	116394  	ROBERTO ANDRADE D 	roberto.and@imicr 	/            	  -17,52 	    1,64 	    0,00 	      0,00 	INTERNET                  	
Avenida Comendador Jacinto Soares de Sou 	420        	APTO 204- DEPOIS DA JACAR- ANTES DO SACO 	Centro                                   	`
  }

  const processData = () => {
    if (!extractedText) {
      setError("Nenhum texto extraído do PDF.")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      const clients = parseClientData(extractedText)
      setProcessedData(clients)
    } catch (err) {
      setError("Erro ao processar os dados do PDF.")
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const parseClientData = (text: string): ClientData[] => {
    const lines = text.split("\n")
    const clients: ClientData[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Procurar por linhas que contêm dados de cliente (começam com data)
      if (line.match(/^\d{2}\/\d{2}\/\d{4}/)) {
        const parts = line.split("\t").map((p) => p.trim())

        if (parts.length >= 8) {
          const codigoServico = parts[1]
          const nomeCliente = parts[2]
          const usuario = parts[3]
          const rxMedia = parts[5]
          const txMedia = parts[6]
          const rxPower = parts[7]
          const txPower = parts[8]

          // Próxima linha contém endereço
          const enderecoLine = lines[i + 1]?.trim() || ""
          const enderecoParts = enderecoLine.split("\t").map((p) => p.trim())

          let rua = ""
          let numero = ""
          let referencia = ""
          let bairro = ""

          if (enderecoParts.length >= 4) {
            rua = enderecoParts[0]
            numero = enderecoParts[1]
            referencia = enderecoParts[2]
            bairro = enderecoParts[3]
          }

          // Completar usuário se necessário - melhorada para lidar com diferentes casos
          let usuarioCompleto = usuario
          if (usuario && !usuario.includes("@imicro.com.br")) {
            if (usuario.endsWith("@i")) {
              usuarioCompleto = usuario.replace("@i", "@imicro.com.br")
            } else if (usuario.includes("@imicro.co")) {
              usuarioCompleto = usuario.replace("@imicro.co", "@imicro.com.br")
            } else if (usuario.includes("@imicro.")) {
              usuarioCompleto = usuario.replace("@imicro.", "@imicro.com.br")
            } else if (usuario.includes("@imicr")) {
              usuarioCompleto = usuario.replace("@imicr", "@imicro.com.br")
            } else if (usuario.includes("@imi")) {
              usuarioCompleto = usuario.replace("@imi", "@imicro.com.br")
            } else if (usuario.includes("@imic")) {
              usuarioCompleto = usuario.replace("@imic", "@imicro.com.br")
            } else if (usuario.includes("@im")) {
              usuarioCompleto = usuario.replace("@im", "@imicro.com.br")
            } else if (!usuario.includes("@")) {
              usuarioCompleto = usuario + "@imicro.com.br"
            } else {
              usuarioCompleto = usuario + "micro.com.br"
            }
          }

          // Verificar se tem sinal zero - incluindo casos onde RX e TX são 0,00
          const temSinalZero = (rxPower === "0,00" && txPower === "0,00") || (rxMedia === "0,00" && txMedia === "0,00")

          const client: ClientData = {
            nome: nomeCliente,
            endereco: {
              rua,
              numero,
              bairro,
              referencia,
            },
            usuario: usuarioCompleto,
            codigoServico,
            sinalHST: {
              rxMedia,
              txMedia,
              rxPower,
              txPower,
            },
            temSinalZero,
          }

          clients.push(client)
        }
      }
    }

    // Ordenar: clientes com sinal zero primeiro
    return clients.sort((a, b) => {
      if (a.temSinalZero && !b.temSinalZero) return -1
      if (!a.temSinalZero && b.temSinalZero) return 1
      return 0
    })
  }

  const generateOutput = (): string => {
    let output = ""

    processedData.forEach((client) => {
      output += `CLIENTE: ${client.nome}\n`
      output += `${client.endereco.rua}-${client.endereco.numero}\n`
      output += `BAIRRO: ${client.endereco.bairro}\n`
      if (client.endereco.referencia) {
        output += `REFERENCIA: ${client.endereco.referencia}\n`
      }
      output += `\n` // Adicionar quebra de linha antes do PPOE
      output += `PPOE: ${client.usuario}\n`
      output += `COD/SERVIÇO: ${client.codigoServico}\n`
      output += `SINAL HST: ${client.sinalHST.rxMedia}|${client.sinalHST.txMedia}|${client.sinalHST.rxPower}|${client.sinalHST.txPower}\n`
      output += "--------------------------------------\n"
    })

    return output
  }

  const downloadOutput = () => {
    const output = generateOutput()
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `relatorio_sinal_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Processador de Relatórios de Sinal</h1>
        <p className="text-muted-foreground">
          Faça upload de arquivos PDF contendo relatórios de nível de sinal para extrair e organizar os dados dos
          clientes.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload do Arquivo PDF
            </CardTitle>
            <CardDescription>Selecione o arquivo PDF contendo o relatório de nível de sinal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pdf-file">Arquivo PDF</Label>
                <Input id="pdf-file" type="file" accept=".pdf" onChange={handleFileUpload} className="mt-1" />
              </div>

              {file && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Processing Section */}
        {extractedText && (
          <Card>
            <CardHeader>
              <CardTitle>Texto Extraído</CardTitle>
              <CardDescription>Texto extraído do PDF - clique em "Processar Dados" para analisar</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder="Texto extraído do PDF aparecerá aqui..."
              />
              <div className="mt-4">
                <Button onClick={processData} disabled={isProcessing} className="w-full">
                  {isProcessing ? "Processando..." : "Processar Dados"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {processedData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Dados Processados</span>
                <Button onClick={downloadOutput} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Baixar TXT
                </Button>
              </CardTitle>
              <CardDescription>
                {processedData.length} clientes encontrados
                {processedData.filter((c) => c.temSinalZero).length > 0 &&
                  ` (${processedData.filter((c) => c.temSinalZero).length} com sinal |0,00|0,00)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {processedData.slice(0, 5).map((client, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/50">
                    <div className="space-y-1 text-sm">
                      <div className="font-semibold">CLIENTE: {client.nome}</div>
                      <div>
                        {client.endereco.rua}-{client.endereco.numero}
                      </div>
                      <div>BAIRRO: {client.endereco.bairro}</div>
                      {client.endereco.referencia && <div>REFERENCIA: {client.endereco.referencia}</div>}
                      <div>PPOE: {client.usuario}</div>
                      <div>COD/SERVIÇO: {client.codigoServico}</div>
                      <div className={client.temSinalZero ? "text-red-600 font-semibold" : ""}>
                        SINAL HST: {client.sinalHST.rxMedia}|{client.sinalHST.txMedia}|{client.sinalHST.rxPower}|
                        {client.sinalHST.txPower}
                      </div>
                    </div>
                  </div>
                ))}

                {processedData.length > 5 && (
                  <div className="text-center text-muted-foreground">
                    ... e mais {processedData.length - 5} clientes
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
