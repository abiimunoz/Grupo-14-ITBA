export function idProducto(producto) {
  return producto?._id ?? producto?.id;
}

export function rutaImagen(imagen) {
  if (!imagen) {
    return "";
  }

  return imagen.startsWith("/") || imagen.startsWith("http")
    ? imagen
    : `/${imagen}`;
}

export const PRODUCTO_VACIO = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  imagenUrl: "",
  categoria: "",
};

export function productoAFormulario(producto) {
  if (!producto) {
    return PRODUCTO_VACIO;
  }

  return {
    nombre: producto.nombre ?? "",
    descripcion: producto.descripcion ?? "",
    precio: producto.precio ?? "",
    stock: producto.stock ?? "",
    imagenUrl: producto.imagenUrl || producto.imagen || "",
    categoria: producto.categoria ?? "",
  };
}
