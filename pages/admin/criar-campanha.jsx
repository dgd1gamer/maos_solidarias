import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/button";
import Image from "next/image";
import { Title } from "@/components/primitives/title";
import { InputFloat } from "@/components/primitives/input/input";
import { supabase } from "@/lib/supabase";

const CriarCampanha = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    meta: "",
    localizacao: "",
    imagemUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { data, error } = await supabase
        .from("campanhas")
        .insert([
          {
            titulo: formData.titulo,
            descricao: formData.descricao,
            categoria: formData.categoria,
            meta: parseFloat(formData.meta) || 0,
            localizacao: formData.localizacao,
            imagem_url: formData.imagemUrl || null,
          },
        ])
        .select();

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Campanha criada com sucesso!",
      });

      // Limpar formulário
      setFormData({
        titulo: "",
        descricao: "",
        categoria: "",
        meta: "",
        localizacao: "",
        imagemUrl: "",
      });
    } catch (error) {
      console.error("Erro ao criar campanha:", error);
      
      let errorMessage = "Erro ao criar campanha. Tente novamente.";
      
      if (error.code === 'PGRST205') {
        errorMessage = "Tabela não encontrada. Execute o SQL no Supabase";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid" id="container-main">
      <div className="row">
        <div className="col-lg-12 admin-container">
          <div className="admin-header">
            <Link href="/">
              <Image
                className="logo"
                src="/assets/maos.png"
                width={56}
                height={56}
                alt="Mãos Solidárias"
              />
            </Link>
            <Title marginTop="1.5rem">Painel de Administração</Title>
            <p className="admin-subtitle">Criar Nova Campanha de Doação</p>
          </div>

          {message.text && (
            <div
              className={`alert ${
                message.type === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <InputFloat
              type="text"
              name="titulo"
              placeholder="Título da Campanha"
              information="Título da Campanha"
              value={formData.titulo}
              onChange={handleChange}
              required
            />

            <InputFloat
              type="text"
              name="categoria"
              placeholder="Categoria"
              information="Categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            />

            <div className="form-floating my-3">
              <textarea
                className="form-control"
                id="descricao"
                name="descricao"
                placeholder="Descrição da Campanha"
                style={{ height: "120px" }}
                value={formData.descricao}
                onChange={handleChange}
                required
              />
              <label htmlFor="descricao">Descrição da Campanha</label>
            </div>

            <InputFloat
              type="number"
              name="meta"
              placeholder="Meta de Arrecadação (R$)"
              information="Meta de Arrecadação (R$)"
              value={formData.meta}
              onChange={handleChange}
              required
            />

            <InputFloat
              type="text"
              name="localizacao"
              placeholder="Localização"
              information="Localização"
              value={formData.localizacao}
              onChange={handleChange}
              required
            />

            <InputFloat
              type="url"
              name="imagemUrl"
              placeholder="URL da Imagem"
              information="URL da Imagem (opcional)"
              value={formData.imagemUrl}
              onChange={handleChange}
            />

            <div className="admin-actions">
              <Button
                type="submit"
                customWidth
                className="btn-primary btn-admin fw-medium"
                aria-label="Criar Campanha"
                disabled={isLoading}
              >
                {isLoading ? "Criando..." : "Criar Campanha"}
              </Button>
              <Link href="/">
                <Button
                  type="button"
                  className="btn-secondary btn-admin-cancel fw-medium"
                  aria-label="Cancelar"
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CriarCampanha;

