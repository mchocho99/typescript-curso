// SISTEMA DE PEDIDOS - Ejercicio integrador
// Vas a modelar un sistema simple de pedidos de un e-commerce

// 1. Creá un enum "OrderStatus" con los estados:
//    PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

// 2. Creá un enum "PaymentMethod" con:
//    CREDIT_CARD, DEBIT_CARD, CASH, TRANSFER
enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    CASH = "CASH",
    TRANSFER = "TRANSFER"
}

// 3. Creá una interface "Product" con:
//    id, name, price, stock
interface Product {
    id: number
    name: string,
    price: number,
    stock: boolean
}

// 4. Creá una interface "OrderItem" con:
//    product: Product
//    quantity: number
interface OrderItem {
    product: Product,
    quantity: number
}

// 5. Creá una interface "Order" con:
//    id, items (array de OrderItem), status (OrderStatus),
//    paymentMethod (PaymentMethod), createdAt, totalPrice
interface Order {
    id: number,
    items: OrderItem[],
    status: OrderStatus,
    paymentMethod: PaymentMethod,
    createdAt: Date,
    totalPrice: number
}

// 6. Creá una clase "OrderManager" que tenga:
//    - Una propiedad privada "orders" (array de Order)
//    - Método createOrder(items, paymentMethod) que retorne Order
//    - Método updateStatus(orderId, newStatus) que actualice el estado
//    - Método getOrdersByStatus(status) que filtre órdenes por estado
//    - Método getTotalRevenue() que sume el totalPrice de órdenes DELIVERED
class OrderManager {
    private orders: Order[];

    // Duda: esto tiene que ir? por que si no me dice que orders no esta correctamente inicializado en el constructor
    constructor() {
        this.orders = []
    }

    private getTotalPrice(items: OrderItem[]) : number {
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }

    createOrder(items: OrderItem[], paymentMethod: PaymentMethod) : Order {
        const order : Order = {
            id: Math.floor(Math.random() * 10000),
            items,
            status: OrderStatus.PENDING,
            paymentMethod,
            createdAt: new Date(),
            totalPrice: this.getTotalPrice(items)
        }

        this.orders.push(order)

        return order
    }

    updateStatus(orderId: number, newStatus: OrderStatus) {
        this.orders.forEach((order) => {
            if (order.id === orderId) {
                order.status = newStatus
            }
        })
    }

    getOrderByStatus(status: OrderStatus) : Order[] {
        return this.orders.filter((order) => order.status === status)
    }

    getTotalRevenue() : number {
        let total = 0

        this.orders.forEach((order) => {
            if (order.status === OrderStatus.DELIVERED) {
                total += order.totalPrice
            }
        })

        return total
    }
}

// 7. Creá una función genérica "findById<T>" que:
//    - Reciba un array de elementos con propiedad "id"
//    - Reciba un id a buscar
//    - Retorne el elemento o undefined

function findById<T extends { id: number}>(elements : T[], id : number) : T | undefined {
    return elements.find((element) => element.id === id)
}

// 8. Creá un type "OrderSummary" usando Pick que solo tenga:
//    id, status, totalPrice
type OrderSummary = Pick<Order, "id" | "status" | "totalPrice">

// 9. Creá un type "OrderUpdate" usando Partial de Order
//    (para actualizar órdenes parcialmente)
type OrderUpdate = Partial<Order>

// 10. Creá una función "getOrderSummary(order)" que reciba Order
//     y retorne OrderSummary
function getOrderSummary(order : Order) : OrderSummary {
    return {
        id: order.id,
        status: order.status,
        totalPrice: order.totalPrice
    }
}

// PRUEBAS:
// - Creá algunos productos
// - Instanciá OrderManager
// - Creá 2-3 órdenes con diferentes estados
// - Probá todos los métodos y mostrá resultados con console.log
const banana : Product = {
    id: 1,
    name: "Banana",
    price: 12,
    stock: true
}

const apple : Product = {
    id: 2,
    name: "Manzana",
    price: 8,
    stock: true
}

const waterMelon : Product = {
    id: 3,
    name: "Sandia",
    price: 40,
    stock: false
}

const orderManager : OrderManager = new OrderManager();

const orderItem1 : OrderItem = {
    product: banana,
    quantity: 2
}

const orderItem2 : OrderItem = {
    product: apple,
    quantity: 20
}

const orderItem3 : OrderItem = {
    product: waterMelon,
    quantity: 1
}

const order1 : OrderItem[] = [
    orderItem1, orderItem2
]

const order2 : OrderItem[] = [
    orderItem3
]

orderManager.createOrder(order1, PaymentMethod.CREDIT_CARD);
orderManager.createOrder(order2, PaymentMethod.CASH);

console.log(orderManager.updateStatus(123, OrderStatus.DELIVERED));
console.log(orderManager.getOrderByStatus(OrderStatus.DELIVERED));
console.log(orderManager.getTotalRevenue());
const productList = [banana, apple, waterMelon]
console.log(findById(productList, 123))
const myOrder = orderManager.getOrderByStatus(OrderStatus.DELIVERED);
if (myOrder.length > 0 && myOrder[0] !== undefined) {
    console.log(getOrderSummary(myOrder[0]));
}