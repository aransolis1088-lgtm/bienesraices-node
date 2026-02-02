import bcrypt from 'bcrypt';


const usuarios = [
    {
        nombre: "Juan Perez",
        email: "juan@juan.com",
        confirmado: true,
        password: bcrypt.hashSync("111111", 10)

    }
];

export default usuarios;