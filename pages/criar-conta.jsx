import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { Button } from '@/components/primitives/button';
import Image from 'next/image';
import { Title } from "@/components/primitives/title";
import { InputFloat } from "@/components/primitives/input/input";
import { supabase } from "@/lib/supabase";

const CriarConta = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já está logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/");
      }
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem." });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: "error", text: "A senha deve ter pelo menos 6 caracteres." });
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Conta criada com sucesso! Verifique seu email para confirmar a conta.",
      });

      // Limpar formulário
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Erro ao criar conta. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider) => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || `Erro ao fazer cadastro com ${provider}.`,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid" id="container-main">
      <div className="row">
        <div className="col-lg-5 col-sm-12 create">
          <Link href="/">
            <Image
              className="logo"
              src="/assets/maos.png"
              width={56}
              height={56}
              alt="Mãos Solidárias"
            />
          </Link>
          <Title>Crie sua conta!</Title>
          <p>Cadastre-se com uma rede:</p>
          <div className="box-social-media">
            <button
              className="button-media"
              onClick={() => handleSocialSignUp("google")}
              disabled={isLoading}
            >
              <Image
                className="icon-media-gmail"
                src="/assets/gmail.png"
                width={20}
                height={20}
                alt="logo gmail"
              />
              <p>Google</p>
            </button>
            <button
              className="button-media"
              onClick={() => handleSocialSignUp("facebook")}
              disabled={isLoading}
            >
              <Image
                className="icon-media-facebook"
                src="/assets/facebook.png"
                width={20}
                height={20}
                alt="logo facebook"
              />
              <p>Facebook</p>
            </button>
          </div>
          <p>ou cadastre-se com um email:</p>

          {message.text && (
            <div
              className={`alert ${
                message.type === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
              style={{ marginTop: "1rem" }}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleEmailSignUp}>
            <InputFloat
              type="email"
              name="email"
              placeholder="Seu E-mail"
              information="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <InputFloat
              type="password"
              name="password"
              placeholder="Sua senha"
              information="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <InputFloat
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              information="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="remember-me">
              <div className="form-check form-check-inline checkbox-payment">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="check-payment"
                  checked={receiveUpdates}
                  onChange={(e) => setReceiveUpdates(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="check-payment">
                  Receber nossas atualizações
                </label>
              </div>
            </div>
            <Button
              type="submit"
              customWidth
              className="btn-primary btn-login fw-medium"
              aria-label="Criar conta"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <div className="account">
            <Link href="/login" className="link">
              <p className="acc-crt-exs">Já tenho uma conta!</p>
            </Link>
          </div>
        </div>

        <div className="col-lg-7 col-sm-12 bg-success box-image">
          <h2>Juntos, transformamos</h2>
          <h2>dor em esperança!</h2>
          <p>Acesse sua conta agora para acompanhar suas doações!</p>
        </div>
      </div>
    </div>
  );
};

export default CriarConta;
 