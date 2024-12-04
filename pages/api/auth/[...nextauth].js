// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoClient } from "mongodb";
// import bcrypt from "bcryptjs";

// const MONGO_URI = process.env.MONGO_URI;

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         correo: { label: "Correo", type: "email" },
//         password: { label: "Contraseña", type: "password" },
//       },
//       async authorize(credentials) {
//         const client = await MongoClient.connect(MONGO_URI, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//         });

//         const db = client.db("Reparaphone_data");
//         const user = await db.collection("dbo_admin_users").findOne({
//           Correo: credentials.correo,
//         });

//         if (user && bcrypt.compareSync(credentials.password, user.Password)) {
//           client.close();
//           return { email: user.Correo, name: user.Nombre, role: user.Rol };
//         }

//         client.close();
//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Página de login personalizada si es necesario
//   },
//   session: {
//     strategy: "jwt", // Puedes configurar también 'database' si quieres usar sesiones basadas en la base de datos
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role; // Guardar el rol en el token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.role = token.role; // Recuperar el rol en la sesión
//       return session;
//     },
//   },
// });


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://admin:%23Ingenierochingon27@reparaphone.yn3bo.mongodb.net/Reparaphone_data";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const client = await MongoClient.connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        const db = client.db("Reparaphone_data");
        const user = await db.collection("dbo_admin_users").findOne({
          Correo: credentials.correo,
        });

        if (user && bcrypt.compareSync(credentials.password, user.Password)) {
          client.close();
          return { email: user.Correo, name: user.Nombre, role: user.Rol };
        }

        client.close();
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // Página de inicio de sesión personalizada
  },
  session: {
    strategy: "jwt", // Puedes usar 'jwt' o 'database' para almacenar la sesión
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Guardar el rol del usuario en el token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role; // Recuperar el rol del token y asignarlo a la sesión
      return session;
    },
  },
});
