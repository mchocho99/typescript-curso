class Sorteo<T> {
    ticket?: T;
    buyer: string;

    constructor(buyer : string) {
        this.buyer = buyer
    }

    setTicket(ticket : T) {
        this.ticket = ticket
    }

    buy() : string {
        return `${this.buyer} acaba de comprar el ticket ${this.ticket}`
    }
}

const cincoDeOro = new Sorteo<number> ("Martin")
cincoDeOro.setTicket(213424)

const miSorteo = new Sorteo<string> ("Carlos")
miSorteo.setTicket("A3D12SF1")

cincoDeOro.buy()
miSorteo.buy()
