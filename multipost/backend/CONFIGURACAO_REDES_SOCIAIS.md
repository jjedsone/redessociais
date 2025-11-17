# 📱 Guia Completo de Configuração das Redes Sociais

Este guia explica passo a passo como configurar o backend para conectar com YouTube, Instagram e TikTok.

---

## 📋 Índice

1. [Configuração Geral](#configuração-geral)
2. [YouTube](#youtube)
3. [Instagram](#instagram)
4. [TikTok](#tiktok)
5. [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## 🔧 Configuração Geral

### 1. Criar arquivo `.env`

No diretório `backend/`, crie um arquivo `.env` com as seguintes variáveis:

```env
# Servidor
PORT=4000
SESSION_SECRET=seu-secret-aleatorio-aqui
DEFAULT_PASSWORD=admin123

# YouTube
YT_CLIENT_ID=
YT_CLIENT_SECRET=
YT_REDIRECT_URI=http://localhost:4000/oauth2callback
YT_REFRESH_TOKEN=

# Instagram/Facebook
FB_APP_ID=
FB_APP_SECRET=
FB_REDIRECT_URI=http://localhost:4000/auth/instagram/callback
FB_PAGE_ACCESS_TOKEN=
IG_USER_ID=

# TikTok
TT_CLIENT_KEY=
TT_CLIENT_SECRET=
TT_REDIRECT_URI=http://localhost:4000/tiktok/callback
TT_REFRESH_TOKEN=

# Uploads
MAX_UPLOAD_SIZE_MB=512
```

---

## 🎥 YouTube

### Passo 1: Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **YouTube Data API v3**:
   - Vá em **APIs e Serviços > Biblioteca**
   - Procure por "YouTube Data API v3"
   - Clique em **Ativar**

### Passo 2: Criar Credenciais OAuth 2.0

1. Vá em **APIs e Serviços > Credenciais**
2. Clique em **Criar Credenciais > ID do cliente OAuth**
3. Configure a tela de consentimento OAuth (se solicitado):
   - Escolha **Externo** (ou Interno se tiver Workspace)
   - Preencha nome do app, email de suporte, etc.
4. Configure o tipo de aplicativo:
   - **Tipo**: Escolha **Aplicativo para computador** ou **Aplicação Web**
   - **Nome**: Dê um nome (ex: "Multipost Dashboard")
   - **URIs de redirecionamento autorizados**: 
     ```
     http://localhost:4000/oauth2callback
     ```
5. Clique em **Criar**
6. **Copie** o `Client ID` e `Client Secret`

### Passo 3: Configurar `.env`

Adicione as credenciais no arquivo `.env`:

```env
YT_CLIENT_ID=seu-client-id-aqui.apps.googleusercontent.com
YT_CLIENT_SECRET=seu-client-secret-aqui
YT_REDIRECT_URI=http://localhost:4000/oauth2callback
```

### Passo 4: Gerar Refresh Token

1. No terminal, dentro da pasta `backend/`, execute:

```bash
node oauth_helpers.js
```

2. O script vai gerar uma URL. **Copie e cole no navegador**
3. Faça login com a conta Google que deseja usar para publicar no YouTube
4. Autorize o acesso ao YouTube
5. Você será redirecionado para uma página com um `code`
6. **Copie o código** da URL (parâmetro `code=...`)
7. **Cole o código no terminal** quando solicitado
8. O script vai gerar automaticamente o `YT_REFRESH_TOKEN` e adicionar ao `.env`

### ✅ Verificação

Após configurar, você pode verificar o status no painel:
- O status do YouTube aparecerá como **"Conectado"** quando tudo estiver correto

---

## 📸 Instagram

### Passo 1: Criar App no Facebook Developers

1. Acesse [Facebook Developers](https://developers.facebook.com/)
2. Vá em **Meus Apps > Criar App**
3. Escolha o tipo: **Negócios** ou **Outro**
4. Preencha:
   - **Nome do App**: Ex: "Multipost Dashboard"
   - **Email de contato**: Seu email
   - **Finalidade do App**: Escolha conforme sua necessidade
5. Clique em **Criar App**

### Passo 2: Adicionar Produto Instagram

1. No painel do app, procure por **Instagram** na lista de produtos
2. Clique em **Configurar** no produto **Instagram Graph API**
3. Você verá o **App ID** e **App Secret** na página inicial

### Passo 3: Configurar OAuth

1. No menu lateral, vá em **Ferramentas > Instagram > Configurações Básicas**
2. Adicione **URIs de Redirecionamento OAuth Válidos**:
   ```
   http://localhost:4000/auth/instagram/callback
   ```
3. **Salve as alterações**

### Passo 4: Vincular Conta Instagram Profissional

⚠️ **Importante**: Você precisa ter:
- Uma **conta Instagram Profissional** (Business ou Creator)
- Uma **Página do Facebook** vinculada à conta Instagram

1. No menu lateral, vá em **Ferramentas > Instagram > Configurações Básicas**
2. Clique em **Adicionar ou Remover Contas do Instagram**
3. Conecte sua conta Instagram profissional
4. Vincule a uma **Página do Facebook**

### Passo 5: Configurar `.env`

Adicione no `.env`:

```env
FB_APP_ID=seu-app-id-aqui
FB_APP_SECRET=seu-app-secret-aqui
FB_REDIRECT_URI=http://localhost:4000/auth/instagram/callback
```

**Nota**: `FB_PAGE_ACCESS_TOKEN` e `IG_USER_ID` podem ser deixados vazios - eles serão gerados automaticamente pelo fluxo OAuth.

### Passo 6: Conectar via Painel (Método Recomendado)

1. Inicie o backend e frontend
2. Faça login no painel
3. Clique no botão **"Conectar Instagram"**
4. Uma janela popup abrirá pedindo autorização
5. Faça login com sua conta Facebook
6. Selecione a **página vinculada** ao seu Instagram profissional
7. Autorize as permissões solicitadas
8. A janela fechará automaticamente
9. O status mudará para **"Conectado"**

Os tokens serão salvos automaticamente em `backend/tokens/instagram.json`.

### ✅ Verificação

- O status do Instagram aparecerá como **"Conectado a [Nome da Página]"** quando tudo estiver correto

---

## 🎵 TikTok

### Passo 1: Criar App no TikTok for Developers

1. Acesse [TikTok for Developers](https://developers.tiktok.com/)
2. Faça login com sua conta TikTok
3. Vá em **Apps > Criar App**
4. Preencha:
   - **Nome do App**: Ex: "Multipost Dashboard"
   - **Descrição**: Descrição do seu app
   - **Categoria**: Escolha a categoria apropriada
   - **Plataforma**: Escolha conforme sua necessidade
5. Clique em **Criar**

### Passo 2: Configurar Permissões

1. No painel do app, vá em **Gerenciar > Permissões**
2. Solicite acesso às seguintes permissões:
   - **video.upload** (Upload de vídeos)
   - **video.publish** (Publicar vídeos)
3. Aguarde a aprovação (pode levar alguns dias)

### Passo 3: Obter Credenciais

1. No painel do app, vá em **Gerenciar > Credenciais**
2. Você verá:
   - **Client Key** (equivale ao Client ID)
   - **Client Secret**
3. **Copie** essas credenciais

### Passo 4: Configurar Redirect URI

1. No painel do app, vá em **Gerenciar > Configurações**
2. Adicione **Redirect URI**:
   ```
   http://localhost:4000/tiktok/callback
   ```
3. **Salve**

### Passo 5: Obter Refresh Token

O TikTok usa um fluxo OAuth diferente. Você precisa:

1. Construir a URL de autorização:
   ```
   https://www.tiktok.com/v2/auth/authorize/
   ?client_key=SEU_CLIENT_KEY
   &scope=video.upload,video.publish
   &response_type=code
   &redirect_uri=http://localhost:4000/tiktok/callback
   &state=seu-state-aleatorio
   ```

2. Abrir essa URL no navegador
3. Autorizar o app
4. Você será redirecionado para `http://localhost:4000/tiktok/callback?code=...`
5. Trocar o `code` por um `access_token` e `refresh_token`

**Alternativa**: Use a documentação oficial do TikTok para obter o refresh token através do fluxo OAuth completo.

### Passo 6: Configurar `.env`

```env
TT_CLIENT_KEY=seu-client-key-aqui
TT_CLIENT_SECRET=seu-client-secret-aqui
TT_REDIRECT_URI=http://localhost:4000/tiktok/callback
TT_REFRESH_TOKEN=seu-refresh-token-aqui
```

### ✅ Verificação

- O status do TikTok aparecerá como **"Conectado"** quando as credenciais estiverem válidas

---

## 📝 Variáveis de Ambiente - Resumo

### Obrigatórias para YouTube:
- `YT_CLIENT_ID`
- `YT_CLIENT_SECRET`
- `YT_REFRESH_TOKEN` (gerado via `oauth_helpers.js`)

### Obrigatórias para Instagram:
- `FB_APP_ID`
- `FB_APP_SECRET`
- (Tokens são gerados automaticamente via OAuth no painel)

### Obrigatórias para TikTok:
- `TT_CLIENT_KEY`
- `TT_CLIENT_SECRET`
- `TT_REFRESH_TOKEN` (obtido via fluxo OAuth do TikTok)

### Opcionais:
- `PORT` (padrão: 4000)
- `SESSION_SECRET` (recomendado para produção)
- `DEFAULT_PASSWORD` (senha padrão do sistema de autenticação)
- `MAX_UPLOAD_SIZE_MB` (padrão: 512)

---

## 🔒 Segurança

⚠️ **IMPORTANTE**:

1. **Nunca** commite o arquivo `.env` no Git
2. **Nunca** compartilhe suas credenciais
3. Em produção, use variáveis de ambiente do servidor ou um gerenciador de segredos
4. Configure `SESSION_SECRET` com um valor aleatório forte
5. Altere a senha padrão (`DEFAULT_PASSWORD`) em produção

---

## 🐛 Troubleshooting

### YouTube
- **Erro "Invalid credentials"**: Verifique se o refresh token foi gerado corretamente
- **Erro "API not enabled"**: Certifique-se de que a YouTube Data API v3 está ativada

### Instagram
- **Erro "Invalid OAuth"**: Verifique se o redirect URI está correto no Facebook Developers
- **Erro "Page not found"**: Certifique-se de que sua conta Instagram está vinculada a uma página do Facebook

### TikTok
- **Erro "Invalid client"**: Verifique se o Client Key e Secret estão corretos
- **Erro "Permission denied"**: Aguarde a aprovação das permissões no TikTok for Developers

---

## 📚 Recursos Úteis

- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- [TikTok Content Posting API](https://developers.tiktok.com/doc/content-posting-api-overview/)

---

**Última atualização**: Configuração para sistema com autenticação integrada.

