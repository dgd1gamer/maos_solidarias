import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { nome, email, celular, assunto, mensagem } = req.body;

    // Validação básica
    if (!nome || !email || !mensagem) {
      return res.status(400).json({ 
        message: 'Por favor, preencha todos os campos obrigatórios.' 
      });
    }

    const emailDestino = process.env.EMAIL_DESTINO || 'relacionamento@maossolidarias.org';

    const data = await resend.emails.send({
      from: 'Formulário Contato <onboarding@resend.dev>',
      to: [emailDestino],
      replyTo: email,
      subject: assunto ? `Contato: ${assunto}` : 'Nova mensagem de contato',
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Celular:</strong> ${celular || 'Não informado'}</p>
        <p><strong>Assunto:</strong> ${assunto || 'Não informado'}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ 
      message: 'Email enviado com sucesso!',
      id: data.id 
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ 
      message: 'Erro ao enviar email. Tente novamente mais tarde.' 
    });
  }
}
