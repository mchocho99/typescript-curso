// 1. Convertí el type User a interface (investigá la diferencia)
type Role = "admin" | "user" | "guest"

interface User {
    id: number,
    name: string,
    email: string,
    isActive: boolean,
    role: Role,
    createdAt: Date
}

// 2. Creá una interface Product con:
//    - id: number
//    - name: string
//    - price: number
//    - category: "electronics" | "clothing" | "food"
//    - inStock: boolean
//    - tags?: string[]  (opcional)
interface Product {
    id: number,
    name: string,
    price: number,
    category: "electronics" | "clothing" | "food",
    inStock: boolean,
    tags?: string[]
}

// 3. Creá una función createProduct que reciba los datos
//    necesarios y retorne un Product completo
//    Tip: investigá Omit<> o los parámetros opcionales
function createProduct(name: string, price: number, category: "electronics" | "clothing" | "food", inStock: boolean, tags?: string[]): Product {
    const product : Product = {
        id: Math.floor(Math.random() * 10000),
        name,
        price,
        category,
        inStock,
        ...(tags && { tags })
    }

    return product
}

// 4. Creá una función getProductSummary(product) que retorne:
//    "Product: [name] - $[price] ([category])"
function getProductSummary(product: Product) : string {
    return `Product: ${product.name} - $${product.price} (${product.category})`
}

// 5. Creá 3 productos (uno sin tags, dos con tags) y mostrá sus summaries
const product1 = createProduct("Iphone", 12234, "electronics", true);
const product2 = createProduct("T-shirt", 12, "clothing", false, ["new", "summer"]);
const product3 = createProduct("Burguer", 13, "food", true, ["MC Donalds"]);

// 6. BONUS: Creá una función filterByCategory(products, category)
//    que reciba un array de productos y una categoría,
//    y retorne solo los productos de esa categoría
function filterByCategory(products : Product[], category : "electronics" | "clothing" | "food") : Product[] {
    return products.filter((product) => product.category === category)
}