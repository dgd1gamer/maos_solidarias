export default function Incendios() {
    return (
        <div className="container py-5">
            <h1 className="text-3xl fw-bold text-center text-primary mb-4">
                Ajude as Vítimas dos Incêndios
            </h1>

            <p className="text-center text-muted mb-5">
                Os incêndios florestais e urbanos destroem lares, comunidades e ecossistemas inteiros.
                Sua doação ajuda a reconstruir vidas e apoiar as famílias atingidas.
            </p>

            <div className="text-center">
                <a
                    href="https://api.whatsapp.com/send?phone=86998017727&text=Agradecemos%20imensamente%20por%20sua%20generosidade%20e%20por%20se%20juntar%20a%20n%C3%B3s%20nesta%20causa%20vital.%20Sua%20chave%20Pix%20para%20a%20doa%C3%A7%C3%A3o%20%C3%A9%3A%20celso.the%40gmail.com.%20Cada%20contribui%C3%A7%C3%A3o%20se%20transforma%20em%20suporte%20real%20e%20imediato%20para%20as%20fam%C3%ADlias%20e%20indiv%C3%ADduos%20afetados%20por%20desastres%20naturais.%20Juntos%2C%20podemos%20levar%20esperan%C3%A7a%20e%20ajuda%20a%20quem%20mais%20precisa."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-main"
                >
                    Doar agora
                </a>
            </div>
        </div>
    );
}
