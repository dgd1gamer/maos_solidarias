import { useState } from "react";
import { Button } from "@/components/primitives/button";
import { InputFloat } from "@/components/primitives/input/input";
import { Title } from "@/components/primitives/title";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    "e-mail": "",
    celular: "",
    assunto: "",
    mensagem: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData["e-mail"],
          celular: formData.celular,
          assunto: formData.assunto,
          mensagem: formData.mensagem,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Mensagem enviada com sucesso!" });
        // Limpar formulário
        setFormData({
          nome: "",
          "e-mail": "",
          celular: "",
          assunto: "",
          mensagem: "",
        });
      } else {
        setMessage({ type: "error", text: data.message || "Erro ao enviar mensagem." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao enviar mensagem. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container-xl row row-cols-lg-2 mx-auto align-content-center my-5">
      <section className="order-lg-1">
        <Title marginTop="0">Envie sua mensagem!</Title>

        {message.text && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <form id="contact" className="my-3" onSubmit={handleSubmit}>
          <InputFloat
            type="text"
            id="nome"
            name="nome"
            placeholder=""
            information="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <InputFloat
            type="email"
            id="e-mail"
            name="e-mail"
            placeholder=""
            information="E-mail"
            value={formData["e-mail"]}
            onChange={handleChange}
            required
          />
          <InputFloat
            type="text"
            id="celular"
            name="celular"
            placeholder=""
            information="Celular"
            value={formData.celular}
            onChange={handleChange}
          />
          <InputFloat
            type="text"
            id="assunto"
            name="assunto"
            placeholder=""
            information="Assunto"
            value={formData.assunto}
            onChange={handleChange}
          />

          <div className="form-floating input-float my-1">
            <textarea
              className="form-control"
              id="mensagem"
              name="mensagem"
              placeholder="Sua mensagem aqui..."
              value={formData.mensagem}
              onChange={handleChange}
              required
            ></textarea>

            <label className="label-float" htmlFor="mensagem">
              Mensagem
            </label>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <Button
              type="submit"
              customWidth
              className="btn-primary btn-login fw-medium"
              aria-label="Enviar"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </section>
      <section className="order-lg-0">
        <div>
          <div className="fw-bold">Endereço</div>
          <p>R. Francisco Urquiza Machado, 462, Meladão, Floriano - PI</p>
        </div>
        <div>
          <div className="fw-bold">Telefone</div>
          <p>(86) 9.9801-7727</p>
        </div>
        <div>
          <div className="fw-bold">E-mail</div>
          <p>relacionamento@maossolidarias.org</p>
        </div>
        <div>
          <iframe
            frameBorder="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.8446651799663!2d-43.045885625004615!3d-6.788748993208414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7837ce957b790cb%3A0xd0da9c79db163198!2sInstituto%20Federal%20de%20Educa%C3%A7%C3%A3o%2C%20Ci%C3%AAncia%20e%20Tecnologia%20do%20Piau%C3%AD%20-%20Campus%20Floriano!5e0!3m2!1spt-BR!2sbr!4v1761875597938!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Contato;
