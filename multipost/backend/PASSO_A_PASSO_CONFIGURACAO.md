# 📋 Passo a Passo Completo - Como Preencher o .env

Este guia mostra **exatamente** onde encontrar cada informação e como preencher o arquivo `.env`.

---

## 🎯 Visão Geral

Você precisa configurar 3 plataformas:
1. **YouTube** (Google Cloud Console)
2. **Instagram** (Facebook Developers)
3. **TikTok** (TikTok for Developers)

**Tempo estimado**: 30-60 minutos (dependendo da aprovação das APIs)

---

## 🎥 PARTE 1: CONFIGURAR YOUTUBE

### Passo 1.1: Acessar Google Cloud Console

1. Abra seu navegador e acesse: **https://console.cloud.google.com/**
2. Faça login com sua conta Google (a mesma que você usa no YouTube)

### Passo 1.2: Criar ou Selecionar Projeto

1. No topo da página, clique no **menu de projetos** (ao lado do logo do Google Cloud)
2. Clique em **"Novo Projeto"**
3. Preencha:
   - **Nome do projeto**: `Multipost Dashboard` (ou qualquer nome)
   - **Organização**: Deixe padrão
4. Clique em **"Criar"**
5. Aguarde alguns segundos e selecione o projeto criado

### Passo 1.3: Ativar YouTube Data API v3

1. No menu lateral esquerdo, clique em **"APIs e Serviços"** > **"Biblioteca"**
2. Na barra de pesquisa, digite: **"YouTube Data API v3"**
3. Clique no resultado **"YouTube Data API v3"**
4. Clique no botão azul **"ATIVAR"**
5. Aguarde a confirmação (pode levar alguns segundos)

### Passo 1.4: Criar Credenciais OAuth 2.0

1. Ainda em **"APIs e Serviços"**, clique em **"Credenciais"** (menu lateral esquerdo)
2. Se aparecer uma tela de consentimento OAuth:
   - Clique em **"Configurar tela de consentimento"**
   - Escolha **"Externo"** e clique em **"Criar"**
   - Preencha:
     - **Nome do app**: `Multipost Dashboard`
     - **Email de suporte**: Seu email
     - **Email de contato do desenvolvedor**: Seu email
   - Clique em **"Salvar e Continuar"** nas próximas telas até concluir
3. Volte para **"Credenciais"**
4. Clique em **"Criar Credenciais"** > **"ID do cliente OAuth"**
5. Se solicitado, escolha **"Configurar tela de consentimento"** e complete (ou pule se já fez)
6. Configure o cliente OAuth:
   - **Tipo de aplicativo**: Escolha **"Aplicativo para computador"** ou **"Aplicação Web"**
   - **Nome**: `Multipost Dashboard`
   - **URIs de redirecionamento autorizados**: Clique em **"Adicionar URI"** e digite:
     ```
     http://localhost:4000/oauth2callback
     ```
7. Clique em **"Criar"**
8. **IMPORTANTE**: Uma janela popup aparecerá com suas credenciais:
   - **ID do cliente**: Copie este valor (algo como: `123456789-abc.apps.googleusercontent.com`)
   - **Segredo do cliente**: Clique em **"Mostrar"** e copie este valor

### Passo 1.5: Preencher .env com Credenciais do YouTube

1. Abra o arquivo `.env` em `backend/.env`
2. Encontre a seção **YOUTUBE**
3. Preencha:
   ```env
   YT_CLIENT_ID=cole-aqui-o-id-do-cliente
   YT_CLIENT_SECRET=cole-aqui-o-segredo-do-cliente
   ```
   **Exemplo**:
   ```env
   YT_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
   YT_CLIENT_SECRET=GOCSPX-abc123def456ghi789
   ```

### Passo 1.6: Gerar Refresh Token do YouTube

1. Abra o terminal/PowerShell na pasta `backend`
2. Execute:
   ```bash
   node oauth_helpers.js
   ```
3. O script vai mostrar uma URL como:
   ```
   Acesse esta URL para autorizar:
   https://accounts.google.com/o/oauth2/v2/auth?client_id=...
   ```
4. **Copie toda a URL** e cole no navegador
5. Faça login com a conta Google que você quer usar para publicar no YouTube
6. Clique em **"Permitir"** ou **"Allow"**
7. Você será redirecionado para uma página com um código na URL
8. **Copie o código** da URL (ele vem depois de `code=`)
   - Exemplo: Se a URL for `http://localhost:4000/oauth2callback?code=4/0A...`, copie `4/0A...`
9. Volte ao terminal e **cole o código** quando solicitado
10. Pressione **Enter**
11. O script vai adicionar automaticamente o `YT_REFRESH_TOKEN` no seu `.env`

✅ **YouTube configurado!**

---

## 📸 PARTE 2: CONFIGURAR INSTAGRAM

### Passo 2.1: Acessar Facebook Developers

1. Abra seu navegador e acesse: **https://developers.facebook.com/**
2. Faça login com sua conta Facebook

### Passo 2.2: Criar App

1. No canto superior direito, clique em **"Meus Apps"**
2. Clique em **"Criar App"** (botão verde)
3. Escolha o tipo: **"Negócios"** ou **"Outro"**
4. Preencha:
   - **Nome do app**: `Multipost Dashboard`
   - **Email de contato**: Seu email
5. Clique em **"Criar App"**
6. Complete o captcha se solicitado

### Passo 2.3: Adicionar Produto Instagram

1. No painel do app, procure por **"Instagram"** na lista de produtos
2. Clique em **"Configurar"** no produto **"Instagram Graph API"**
3. Você verá uma página de boas-vindas

### Passo 2.4: Obter App ID e App Secret

1. No menu lateral esquerdo, clique em **"Configurações"** > **"Básicas"**
2. Você verá:
   - **ID do App**: Copie este número (ex: `123456789012345`)
   - **Chave secreta do app**: Clique em **"Mostrar"** e copie (ex: `abc123def456ghi789jkl012`)

### Passo 2.5: Configurar Redirect URI

1. Ainda em **"Configurações"** > **"Básicas"**, role até **"Instagram App ID"**
2. Se não aparecer, vá em **"Ferramentas"** > **"Instagram"** > **"Configurações Básicas"**
3. Procure por **"URIs de Redirecionamento OAuth Válidos"**
4. Clique em **"Adicionar URI"**
5. Digite:
   ```
   http://localhost:4000/auth/instagram/callback
   ```
6. Clique em **"Salvar alterações"**

### Passo 2.6: Preencher .env com Credenciais do Instagram

1. Abra o arquivo `.env`
2. Encontre a seção **INSTAGRAM**
3. Preencha:
   ```env
   FB_APP_ID=cole-aqui-o-id-do-app
   FB_APP_SECRET=cole-aqui-a-chave-secreta
   ```
   **Exemplo**:
   ```env
   FB_APP_ID=123456789012345
   FB_APP_SECRET=abc123def456ghi789jkl012
   ```

### Passo 2.7: Verificar Conta Instagram Profissional

⚠️ **IMPORTANTE**: Você precisa ter:
- Uma conta Instagram **Profissional** (Business ou Creator)
- Uma **Página do Facebook** vinculada à conta Instagram

**Como verificar/converter**:
1. Abra o app Instagram no celular
2. Vá em **Configurações** > **Conta** > **Mudar para conta profissional**
3. Siga as instruções para criar uma conta profissional
4. Vincule a uma Página do Facebook (ou crie uma nova)

### Passo 2.8: Conectar Instagram via Painel (Após iniciar o servidor)

1. Inicie o backend: `npm run dev`
2. Inicie o frontend: `npm run dev` (em outro terminal)
3. Acesse `http://localhost:5173`
4. Faça login (admin/admin123)
5. No card do Instagram, clique em **"Conectar Instagram"**
6. Uma janela popup abrirá
7. Faça login com sua conta Facebook
8. Selecione a **página vinculada** ao seu Instagram profissional
9. Autorize as permissões
10. A janela fechará automaticamente
11. O status mudará para **"Conectado"**

✅ **Instagram configurado!** (Os tokens são salvos automaticamente)

---

## 🎵 PARTE 3: CONFIGURAR TIKTOK

### Passo 3.1: Acessar TikTok for Developers

1. Abra seu navegador e acesse: **https://developers.tiktok.com/**
2. Faça login com sua conta TikTok

### Passo 3.2: Criar App

1. No menu superior, clique em **"Apps"**
2. Clique em **"Criar App"** ou **"Get Started"**
3. Preencha o formulário:
   - **App Name**: `Multipost Dashboard`
   - **Description**: `Dashboard para publicação em múltiplas redes sociais`
   - **Category**: Escolha uma categoria (ex: "Media")
   - **Platform**: Escolha conforme sua necessidade
4. Aceite os termos e clique em **"Submit"** ou **"Criar"**

### Passo 3.3: Solicitar Permissões

1. No painel do app, vá em **"Manage"** > **"Permissions"** ou **"Gerenciar"** > **"Permissões"**
2. Procure por:
   - **video.upload** (Upload de vídeos)
   - **video.publish** (Publicar vídeos)
3. Clique em **"Request"** ou **"Solicitar"** para cada permissão
4. ⚠️ **AGUARDE APROVAÇÃO** (pode levar alguns dias)
   - Você receberá um email quando for aprovado

### Passo 3.4: Obter Credenciais

1. No painel do app, vá em **"Manage"** > **"Credentials"** ou **"Gerenciar"** > **"Credenciais"**
2. Você verá:
   - **Client Key**: Copie este valor (ex: `abc123def456ghi789`)
   - **Client Secret**: Clique em **"Show"** ou **"Mostrar"** e copie (ex: `xyz789uvw456rst123`)

### Passo 3.5: Configurar Redirect URI

1. No painel do app, vá em **"Manage"** > **"Settings"** ou **"Gerenciar"** > **"Configurações"**
2. Procure por **"Redirect URI"** ou **"Callback URL"**
3. Adicione:
   ```
   http://localhost:4000/tiktok/callback
   ```
4. Clique em **"Save"** ou **"Salvar"**

### Passo 3.6: Preencher .env com Credenciais do TikTok

1. Abra o arquivo `.env`
2. Encontre a seção **TIKTOK**
3. Preencha:
   ```env
   TT_CLIENT_KEY=cole-aqui-o-client-key
   TT_CLIENT_SECRET=cole-aqui-o-client-secret
   ```
   **Exemplo**:
   ```env
   TT_CLIENT_KEY=abc123def456ghi789
   TT_CLIENT_SECRET=xyz789uvw456rst123
   ```

### Passo 3.7: Obter Refresh Token do TikTok

O TikTok requer um fluxo OAuth manual. Siga estes passos:

1. Construa a URL de autorização substituindo `SEU_CLIENT_KEY`:
   ```
   https://www.tiktok.com/v2/auth/authorize/
   ?client_key=SEU_CLIENT_KEY
   &scope=video.upload,video.publish
   &response_type=code
   &redirect_uri=http://localhost:4000/tiktok/callback
   &state=random123
   ```

2. Abra essa URL no navegador (substitua `SEU_CLIENT_KEY` pelo valor real)
3. Faça login e autorize o app
4. Você será redirecionado para `http://localhost:4000/tiktok/callback?code=...`
5. **Copie o código** da URL (o valor depois de `code=`)

6. Troque o código por tokens fazendo uma requisição POST:
   ```bash
   curl -X POST "https://open-api.tiktok.com/oauth/access_token/" \
     -d "client_key=SEU_CLIENT_KEY" \
     -d "client_secret=SEU_CLIENT_SECRET" \
     -d "code=CODIGO_COPIADO" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=http://localhost:4000/tiktok/callback"
   ```

7. A resposta conterá `access_token` e `refresh_token`
8. Copie o `refresh_token` e adicione no `.env`:
   ```env
   TT_REFRESH_TOKEN=cole-aqui-o-refresh-token
   ```

**Alternativa**: Use ferramentas como Postman ou Insomnia para fazer a requisição.

✅ **TikTok configurado!**

---

## 📝 RESUMO DO ARQUIVO .env PREENCHIDO

Após seguir todos os passos, seu `.env` deve estar assim:

```env
# ============================================
# CONFIGURACAO DO SERVIDOR
# ============================================
PORT=4000
SESSION_SECRET=multipost-secret-key-change-in-production
DEFAULT_PASSWORD=admin123

# ============================================
# YOUTUBE - YouTube Data API v3
# ============================================
YT_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
YT_CLIENT_SECRET=GOCSPX-abc123def456ghi789
YT_REDIRECT_URI=http://localhost:4000/oauth2callback
YT_REFRESH_TOKEN=1//0abc123def456ghi789jkl012mno345pqr678stu901vwx234yz

# ============================================
# INSTAGRAM - Instagram Graph API
# ============================================
FB_APP_ID=123456789012345
FB_APP_SECRET=abc123def456ghi789jkl012
FB_REDIRECT_URI=http://localhost:4000/auth/instagram/callback
FB_PAGE_ACCESS_TOKEN=
IG_USER_ID=

# ============================================
# TIKTOK - TikTok Content Posting API
# ============================================
TT_CLIENT_KEY=abc123def456ghi789
TT_CLIENT_SECRET=xyz789uvw456rst123
TT_REDIRECT_URI=http://localhost:4000/tiktok/callback
TT_REFRESH_TOKEN=refresh_token_aqui_do_tiktok

# ============================================
# CONFIGURACOES DE UPLOAD
# ============================================
MAX_UPLOAD_SIZE_MB=512
```

---

## ✅ CHECKLIST FINAL

Marque cada item conforme completar:

### YouTube
- [ ] Projeto criado no Google Cloud Console
- [ ] YouTube Data API v3 ativada
- [ ] Credenciais OAuth criadas
- [ ] `YT_CLIENT_ID` preenchido no `.env`
- [ ] `YT_CLIENT_SECRET` preenchido no `.env`
- [ ] `YT_REFRESH_TOKEN` gerado via `oauth_helpers.js`

### Instagram
- [ ] App criado no Facebook Developers
- [ ] Produto Instagram Graph API adicionado
- [ ] Redirect URI configurado
- [ ] `FB_APP_ID` preenchido no `.env`
- [ ] `FB_APP_SECRET` preenchido no `.env`
- [ ] Conta Instagram profissional verificada
- [ ] Conectado via painel (tokens gerados automaticamente)

### TikTok
- [ ] App criado no TikTok for Developers
- [ ] Permissões solicitadas e aprovadas
- [ ] `TT_CLIENT_KEY` preenchido no `.env`
- [ ] `TT_CLIENT_SECRET` preenchido no `.env`
- [ ] Redirect URI configurado
- [ ] `TT_REFRESH_TOKEN` obtido e preenchido no `.env`

---

## 🚀 Próximos Passos

Após preencher todas as credenciais:

1. **Salve o arquivo `.env`**
2. **Reinicie o servidor backend**:
   ```bash
   npm run dev
   ```
3. **Acesse o painel**: `http://localhost:5173`
4. **Faça login**: admin / admin123
5. **Verifique os status** de cada plataforma no painel

---

## 🆘 Precisa de Ajuda?

- **YouTube**: Consulte [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- **Instagram**: Consulte [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- **TikTok**: Consulte [TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-overview/)

---

**Boa sorte com a configuração! 🎉**

