import { Link } from "react-router-dom";
import "./Home.css";

// Todos los textos de esta página salen del Manual de Marca.

// "Viaje emocional": las tres etapas de vivir con una pieza
const etapas = [
  {
    titulo: "Primera impresión",
    texto:
      "Una sensación de calidez y nostalgia te envuelve, como descubrir un tesoro familiar en perfectas condiciones. Hay un reconocimiento inmediato de calidad e intencionalidad.",
    imagen: "/assets/img/Sofá Patagonia.png",
    alt: "Sofá Patagonia",
  },
  {
    titulo: "Conexión más profunda",
    texto:
      "Al explorar más, descubrís los detalles pensados: los materiales sustentables, los principios de diseño atemporal, la historia detrás de cada pieza.",
    imagen: "/assets/img/Escritorio Costa.png",
    alt: "Escritorio Costa",
  },
  {
    titulo: "Impacto duradero",
    texto:
      "Vivir con Hermanos Jota se convierte en parte de tu ritual diario. Cada pieza envejece con gracia, desarrollando carácter mientras mantiene su belleza esencial.",
    imagen: "/assets/img/Butaca Mendoza.png",
    alt: "Butaca Mendoza",
  },
];

// "Principios de abastecimiento"
const principios = [
  "Madera certificada FSC de bosques responsables argentinos",
  "Prioridad a maderas nativas: algarrobo, quebracho, caldén",
  "Solo acabados y adhesivos de bajo COV",
  "Proveedores locales dentro del Gran Buenos Aires",
  "30% mínimo de materiales recuperados o reciclados",
  "Cero plásticos de un solo uso en toda la cadena",
];

// Programa "Herencia Viva"
const herenciaViva = [
  {
    titulo: "Garantía extendida",
    detalle: "10 años en estructura, 5 años en acabados",
  },
  {
    titulo: "Servicio de restauración",
    detalle: "Recuperamos y renovamos piezas antiguas",
  },
  {
    titulo: "Taller de cuidados",
    detalle: "Capacitación gratuita para clientes",
  },
  {
    titulo: "Recompra garantizada",
    detalle: "Hasta 40% del valor en piezas bien cuidadas",
  },
  {
    titulo: "Certificado de trazabilidad",
    detalle: "Origen de cada material utilizado",
  },
];

function Home() {
  return (
    <div className="home">
      {/* Presentación */}
      <section className="home__hero">
        <div className="home__contenedor home__hero-grilla">
          <div>
            <h1>Muebles que alimentan el alma</h1>
            <p className="home__hero-texto">
              Existimos en la intersección entre herencia e innovación, donde la
              calidez del optimismo de los años 60 se encuentra con la
              conciencia de la sustentabilidad del 2026. Cada pieza cuenta una
              historia de artesanía que honra el pasado mientras abraza el
              futuro.
            </p>
            <div className="home__acciones">
              <Link to="/productos" className="btn-carrito home__boton">
                Ver catálogo
              </Link>
              <Link to="/contacto" className="home__enlace">
                Contactanos
              </Link>
            </div>
          </div>

          <div className="home__figura">
            <img
              src="/assets/img/Sillón Copacabana.png"
              alt="Sillón Copacabana, de cuero y madera"
            />
          </div>
        </div>
      </section>

      {/* Viaje emocional */}
      <section className="home__viaje">
        <div className="home__contenedor">
          <h2>No es solo mobiliario, es una filosofía de vida</h2>

          <div className="home__etapas">
            {etapas.map((etapa) => (
              <article key={etapa.titulo} className="home__etapa">
                <img src={etapa.imagen} alt={etapa.alt} loading="lazy" />
                <h3>{etapa.titulo}</h3>
                <p>{etapa.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sustentabilidad y materiales */}
      <section className="home__materiales">
        <div className="home__contenedor">
          <h2>
            Cada pieza cuenta la historia de manos expertas y materiales nobles
          </h2>
          <p className="home__materiales-intro">
            Nuestro compromiso con el medio ambiente y las futuras generaciones
            guía cada decisión en nuestro proceso creativo y productivo.
          </p>

          <div className="home__listas">
            <div>
              <h3>Principios de abastecimiento</h3>
              <ul className="home__lista">
                {principios.map((principio) => (
                  <li key={principio}>{principio}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Programa “Herencia Viva”</h3>
              <ul className="home__lista">
                {herenciaViva.map((item) => (
                  <li key={item.titulo}>
                    <strong>{item.titulo}.</strong> {item.detalle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom y taller */}
      <section className="home__taller">
        <div className="home__contenedor home__taller-grilla">
          <div>
            <h2>Conocé la Casa Taller</h2>
            <p>
              Te recibimos como asesores de confianza y compañeros entusiastas
              del diseño bello y funcional.
            </p>
          </div>

          <div>
            <address className="home__direccion">
              Av. San Juan 2847, barrio de San Cristóbal
              <br />
              Ciudad Autónoma de Buenos Aires
            </address>
            <p>
              Lunes a viernes de 10 a 19 h
              <br />
              Sábados de 10 a 14 h
            </p>
            <Link to="/contacto" className="btn-carrito home__boton">
              Escribinos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
