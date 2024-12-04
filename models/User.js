// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    Nombre: { type: String, required: true },
    Apellido: { type: String, required: true },
    Correo: { type: String, required: true, unique: true },
    Password: { type: String, required: true },  // 'Password' en mayúsculas
    Estatus: { type: String, default: "Activo" },
    Rol: { type: String, default: "Usuario" },
  }, { collection: "dbo_admin_users" });
  

  UserSchema.methods.comparePassword = async function (password) {
    console.log("this en comparePassword:", this, password);
    if (!this.Password) {
        throw new Error("No se encontró el campo 'Password' en el documento");
    }
    return bcrypt.compare(password, this.Password);
};

  

// Middleware para encriptar contraseñas antes de guardar
UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);  // Verifica que 'this.Password' es el campo correcto
    next();
});

  

export default mongoose.models.User || mongoose.model("User", UserSchema);
