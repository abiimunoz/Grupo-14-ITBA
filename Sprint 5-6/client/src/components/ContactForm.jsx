import { useState } from "react";

const ESTADO_INICIAL = {
  nombre: "",
  email: "",
  mensaje: "",
};

function ContactForm() {
  const [formulario, setFormulario] = useState(ESTADO_INICIAL);
  const [exito, setExito] = useState(false);

  const handleChange = (evento) => {
    const { name, value } = evento.target;

    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    console.log("Datos de contacto enviados:", formulario);

    setExito(true);
    setFormulario(ESTADO_INICIAL);

    setTimeout(() => {
      setExito(false);
    }, 4000);
  };

  return (
    <section className="contacto-section pagina">
      <div className="contacto-header">
        <h1>Contacto</h1>
        <p>
          ¿Tenés alguna consulta sobre nuestros productos o necesitás
          asesoramiento? Completá el formulario y nos comunicamos a la
          brevedad.
        </p>
      </div>

      <form className="formulario-contacto" onSubmit={handleSubmit}>
        <div className="campo-formulario">
          <label htmlFor="nombre">
            Nombre completo <span className="campo-requerido">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre y apellido"
            value={formulario.nombre}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="email">
            Correo electrónico <span className="campo-requerido">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@email.com"
            value={formulario.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="mensaje">
            Mensaje <span className="campo-requerido">*</span>
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            placeholder="Escribí tu consulta acá..."
            value={formulario.mensaje}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-enviar">
          Enviar mensaje
        </button>
      </form>

      {exito ? (
        <div className="mensaje-exito" role="status" aria-live="polite">
          <p className="mensaje-exito-icono" aria-hidden="true">
            &#10003;
          </p>
          <h2>¡Mensaje enviado!</h2>
          <p>
            Gracias por contactarte. Nos comunicaremos con vos a la brevedad.
          </p>
        </div>
      ) : null}
    </section>
  );
}

export default ContactForm;
