import pdf from "pdf-parse"

export async function extractTextFromPDF(pdfBuffer) {
  try {
    const data = await pdf(pdfBuffer)
    return data.text
  } catch (error) {
    console.error("Erro ao extrair texto do PDF:", error)
    throw error
  }
}

export function parseClientData(text) {
  const lines = text.split("\n")
  const clients = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Procurar por linhas que contêm dados de cliente
    if (line.match(/^\d{2}\/\d{2}\/\d{4}/)) {
      const parts = line.split(/\s+/)

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
        const enderecoParts = enderecoLine.split(/\s+/)

        const rua = enderecoParts[0] || ""
        const numero = enderecoParts[1] || ""
        const referencia = enderecoParts.slice(2, -1).join(" ") || ""
        const bairro = enderecoParts[enderecoParts.length - 1] || ""

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

        const client = {
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

export function generateFormattedOutput(clients) {
  let output = ""

  clients.forEach((client) => {
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
