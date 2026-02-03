// 1. Crear type Role: solo puede ser "admin", "user" o "guest"
type Role = "admin" | "user" | "guest"

// 2. Crear type User con:
//    - id: number
//    - name: string
//    - email: string
//    - isActive: boolean
//    - role: Role
//    - createdAt: Date
type User = {
    id: number,
    name: string,
    email: string,
    isActive: boolean,
    role: Role,
    createdAt: Date
}

// 3. Función createUser(name, email, role) que:
//    - Recibe name, email, role
//    - Genera id con Math.floor(Math.random() * 10000)
//    - Genera createdAt con new Date()
//    - Retorna un User completo
function createUser(name: string, email: string, role: Role) : User {
    const user : User = {
        id: Math.floor(Math.random() * 10000),
        name,
        email,
        isActive: true,
        role,
        createdAt: new Date()
    }

    return user;
}

// 4. Función formatUserInfo(user) que:
//    - Recibe un User
//    - Retorna string con formato: "Name (role) - email"
function formatUserInfo(user: User) : string {
    return `${user.name} (${user.role}) - ${user.email}`
}

// 5. Crear 3 usuarios con createUser y mostrar su info con console.log
const user1 = createUser("Martin", "martin@mail.com", "admin")
const user2 = createUser("Antonella", "antonella@mail.com", "guest")
const user3 = createUser("Carlos", "carlos@mail.com", "user")

console.log(formatUserInfo(user1))
console.log(formatUserInfo(user2))
console.log(formatUserInfo(user3))