# Use a imagem oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm ci --only=production

# Copie o código fonte
COPY . .

# Construa a aplicação
RUN npm run build

# Exponha a porta
EXPOSE 3000

# Defina variáveis de ambiente
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["npm", "start"]
