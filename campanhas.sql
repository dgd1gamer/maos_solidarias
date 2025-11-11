-- Garantir que estamos no schema public
SET search_path TO public;

DROP TABLE IF EXISTS public.campanhas CASCADE;

-- Criar tabela de campanhas no schema public
CREATE TABLE public.campanhas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  categoria TEXT NOT NULL,
  meta NUMERIC(10, 2) NOT NULL DEFAULT 0,
  localizacao TEXT NOT NULL,
  imagem_url TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para busca por categoria
CREATE INDEX idx_campanhas_categoria ON public.campanhas(categoria);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.campanhas ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de campanhas"
  ON public.campanhas FOR SELECT
  USING (true);

-- Política para permitir inserção apenas para usuários autenticados
CREATE POLICY "Permitir inserção para usuários autenticados"
  ON public.campanhas FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir atualização apenas para usuários autenticados
CREATE POLICY "Permitir atualização para usuários autenticados"
  ON public.campanhas FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política para permitir exclusão apenas para usuários autenticados
CREATE POLICY "Permitir exclusão para usuários autenticados"
  ON public.campanhas FOR DELETE
  USING (auth.role() = 'authenticated');

-- Garantir que a tabela está exposta na API (publicação)
GRANT ALL ON public.campanhas TO anon, authenticated, service_role;

NOTIFY pgrst, 'reload schema';
