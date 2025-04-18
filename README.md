# Ascension Tecnologias - Site Institucional

Este é o repositório do site institucional da Ascension Tecnologias, desenvolvido com Next.js 14, TypeScript, Tailwind CSS e PostgreSQL.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- PostgreSQL (Neon)
- Prisma ORM

## Funcionalidades

- Site institucional responsivo
- Área administrativa protegida
- Gerenciamento de portfólio
- Gerenciamento de orçamentos
- Gerenciamento de equipe
- Animações suaves
- Design moderno e profissional

## ✅ Configuração de Deploy

Este projeto está completamente configurado para deploy na Netlify com PostgreSQL. Siga os passos:

1. Fork este repositório para sua conta do GitHub

2. Na Netlify:
   - Crie uma conta e clique em "Add new site" > "Import an existing project"
   - Conecte sua conta GitHub e selecione o repositório
   - Configurações de build estarão presentes no `netlify.toml`
   - Não é necessário alterar nada, apenas seguir para o próximo passo

3. Configurações de ambiente:
   - Todas as variáveis de ambiente necessárias já estão configuradas no arquivo `.env`
   - O banco de dados PostgreSQL já está configurado no Neon
   - O JWT Secret já está definido e é seguro

4. Clique em "Deploy site"

5. Após o deploy:
   - Acesse `https://seu-site.netlify.app/admin`
   - Faça login com as credenciais iniciais (definidas no seed):
     - Usuário: `admin`
     - Senha: `admin123`
   - **Altere a senha imediatamente após o primeiro login**

## Desenvolvimento Local

Se desejar desenvolver localmente:

1. Clone o repositório:
```bash
git clone https://github.com/Encryptedx00x/Ascension.git
```

2. Instale as dependências:
```bash
cd Ascension
npm install
```

3. Execute as migrações:
```bash
npx prisma migrate dev
```

4. Inicie o servidor:
```bash
npm run dev
```

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Ascension Tecnologias - [contato@ascension.dev](mailto:contato@ascension.dev)

Link do Projeto: [https://github.com/seu-usuario/ascension-site](https://github.com/seu-usuario/ascension-site)
