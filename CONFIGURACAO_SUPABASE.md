# Configuração do Supabase para Autenticação

## Passo a passo para configurar o login com Supabase

### 1. Criar projeto no Supabase

1. Acesse https://supabase.com
2. Crie uma conta gratuita ou faça login
3. Clique em "New Project"
4. Preencha:
   - **Name**: Mãos Solidárias (ou outro nome)
   - **Database Password**: Escolha uma senha forte
   - **Region**: Escolha a região mais próxima (ex: South America - São Paulo)
5. Clique em "Create new project"
6. Aguarde alguns minutos enquanto o projeto é criado

### 2. Obter as chaves da API

1. No painel do projeto, vá em **Settings** (ícone de engrenagem no menu lateral)
2. Clique em **API**
3. Você encontrará:
   - **Project URL**: Sua URL do Supabase (ex: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public key**: Sua chave pública anônima (começa com `eyJ...`)

### 3. Configurar providers OAuth (Google e Facebook)

#### Configurar Google OAuth:

1. No painel do Supabase, vá em **Authentication** > **Providers**
2. Encontre **Google** e clique para ativar
3. Você precisará criar credenciais OAuth no Google Cloud Console:
   - Acesse https://console.cloud.google.com
   - Crie um novo projeto ou selecione um existente
   - Vá em **APIs & Services** > **Credentials**
   - Clique em **Create Credentials** > **OAuth client ID**
   - Tipo: **Web application**
   - **Authorized redirect URIs**: Adicione `https://seu-projeto.supabase.co/auth/v1/callback`
   - Copie o **Client ID** e **Client Secret**
4. Volte ao Supabase e cole os valores nos campos correspondentes
5. Clique em **Save**

#### Configurar Facebook OAuth:

1. No painel do Supabase, vá em **Authentication** > **Providers**
2. Encontre **Facebook** e clique para ativar
3. Você precisará criar um app no Facebook Developers:
   - Acesse https://developers.facebook.com
   - Vá em **My Apps** > **Create App**
   - Escolha **Consumer** como tipo de app
   - Vá em **Settings** > **Basic** e adicione:
     - **Site URL**: `https://seu-projeto.supabase.co`
     - **Valid OAuth Redirect URIs**: `https://seu-projeto.supabase.co/auth/v1/callback`
   - Vá em **Settings** > **Advanced** e ative **OAuth Login**
   - Copie o **App ID** e **App Secret**
4. Volte ao Supabase e cole os valores nos campos correspondentes
5. Clique em **Save**

### 4. Configurar variáveis de ambiente

Crie ou edite o arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_public_key_aqui

# Resend (se ainda não configurou)
RESEND_API_KEY=re_sua_chave_aqui
EMAIL_DESTINO=relacionamento@maossolidarias.org
```

**Importante:**
- Substitua `https://seu-projeto.supabase.co` pela URL do seu projeto
- Substitua `sua_chave_anon_public_key_aqui` pela chave anon public que você copiou
- As variáveis do Supabase **devem** começar com `NEXT_PUBLIC_` para funcionar no cliente

### 5. Configurar URLs de redirecionamento

No painel do Supabase:

1. Vá em **Authentication** > **URL Configuration**
2. Adicione nas **Redirect URLs**:
   - `http://localhost:3000/**` (para desenvolvimento)
   - `https://seudominio.com/**` (para produção)
   - `https://seudominio.com` (para produção, sem o /**)

### 6. Reiniciar o servidor

```bash
npm run dev
```
