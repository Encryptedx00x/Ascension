# Script para configurar o banco de dados PostgreSQL para o projeto Ascension no Windows

# Defina as variáveis
$DB_NAME = "ascension"
$DB_USER = "postgres"
$DB_PASSWORD = "postgres"

# Verifique se o PostgreSQL está instalado
try {
    $psqlVersion = Invoke-Expression "psql --version"
    Write-Host "PostgreSQL encontrado: $psqlVersion"
} catch {
    Write-Host "PostgreSQL não está instalado ou não está no PATH. Por favor, instale antes de continuar."
    exit 1
}

# Crie o banco de dados
Write-Host "Criando banco de dados $DB_NAME..."
try {
    Invoke-Expression "psql -U postgres -c 'CREATE DATABASE $DB_NAME;'"
} catch {
    Write-Host "Banco de dados já existe ou erro na criação."
}

# Execute as migrações do Prisma
Write-Host "Executando migrações do Prisma..."
Invoke-Expression "npx prisma migrate deploy"

# Execute o seed para popular o banco com dados iniciais
Write-Host "Populando o banco de dados com dados iniciais..."
Invoke-Expression "npm run seed"

Write-Host "Configuração do banco de dados concluída!"
Write-Host "URL de conexão: postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME?schema=public" 