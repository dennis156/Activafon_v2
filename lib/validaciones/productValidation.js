import * as yup from "yup";

const productSchema = yup.object().shape({
  part_name: yup.string().required("El nombre de la parte es obligatorio"),
  brand: yup.object({
    name: yup.string().required("El nombre de la marca es obligatorio"),
    logo: yup.string().url("El logo debe ser una URL válida"),
  }),
  model: yup.object({
    name: yup.string().required("El modelo es obligatorio"),
    year: yup.number().integer().min(2000, "El año debe ser mayor a 2000"),
  }),
  part_number: yup.string().required("El número de parte es obligatorio"),
  price: yup.number().required("El precio es obligatorio"),
  stock: yup.number().integer().required("El stock es obligatorio"),
  category: yup.string().required("La categoría es obligatoria"),
});

export default productSchema;
