#!/bin/bash

# Script para configurar o banco de dados PostgreSQL para o projeto Ascension

# Verifique se o PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL não está instalado. Por favor, instale antes de continuar."
    exit 1
fi

# Defina as variáveis
DB_NAME="ascension"
DB_USER="postgres"
DB_PASSWORD="postgres"

# Crie o banco de dados
echo "Criando banco de dados $DB_NAME..."
psql -U postgres -c "CREATE DATABASE $DB_NAME;" || echo "Banco de dados já existe ou erro na criação."

# Execute as migrações do Prisma
echo "Executando migrações do Prisma..."
npx prisma migrate deploy

# Execute o seed para popular o banco com dados iniciais
echo "Populando o banco de dados com dados iniciais..."
npm run seed

echo "Configuração do banco de dados concluída!"
echo "URL de conexão: postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME?schema=public" 