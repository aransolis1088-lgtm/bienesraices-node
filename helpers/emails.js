import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;

  //Enviar el email
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Confirma tu cuenta en BienesRaices.com",
    text: "Confirma tu cuenta en BienesRaices.com",
    html: `<p>Hola ${nombre}, confirma tu cuenta en BienesRaices.com</p>
               <p>Tu cuenta ya esta casi lista, solo debes confirmarla en el siguiente enlace:
               <a href="${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a></p>
               <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`,
  });
};

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { nombre, email, token } = datos;

  //Enviar el email
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Reestablece tu password en BienesRaices.com",
    text: "Reestablece tu password en BienesRaices.com",
    html: `<p>Hola ${nombre}, has solicitado reestablecer tu password en BienesRaices.com</p>
                <p>Sigue el siguiente enlace para generar un nuevo password:<a href="${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT ?? 3000}/auth/reset-password/${token}">Reestablecer Password</a></p>
                <p>Si tu no solicitaste este cambio, puedes ignorar este mensaje</p>`,
  });
};

export { emailRegistro, emailOlvidePassword };
