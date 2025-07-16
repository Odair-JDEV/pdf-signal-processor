# Sistema de Processamento de Relatórios de Sinal PDF

Sistema para extrair e organizar dados de clientes a partir de relatórios PDF de nível de sinal da rede Imicro Telecom.

## 📋 Funcionalidades

- ✅ Upload e processamento de arquivos PDF
- ✅ Extração automática de dados dos clientes
- ✅ Correção automática de emails incompletos
- ✅ Organização por prioridade (clientes com sinal |0,00|0,00 no topo)
- ✅ Geração de arquivo .txt formatado
- ✅ Interface web responsiva

## 🚀 Instalação

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passo 1: Clone o Repositório

\`\`\`bash
git clone https://github.com/seu-usuario/pdf-signal-processor.git
cd pdf-signal-processor
\`\`\`

### Passo 2: Instale as Dependências

\`\`\`bash
npm install
# ou
yarn install
\`\`\`

### Passo 3: Instale a Biblioteca PDF (Opcional para Produção)

Para processamento real de PDFs, instale a biblioteca pdf-parse:

\`\`\`bash
npm install pdf-parse
# ou
yarn add pdf-parse
\`\`\`

### Passo 4: Execute o Projeto

#### Modo Desenvolvimento
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

#### Modo Produção
\`\`\`bash
npm run build
npm start
# ou
yarn build
yarn start
\`\`\`

### Passo 5: Acesse o Sistema

Abra seu navegador e acesse:
\`\`\`
http://localhost:3000
\`\`\`

## 📦 Estrutura do Projeto

\`\`\`
pdf-signal-processor/
├── app/
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout da aplicação
│   ├── globals.css           # Estilos globais
│   └── api/
│       └── process-pdf/
│           └── route.ts      # API para processamento
├── components/
│   └── ui/                   # Componentes shadcn/ui
├── scripts/
│   └── pdf-parser.js         # Lógica de processamento PDF
├── lib/
│   └── utils.ts              # Utilitários
├── README.md                 # Este arquivo
├── package.json              # Dependências
├── tailwind.config.ts        # Configuração Tailwind
└── tsconfig.json             # Configuração TypeScript
\`\`\`

## 🔧 Configuração para Produção

### 1. Configurar Processamento Real de PDF

Edite o arquivo `app/page.tsx` e descomente as linhas para usar pdf-parse:

\`\`\`typescript
// Substitua a simulação por:
const reader = new FileReader()
reader.onload = async (e) => {
  const arrayBuffer = e.target?.result as ArrayBuffer
  const { extractTextFromPDF } = await import('@/scripts/pdf-parser')
  const text = await extractTextFromPDF(Buffer.from(arrayBuffer))
  setExtractedText(text)
}
reader.readAsArrayBuffer(selectedFile)
\`\`\`

### 2. Configurar API Route

No arquivo `app/api/process-pdf/route.ts`, descomente:

\`\`\`typescript
const { extractTextFromPDF, parseClientData, generateFormattedOutput } = await import('@/scripts/pdf-parser')
const text = await extractTextFromPDF(buffer)
const clients = parseClientData(text)
const output = generateFormattedOutput(clients)
\`\`\`

### 3. Deploy

#### Vercel (Recomendado)
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

#### Docker
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 📖 Como Usar

### 1. Upload do PDF
- Clique em "Escolher arquivo"
- Selecione o arquivo PDF do relatório de sinal
- O texto será extraído automaticamente

### 2. Processamento
- Clique em "Processar Dados"
- O sistema analisará todos os clientes
- Dados serão organizados automaticamente

### 3. Download do Resultado
- Clique em "Baixar TXT"
- Arquivo será salvo com formato: `relatorio_sinal_YYYY-MM-DD.txt`

## 📄 Formato de Saída

\`\`\`
CLIENTE: NOME DO CLIENTE
Rua Exemplo-123
BAIRRO: Nome do Bairro
REFERENCIA: Descrição da referência

PPOE: usuario@imicro.com.br
COD/SERVIÇO: 123456
SINAL HST: -10,74|0,86|0,00|0,00
--------------------------------------
\`\`\`

## 🔍 Funcionalidades Detalhadas

### Correção Automática de Emails
O sistema corrige automaticamente emails incompletos:
- `usuario@i` → `usuario@imicro.com.br`
- `usuario@imicro.` → `usuario@imicro.com.br`
- `usuario@imicr` → `usuario@imicro.com.br`
- `usuario@imi` → `usuario@imicro.com.br`

### Priorização por Sinal
Clientes com problemas de sinal aparecem primeiro:
- `|0,00|0,00` nos últimos dois valores
- `0,00|0,00|0,00|0,00` em todos os valores

### Dados Extraídos
Para cada cliente:
- ✅ Nome completo
- ✅ Endereço (rua + número)
- ✅ Bairro
- ✅ Referência (quando disponível)
- ✅ Usuário PPPoE (corrigido)
- ✅ Código de serviço
- ✅ Valores de sinal (RX MÉDIA|TX MÉDIA|RX POWER|TX POWER)

## 🛠️ Desenvolvimento

### Comandos Úteis

\`\`\`bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Construir para produção
npm run build

# Executar em produção
npm start

# Verificar tipos TypeScript
npm run type-check

# Formatar código
npm run format
\`\`\`

### Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **pdf-parse** - Processamento de PDF
- **Lucide React** - Ícones

## 🐛 Solução de Problemas

### Erro: "Module not found: pdf-parse"
\`\`\`bash
npm install pdf-parse
\`\`\`

### Erro: "File too large"
Aumente o limite no `next.config.js`:
\`\`\`javascript
module.exports = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
\`\`\`

### PDF não é processado corretamente
1. Verifique se o PDF não está protegido
2. Confirme se o formato do relatório está correto
3. Teste com o texto extraído manualmente

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique a seção de solução de problemas
2. Abra uma issue no GitHub
3. Entre em contato com o suporte técnico

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🔄 Atualizações

### Versão 1.0.0
- ✅ Processamento básico de PDF
- ✅ Correção de emails
- ✅ Organização por prioridade
- ✅ Interface web responsiva

### Próximas Versões
- 🔄 Processamento em lote
- 🔄 Filtros avançados
- 🔄 Exportação para Excel
- 🔄 Relatórios estatísticos
