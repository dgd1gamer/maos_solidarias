import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
   return (
      <footer className="section bg-footer py-5">
         <div className="container">
            <div className="row align-items-start text-center text-lg-start">
               <Logo />
               <Categories />
               <Access />
               <Contacts />
            </div>
         </div>
         <Copyright />
      </footer>
   );
};

const Logo = () => (
   <div className="col-lg-3 col-md-6 col-12 logo-footer mb-4 mb-lg-0 text-center text-lg-start">
      <Image
         src="/assets/logo-footer.png"
         width={180}
         height={180}
         alt="Mãos Solidárias"
      />
   </div>
);

const Categories = () => {
   const categories = [
      { name: "Secas", href: "/eventos/secas" },
      { name: "Enchentes", href: "/eventos/enchentes" },
      { name: "Incêndios", href: "/eventos/incendios" },
      { name: "Deslizamentos", href: "/eventos/deslizamentos" },
   ];

   return (
      <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
         <h6 className="footer-heading text-uppercase fw-bold">Categorias</h6>
         <ul className="list-unstyled footer-link mt-4">
            {categories.map((category) => (
               <li key={category.name} className="mb-2">
                  <Link
                     href={category.href}
                     className="text-decoration-none text-muted"
                  >
                     {category.name}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
};

const Access = () => {
   const access = [
      { name: "Cadastrar", href: "/criar-conta" },
      { name: "Acessar conta", href: "/login" },
      { name: "Termos e Condições", href: "#" },
      { name: "Política de Privacidade", href: "#" },
   ];

   return (
      <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
         <h6 className="footer-heading text-uppercase fw-bold">Acessos</h6>
         <ul className="list-unstyled footer-link mt-4">
            {access.map((acc) => (
               <li key={acc.name} className="mb-2">
                  <Link
                     href={acc.href}
                     className="text-decoration-none text-muted"
                  >
                     {acc.name}
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
};

const Contacts = () => (
   <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
      <h6 className="footer-heading text-uppercase fw-bold">Contatos</h6>
      <div className="mt-4 d-flex flex-column gap-1 text-muted">
         <span>relacionamento@maossolidarias.org</span>
         <span>(86) 9.9801-7727</span>
      </div>

      {/* Ícones ao lado dos contatos */}
      <div className="d-flex align-items-center gap-3 mt-3">
         <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-muted fs-4"
         >
            <i className="fab fa-youtube"></i>
         </a>
         <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted fs-4"
         >
            <i className="fab fa-instagram"></i>
         </a>
         <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-muted fs-4"
         >
            <i className="fab fa-facebook"></i>
         </a>
      </div>
   </div>
);

const Copyright = () => (
   <div className="text-center mt-5">
      <p className="footer-alt mb-0 f-14 text-muted">
         2025 © Mãos Solidárias, Todos direitos reservados.
      </p>
   </div>
);
