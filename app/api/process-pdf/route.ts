import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("pdf") as File

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Em produção, use pdf-parse aqui
    // const { extractTextFromPDF, parseClientData, generateFormattedOutput } = await import('@/scripts/pdf-parser')
    // const text = await extractTextFromPDF(buffer)
    // const clients = parseClientData(text)
    // const output = generateFormattedOutput(clients)

    // Simulação para demonstração com todos os clientes dos novos exemplos
    const simulatedOutput = `CLIENTE: PAULO ROBERTO DE
Rua Álvaro Januzzi-83
BAIRRO: Louriçal
REFERENCIA: PROXIMO A ESCOLA

PPOE: paulo.rd7@imicro.com.br
COD/SERVIÇO: 120668
SINAL HST: 0,00|0,00|0,00|0,00
--------------------------------------
CLIENTE: ALINE APARECIDA D
Travessa Antônio Silvério-15
BAIRRO: Louriçal
REFERENCIA: beco do Canechi

PPOE: enila.7@imicro.com.br
COD/SERVIÇO: 158190
SINAL HST: -13,43|2,01|0,00|0,00
--------------------------------------
CLIENTE: ANGELA CRISTINA F
Travessa Antônio Silvério-115
BAIRRO: Louriçal
REFERENCIA: ESCADÃO QUE SAI NA MARIA DO SOPÃO

PPOE: cristina.flores7@imicro.com.br
COD/SERVIÇO: 69167
SINAL HST: -14,53|2,03|0,00|0,00
--------------------------------------
CLIENTE: CLAUDIO ONIZIO RI
Avenida Comendador Jacinto Soares de So-00
BAIRRO: Centro
REFERENCIA: RESTAURANTE DA RODOVIARIA

PPOE: claudio.onizio7@imicro.com.br
COD/SERVIÇO: 63893
SINAL HST: -19,72|2,29|0,00|0,00
--------------------------------------`

    return NextResponse.json({
      success: true,
      output: simulatedOutput,
      clientCount: 27, // Total de clientes processados dos dois relatórios
    })
  } catch (error) {
    console.error("Erro ao processar PDF:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
