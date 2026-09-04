/* Catálogo de productos como array de objetos.

   Cada producto tiene una lista `specs` (label/valor) en vez de
   campos fijos, porque cada mueble tiene atributos distintos
*/

const productos = [
  {
    id: 1,
    nombre: "Aparador Uspallata",
    categoria: "Almacenaje",
    precio: 420000,
    imagen: "assets/img/Aparador Uspallata.jpg",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en " +
      "acabado latón. Su silueta minimalista realza el veteado natural de la madera, " +
      "creando una pieza que combina funcionalidad y elegancia atemporal para espacios " +
      "contemporáneos.",
    specs: [
      { label: "Medidas", valor: "180 × 45 × 75 cm" },
      { label: "Materiales", valor: "Nogal macizo FSC®, herrajes de latón" },
      { label: "Acabado", valor: "Aceite natural ecológico" },
      { label: "Peso", valor: "68 kg" },
      { label: "Capacidad", valor: "6 compartimentos interiores" },
    ],
  },
  {
    id: 2,
    nombre: "Biblioteca Recoleta",
    categoria: "Almacenaje",
    precio: 260000,
    imagen: "assets/img/Biblioteca Recoleta.jpg",
    descripcion:
      "Sistema modular de estantes abierto que combina estructura de acero Sage Green y " +
      "repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño " +
      "versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    specs: [
      { label: "Medidas", valor: "100 × 35 × 200 cm" },
      { label: "Materiales", valor: "Estructura de acero, estantes de roble" },
      { label: "Acabado", valor: "Laca mate ecológica" },
      { label: "Capacidad", valor: "45 kg por estante" },
      { label: "Modulares", valor: "5 estantes ajustables" },
    ],
  },
  {
    id: 3,
    nombre: "Butaca Mendoza",
    categoria: "Living",
    precio: 210000,
    imagen: "assets/img/Butaca Mendoza.jpg",
    descripcion:
      "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo " +
      "curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico " +
      "aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    specs: [
      { label: "Medidas", valor: "80 × 75 × 85 cm" },
      { label: "Materiales", valor: "Guatambú macizo, tela bouclé" },
      { label: "Acabado", valor: "Cera vegetal, tapizado premium" },
      { label: "Tapizado", valor: "Repelente al agua y manchas" },
      { label: "Confort", valor: "Espuma alta densidad" },
    ],
  },
  {
    id: 4,
    nombre: "Sillón Copacabana",
    categoria: "Living",
    precio: 245000,
    imagen: "assets/img/Sillón Copacabana.jpg",
    descripcion:
      "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado " +
      "en la estética brasilera moderna de los 60, combina comodidad excepcional con un " +
      "diseño icónico que trasciende tendencias y épocas.",
    specs: [
      { label: "Medidas", valor: "90 × 85 × 95 cm" },
      { label: "Materiales", valor: "Cuero curtido vegetal, acero pintado" },
      { label: "Acabado", valor: "Cuero anilina premium" },
      { label: "Rotación", valor: "360° silenciosa y suave" },
      { label: "Garantía", valor: "10 años en estructura" },
    ],
  },
  {
    id: 5,
    nombre: "Mesa de Centro Araucaria",
    categoria: "Living",
    precio: 195000,
    imagen: "assets/img/Mesa de Centro Araucaria.jpg",
    descripcion:
      "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en " +
      "madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto " +
      "para cualquier sala de estar contemporánea, combinando la frialdad del mármol " +
      "con la calidez de la madera.",
    specs: [
      { label: "Medidas", valor: "90 × 90 × 45 cm" },
      {
        label: "Materiales",
        valor: "Sobre de mármol Patagonia, patas de nogal",
      },
      { label: "Acabado", valor: "Mármol pulido, aceite natural en madera" },
      { label: "Peso", valor: "42 kg" },
      { label: "Carga máxima", valor: "25 kg distribuidos" },
    ],
  },
  {
    id: 6,
    nombre: "Mesa de Noche Aconcagua",
    categoria: "Dormitorio",
    precio: 110000,
    imagen: "assets/img/Mesa de Noche Aconcagua.jpg",
    descripcion:
      "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su " +
      "diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, " +
      "ofreciendo almacenamiento discreto y elegante para objetos personales.",
    specs: [
      { label: "Medidas", valor: "45 × 35 × 60 cm" },
      { label: "Materiales", valor: "Roble macizo FSC®, herrajes soft-close" },
      { label: "Acabado", valor: "Barniz mate de poliuretano" },
      { label: "Almacenamiento", valor: "1 cajón + repisa inferior" },
      { label: "Características", valor: "Cajón con cierre suave" },
    ],
  },
  {
    id: 7,
    nombre: "Sofá Patagonia",
    categoria: "Living",
    precio: 480000,
    imagen: "assets/img/Sofá Patagonia.jpg",
    descripcion:
      "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. " +
      "Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo " +
      "comodidad duradera y sostenible para el hogar moderno.",
    specs: [
      { label: "Medidas", valor: "220 × 90 × 80 cm" },
      { label: "Estructura", valor: "Madera de eucalipto certificada FSC®" },
      { label: "Tapizado", valor: "Lino 100% natural premium" },
      { label: "Relleno", valor: "Espuma HR + plumón reciclado" },
      { label: "Sostenibilidad", valor: "Materiales 100% reciclables" },
    ],
  },
  {
    id: 8,
    nombre: "Mesa Comedor Pampa",
    categoria: "Comedor",
    precio: 390000,
    imagen: "assets/img/Mesa Comedor Pampa.jpg",
    descripcion:
      "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. " +
      "Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes " +
      "celebraciones familiares, extendiéndose de 6 a 10 comensales.",
    specs: [
      { label: "Medidas", valor: "160-240 × 90 × 75 cm" },
      { label: "Materiales", valor: "Roble macizo FSC®, mecanismo alemán" },
      { label: "Acabado", valor: "Aceite-cera natural" },
      { label: "Capacidad", valor: "6-10 comensales" },
      { label: "Extensión", valor: "Sistema de mariposa central" },
    ],
  },
  {
    id: 9,
    nombre: "Sillas Córdoba",
    categoria: "Comedor",
    precio: 150000,
    imagen: "assets/img/Sillas Córdoba.jpg",
    descripcion:
      "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura " +
      "tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad " +
      "garantizan comodidad y durabilidad en el uso diario, perfectas para comedores " +
      "contemporáneos.",
    specs: [
      { label: "Medidas", valor: "45 × 52 × 80 cm (cada una)" },
      { label: "Materiales", valor: "Contrachapado nogal, tubo de acero" },
      { label: "Acabado", valor: "Laca mate, pintura epoxi" },
      { label: "Apilables", valor: "Hasta 6 sillas" },
      { label: "Incluye", valor: "Set de 4 sillas" },
    ],
  },
  {
    id: 10,
    nombre: "Escritorio Costa",
    categoria: "Oficina",
    precio: 175000,
    imagen: "assets/img/Escritorio Costa.jpg",
    descripcion:
      "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú " +
      "laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna " +
      "con estética minimalista y sostenible, perfecto para el trabajo remoto.",
    specs: [
      { label: "Medidas", valor: "120 × 60 × 75 cm" },
      { label: "Materiales", valor: "Bambú laminado, herrajes ocultos" },
      { label: "Acabado", valor: "Laca mate resistente" },
      { label: "Almacenamiento", valor: "1 cajón con organizador" },
      { label: "Cables", valor: "Pasacables integrado" },
    ],
  },
  {
    id: 11,
    nombre: "Silla de Trabajo Belgrano",
    categoria: "Oficina",
    precio: 165000,
    imagen: "assets/img/Silla de Trabajo Belgrano.jpg",
    descripcion:
      "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento " +
      "tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo " +
      "confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
    specs: [
      { label: "Medidas", valor: "60 × 60 × 90-100 cm" },
      { label: "Materiales", valor: "Malla técnica, tejido reciclado" },
      { label: "Acabado", valor: "Base cromada, tapizado premium" },
      { label: "Regulación", valor: "Altura + inclinación respaldo" },
      { label: "Certificación", valor: "Ergonomía europea EN 1335" },
    ],
  },
];
