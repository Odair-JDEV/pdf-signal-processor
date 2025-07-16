"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Download, FileText, AlertCircle, Zap, ChevronDown } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

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
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = await simulatePDFExtraction(selectedFile)
      setExtractedText(text)
    }
    reader.readAsArrayBuffer(selectedFile)
  }

  const simulatePDFExtraction = async (file: File): Promise<string> => {
    return `INTERMICRO LTDATOPSAPP SISTEMAS - (66)3211-0010 - 16/07/2025 15:09 - Pag 0001
RELATÓRIO DE NIVEL DE SINAL                                                                    	
---------------------------------------------------------------------------------------------------------------------------------------
DATA       SERVIÇO CLIENTE           USUÁRIO           CTO/PORTA       RX MÉDIA TX MÉDIA RX POWER  TX POWER PERFIL       
=======================================================================================================================================
16/07/2025 	158190  	ALINE APARECIDA D 	enila.7@imicro.co 	/            	  -13,43 	    2,01 	    0,00 	      0,00 	INTERNET                  	
Travessa Antônio Silvério                	15         	beco do Canechi                          	Louriçal                                 	
16/07/2025 	69167   	ANGELA CRISTINA F 	cristina.flores7@ 	/            	  -14,53 	    2,03 	    0,00 	      0,00 	INTERNET                  	
Travessa Antônio Silvério                	115        	ESCADÃO QUE SAI NA MARIA DO SOPÃO        	Louriçal                                 	
16/07/2025 	120668  	PAULO ROBERTO DE  	paulo.rd7@imicro. 	/            	    0,00 	    0,00 	    0,00 	      0,00 	INTERNET                  	
Rua Álvaro Januzzi                       	83         	PROXIMO A ESCOLA                         	Louriçal                                 	`
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
      output += `\n`
      output += `PPOE: ${client.usuario}\n`
      output += `COD/SERVIÇO: ${client.codigoServico}\n`
      output += `SINAL HST: ${client.sinalHST.rxMedia}|${client.sinalHST.txMedia}|${client.sinalHST.rxPower}|${client.sinalHST.txPower}\n`
      output += "--------------------------------------\n"
    })

    return output
  }

  const downloadOutput = () => {
    if (!file) {
      setError("Nenhum arquivo PDF foi carregado para gerar o nome do arquivo de saída.")
      return
    }

    const output = generateOutput()
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url

    // Extrair o nome do arquivo sem a extensão e adicionar .txt
    const fileNameWithoutExtension = file.name.split(".").slice(0, -1).join(".")
    link.download = `${fileNameWithoutExtension}.txt`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 text-white flex flex-col">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Image src="/imicro-logo.png" alt="Imicro Telecom" width={120} height={40} className="h-10 w-auto" />
            <div className="flex items-center gap-2 text-white">
              <Zap className="h-6 w-6 text-blue-300" />
              <span className="text-xl font-semibold">Processador de Relatórios</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-4xl flex-grow">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-50">
            Sistema de Processamento de Relatórios
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Extraia e organize dados de clientes a partir de relatórios PDF de nível de sinal com elegância e
            eficiência.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Upload Section */}
          <Card className="bg-white/5 backdrop-blur-xl border border-blue-300/20 shadow-2xl animate-fade-in-up animation-delay-100">
            <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-t-lg p-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                <Upload className="h-6 w-6" />
                Upload do Arquivo PDF
              </CardTitle>
              <CardDescription className="text-blue-100 text-base">
                Selecione o arquivo PDF contendo o relatório de nível de sinal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="pdf-file" className="text-blue-100 font-medium text-lg">
                    Arquivo PDF
                  </Label>
                  <Input
                    id="pdf-file"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="mt-3 border-blue-400/50 bg-blue-900/30 text-white placeholder:text-blue-200 focus:border-blue-500 focus:ring-blue-500 file:text-blue-100 file:bg-blue-700 file:hover:bg-blue-600 file:border-none file:rounded-md file:px-4 file:py-2 file:mr-4"
                  />
                </div>

                {file && (
                  <div className="flex items-center gap-3 text-base text-blue-100 bg-blue-800/30 p-4 rounded-lg border border-blue-400/30">
                    <FileText className="h-5 w-5 text-blue-300" />
                    <span className="font-medium">{file.name}</span>
                    <span className="text-blue-200">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive" className="border-red-400 bg-red-900/30 text-red-200">
                    <AlertCircle className="h-5 w-5 text-red-300" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Processing Section */}
          {extractedText && (
            <Card className="bg-white/5 backdrop-blur-xl border border-blue-300/20 shadow-2xl animate-fade-in-up animation-delay-200">
              <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-t-lg p-6">
                <CardTitle className="text-2xl font-bold">Texto Extraído</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  Texto extraído do PDF - clique em "Processar Dados" para analisar
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="min-h-[200px] font-mono text-sm border-blue-400/50 bg-blue-900/30 text-white placeholder:text-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Texto extraído do PDF aparecerá aqui..."
                />
                <div className="mt-6">
                  <Button
                    onClick={processData}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-3 text-lg shadow-lg transition-all duration-300 ease-in-out"
                  >
                    {isProcessing ? (
                      <>
                        <Zap className="mr-2 h-5 w-5 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Processar Dados
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {processedData.length > 0 && (
            <>
              <Card className="bg-white/5 backdrop-blur-xl border border-blue-300/20 shadow-2xl animate-fade-in-up animation-delay-300">
                <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-t-lg p-6">
                  <CardTitle className="flex items-center justify-between text-2xl font-bold">
                    <span>Dados Processados</span>
                    <Button
                      onClick={downloadOutput}
                      className="bg-white text-blue-700 hover:bg-blue-100 font-semibold shadow-md transition-all duration-300 ease-in-out"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Baixar TXT
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-base">
                    {processedData.length} clientes encontrados
                    {processedData.filter((c) => c.temSinalZero).length > 0 &&
                      ` (${processedData.filter((c) => c.temSinalZero).length} com sinal |0,00|0,00)`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {processedData.slice(0, 5).map((client, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 ${
                          client.temSinalZero
                            ? "bg-red-900/30 border-red-400 text-red-100"
                            : "bg-blue-900/30 border-blue-400/50 text-blue-100"
                        }`}
                      >
                        <div className="space-y-1 text-sm">
                          <div className="font-semibold">CLIENTE: {client.nome}</div>
                          <div>
                            {client.endereco.rua}-{client.endereco.numero}
                          </div>
                          <div>BAIRRO: {client.endereco.bairro}</div>
                          {client.endereco.referencia && <div>REFERENCIA: {client.endereco.referencia}</div>}
                          <div className="mt-2">PPOE: {client.usuario}</div>
                          <div>COD/SERVIÇO: {client.codigoServico}</div>
                          <div className={client.temSinalZero ? "text-red-300 font-semibold" : "text-blue-300"}>
                            SINAL HST: {client.sinalHST.rxMedia}|{client.sinalHST.txMedia}|{client.sinalHST.rxPower}|
                            {client.sinalHST.txPower}
                          </div>
                        </div>
                      </div>
                    ))}

                    {processedData.length > 5 && (
                      <div className="text-center text-blue-200 bg-blue-900/30 p-4 rounded-lg border border-blue-400/30">
                        ... e mais {processedData.length - 5} clientes
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              {/* Scroll Indicator */}
              <div className="flex justify-center mt-8">
                <ChevronDown className="h-12 w-12 text-blue-300 animate-bounce" aria-label="Role para baixo" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-blue-200 bg-white/5 backdrop-blur-xl border-t border-white/10">
        <p className="text-sm">
          Desenvolvido por{" "}
          <a
            href="https://odair.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 font-semibold transition-colors duration-200"
          >
            Odair.dev
          </a>
        </p>
      </footer>
    </div>
  )
}
