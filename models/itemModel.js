import mongoose from 'mongoose';

const { Schema } = mongoose;

// Definición del esquema para el contacto del proveedor
const ContactInfoSchema = new Schema({
    phone: { type: String, required: true },
    email: { type: String, required: true },
});

// Definición del esquema para el proveedor
const SupplierSchema = new Schema({
    name: { type: String, required: true },
    contact_info: { type: ContactInfoSchema, required: true },
});

// Definición del esquema para el año del modelo
const YearSchema = new Schema({
    year: { type: Number, required: true },
});

// Definición del esquema para el modelo
const ModelSchema = new Schema({
    name: { type: String, required: true },
    year: { type: YearSchema, required: true },
});

// Definición del esquema para la marca
const BrandSchema = new Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
});

// Definición del esquema principal para el item
const ItemSchema = new Schema({
    part_name: { type: String, required: true },
    brand: { type: BrandSchema, required: true },
    model: { type: ModelSchema, required: true },
    part_number: { type: String, required: true },
    compatibility: { type: [String], required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    warranty: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    supplier: { type: SupplierSchema, required: true },
    images: { type: [String], required: true },
});

// Exportar el modelo
export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
