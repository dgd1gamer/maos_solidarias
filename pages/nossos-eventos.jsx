import { EventCard } from "@/components/composed/event-card";
import Image from "next/image"; // Importado para uso em Categories

const Events = () => {
   // Array de objetos contendo nome e caminho da imagem
   const EventCategories = [
      { name: "Alagamentos", imagePath: "/assets/alagamentos.png" }, // Mude para .png ou .svg conforme o formato que você salvou
      { name: "Deslizamentos", imagePath: "/assets/deslizamentos.png" },
      { name: "Enchentes", imagePath: "/assets/enchentes.png" },
      { name: "Incêndios", imagePath: "/assets/incendios.png" },
      { name: "Secas", imagePath: "/assets/secas.png" },
      { name: "Outros", imagePath: "/assets/outros.png" },
   ];

   return (
      <main className="container-xl row mx-auto text-center text-lg-start content-main">
         <h1 className="text-center my-4 fw-bold">Nossos eventos</h1>
         <p className="fs-4 text-center mb-4">
            A plataforma Mãos Solidárias mobiliza ajuda para as mais diversas categorias de desastres naturais que afetam o nosso país. Clique em um dos tipos de evento abaixo para ver as campanhas ativas, o impacto gerado e as necessidades específicas de cada local.
         </p>
         <div className="d-flex justify-content-around">
            {EventCategories.map((category) => (
               // CORREÇÃO: Passando as propriedades individuais (name, imagePath)
               <Categories
                  key={category.name}
                  name={category.name}
                  imagePath={category.imagePath}
               />
            ))}
         </div>
         <Cards />
      </main>
   );
};

// Componente Categories agora recebe 'name' e 'imagePath'
const Categories = ({ name, imagePath }) => {
   return (
      <a href="#" className="event-category">
         <Image
            src={imagePath}
            alt={`Ícone de ${name}`}
            width={60}
            height={60}
            className="category-icon"
         />
         <span>{name}</span> {/* Renderiza o nome recebido */}
      </a>
   );
};

const Cards = () => {
   const events = [
      {
         title: "Incêndio em Poços de Caldas",
         description: "Contribua com o que puder para sanar os danos",
         img: "incendio_01.jpg",
         goal: 100,
         donated: 50,
      },
      {
         title: "Incêndio na Comunidade",
         description: "Faça uma doação agora e ajude as comunidades afetadas",
         img: "incendio_02.jpg",
         goal: 100,
         donated: 50,
      },
      {
         title: "Ajude o Cerrado",
         description: "Faça uma doação agora e ajude as comunidades afetadas",
         img: "incendio_03.jpg",
         goal: 100,
         donated: 50,
      },
      {
         title: "Apoie a Natureza",
         description: "Faça uma doação agora e ajude as comunidades afetadas",
         img: "incendio_04.jpg",
         goal: 100,
         donated: 50,
      },
      {
         title: "Ajude vítimas na Bahia",
         description: "Faça uma doação agora e ajude as comunidades afetadas",
         img: "incendio_05.jpeg",
         goal: 100,
         donated: 50,
      },
      {
         title: "Não abandone SP",
         description: "Faça uma doação agora e ajude as comunidades afetadas",
         img: "incendio_06.png",
         goal: 100,
         donated: 50,
      },
      {
         title: "#ContraQueimadas",
         description: "Faça uma doação agora e ajude as comunidades afetadas",
         img: "incendio_07.jpg",
         goal: 100,
         donated: 50,
         
      },
      {
         title: "Ajude o Pará",
         description: "Faça uma doação agora e ajude as comunidades afetadas",
         img: "incendio_08.jpg",
         goal: 100,
         donated: 50,
         
      },
   ];

   return (
      <section id="events" className="container-xl mx-auto my-4">
         <div className="row row-cols-auto gap-4 justify-content-evenly my-5">
            {events.map((event) => (
               <EventCard
                  key={event.title}
                  title={event.title}
                  description={event.description}
                  img={event.img}
                  alt={event.title}
                  href="/evento/evento-exemplo"
                  goal={event.goal}
                  donated={event.donated}
               >
                  {event.description}
               </EventCard>
            ))}
         </div>
      </section>
   );
};

export default Events;
