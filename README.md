# Ascension Tecnologias - Site Institucional

Este é o repositório do site institucional da Ascension Tecnologias, desenvolvido com Next.js 14, TypeScript e Tailwind CSS.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- PostgreSQL
- Prisma ORM

## Funcionalidades

- Site institucional responsivo
- Área administrativa protegida
- Gerenciamento de portfólio
- Gerenciamento de orçamentos
- Gerenciamento de equipe
- Animações suaves
- Design moderno e profissional

## Pré-requisitos

- Node.js 18.17 ou superior
- npm ou yarn
- PostgreSQL (para ambiente de desenvolvimento)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Encryptedx00x/Ascension.git
```

2. Instale as dependências:
```bash
cd Ascension
npm install
```

3. Configure o ambiente:
```bash
# No Windows
copy .env.example .env

# No Linux/Mac
cp .env.example .env
```

4. Ajuste as variáveis de ambiente no arquivo `.env` conforme necessário.

5. Execute as migrações e seed do banco de dados:
```bash
# Inicialize o PostgreSQL primeiro
npm run prisma:migrate
npm run seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

7. Acesse o site em `http://localhost:3000`

## Deploy na Netlify

1. Fork este repositório para sua conta do GitHub

2. Configure o banco de dados:
   - Crie uma conta gratuita no [Neon](https://neon.tech/)
   - Crie um novo projeto PostgreSQL
   - Obtenha as credenciais de conexão (URLs)

3. Na Netlify:
   - Crie uma conta e clique em "Add new site" > "Import an existing project"
   - Conecte sua conta GitHub e selecione o repositório
   - Configure as variáveis de ambiente:
     ```
     POSTGRES_PRISMA_URL=postgres://usuario:senha@...
     POSTGRES_URL_NON_POOLING=postgres://usuario:senha@...
     JWT_SECRET=sua_chave_secreta
     ```
   - Clique em "Deploy site"

4. Após o deploy inicial:
   - Acesse o site em `https://seu-site.netlify.app/admin`
   - Faça login com as credenciais padrão:
     - Usuário: `admin`
     - Senha: `admin123`
   - **Importante:** Altere a senha imediatamente após o primeiro login

## Configuração do Banco de Dados para Produção

Já está configurado um banco de dados PostgreSQL no Neon para este projeto. As credenciais são:

```
POSTGRES_PRISMA_URL="postgres://default:6QD0bFRwX6D0@ep-sweet-silence-55465603-pooler.us-east-1.aws.neon.tech/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:6QD0bFRwX6D0@ep-sweet-silence-55465603.us-east-1.aws.neon.tech/verceldb?connect_timeout=15"
```

**IMPORTANTE:** Para uso em produção, você deve criar seu próprio banco de dados e não usar estas credenciais.

## Estrutura do Projeto

```
ascension-site/
├── app/
│   ├── admin/           # Área administrativa
│   ├── api/            # Rotas da API
│   └── ...             # Páginas públicas
├── components/         # Componentes reutilizáveis
├── public/            # Arquivos estáticos
└── ...                # Arquivos de configuração
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera o cliente Prisma, executa migrações e cria a build de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa o linter
- `npm run prisma:migrate`: Cria e executa migrações do banco de dados
- `npm run prisma:generate`: Gera o cliente Prisma
- `npm run prisma:studio`: Abre o Prisma Studio para gerenciar o banco de dados
- `npm run prisma:deploy`: Aplica migrações existentes sem criar novas
- `npm run seed`: Popula o banco de dados com dados iniciais

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Ascension Tecnologias - [contato@ascension.dev](mailto:contato@ascension.dev)

Link do Projeto: [https://github.com/seu-usuario/ascension-site](https://github.com/seu-usuario/ascension-site)
