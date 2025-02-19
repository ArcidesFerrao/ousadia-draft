import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="about-page items-center">
      <div className="header py-4">
        <div className="about-header-title p-4">
          <h2>Quem somos</h2>
        </div>
        <div className="about-header-details mx-4 flex flex-col gap-4">
          <div className="us-details">
            <p className="us-text text-lg font-thin">
              Ousadia® é uma marca moçambicana de vestuário criada em 2021 que
              produz camisetas pretas com frases temáticas cômicas, de
              motivação, fé e positividade.
            </p>
          </div>
          <div className="foundation-details ">
            <p className="text-lg font-thin">
              Fundada como “Gotti”, passou a se chamar “Ousadia” anos depois,
              inspirada no antigo slogan da marca que era ‘seja ousado’ e também
              no espírito dos moçambicanos que como menciona o hino nacional:
              “pátria bela dos que ousaram lutar…”.
            </p>
          </div>
          <div className="collab-details">
            <p className="about-collection text-lg font-thin">
              A marca orgulha-se pelo trabalho feito em duas coleções lançadas,
              e uma Collab no período 2021 - 2023. Actualmente possui um leque
              de várias camisetas cujos lançamentos são feitos mensalmente desde
              agosto de 2024.
            </p>
            <p className="about-collab text-lg font-thin">
              Com abertura para colaborar com artistas, individualidades e
              jovens criativos moçambicanos, a Ousadia compromete-se a criar uma
              cultura de vestuário casual que não apenas se encaixa na moda, mas
              que também serve de uma forma de comunicação social.
            </p>
          </div>
        </div>
        <div className="about-services py-4">
          <div className="about-header-title p-4">
            <h2>Nossa produção</h2>
          </div>
          <div className="production-details about-header-details mx-4 flex flex-col gap-4">
            <p className="text-lg font-thin">
              Nossas shetas e bonés são confeccionadas com material proveniente
              da Tailândia, e produzidos e estampados em Moçambique por nossas
              máquinas.Valorizamos a produção local, com mão-de-obra justa e
              qualificada.
            </p>
          </div>
        </div>
        <div className="about-footer">
          <div className="about-contact">
            <div className="about-header-title p-4">
              <h2>Onde estamos</h2>
            </div>
            <div className="about-contact-details about-header-details mx-4 flex flex-col gap-4">
              <p className="text-lg font-thin">
                Bairro do Infulene, Av. 04 de Outubro
              </p>

              <p className="flex gap-2 text-lg font-thin">
                Matola - Moçambique
              </p>

              <p className=" flex gap-2 text-lg font-thin">
                <Image
                  src="/assets/mdphone2.png"
                  width={18}
                  height={16}
                  alt="phone"
                />
                +258 845398661
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
