#!/bin/bash

echo "🚀 Instalando Sistema de Processamento de Relatórios PDF..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro."
    echo "   Visite: https://nodejs.org/"
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) encontrado"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Instalar pdf-parse para produção
echo "📄 Instalando biblioteca PDF..."
npm install pdf-parse

# Construir aplicação
echo "🔨 Construindo aplicação..."
npm run build

echo "✅ Instalação concluída!"
echo ""
echo "🎉 Para iniciar o sistema:"
echo "   npm run dev    (desenvolvimento)"
echo "   npm start      (produção)"
echo ""
echo "🌐 Acesse: http://localhost:3000"
