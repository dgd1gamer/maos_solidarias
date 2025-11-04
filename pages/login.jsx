import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/primitives/button";
import Image from "next/image";
import { Title } from "@/components/primitives/title";
import { InputFloat } from "@/components/primitives/input/input";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      setMessage({ type: "success", text: "Login realizado com sucesso!" });
      router.push("/");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Erro ao fazer login. Verifique suas credenciais.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
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
        text: error.message || `Erro ao fazer login com ${provider}.`,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid" id="container-main">
      <div className="row">
        <div className="col-lg-5 col-sm-12 create" aria-label="Área de login">
          <Link href="/">
            <Image
              className="logo"
              src="/assets/maos.png"
              width={56}
              height={56}
              alt="Mãos Solidárias"
            />
          </Link>
          <Title>Entrar</Title>
          <p>Selecione a forma de acesso:</p>
          <div className="box-social-media">
            <button
              className="button-media"
              onClick={() => handleSocialLogin("google")}
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
              onClick={() => handleSocialLogin("facebook")}
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
          <p>ou continue com seu e-mail cadastrado</p>

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

          <form onSubmit={handleEmailLogin}>
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

            <div className="remember-me">
              <div className="form-check form-check-inline checkbox-payment">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="check-payment"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="check-payment">
                  Lembre-me
                </label>
              </div>
              <Link href="/recuperar-senha">
                <p style={{ cursor: "pointer" }}>Esqueci minha senha</p>
              </Link>
            </div>
            <Button
              type="submit"
              customWidth
              className="btn-primary btn-login fw-medium"
              aria-label="Fazer log-in"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="account">
            Não tem uma conta?
            <Link href="/criar-conta" className="link">
              <p className="acc-crt-exs"> Criar uma nova conta</p>
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

export default Login;
