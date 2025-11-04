import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Erro ao processar autenticação:', error);
        router.push('/login?error=auth_failed');
        return;
      }

      if (data.session) {
        // Sucesso! Redirecionar para a página inicial
        router.push('/');
      } else {
        // Sem sessão, redirecionar para login
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column'
    }}>
      <div>Processando autenticação...</div>
    </div>
  );
}
