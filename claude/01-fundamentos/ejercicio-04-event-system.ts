// SISTEMA DE EVENTOS - Ejercicio integrador avanzado
// Una plataforma de eventos (conferencias, workshops, meetups)

// ============ PARTE 1: Tipos base ============

// 1. Creá un template literal type "EventId" que sea `event_${string}`
//    Ejemplo válido: "event_abc123"
type EventId = `event_${string}`

// 2. Creá un template literal type "UserId" que sea `user_${number}`
//    Ejemplo válido: "user_42"
type UserId = `user_${number}`

// 3. Creá una interface "BaseEntity" con:
//    - readonly id: string
//    - readonly createdAt: Date
interface BaseEntity {
    readonly id : string,
    readonly createdAt : Date
}

// 4. Usando intersection types, creá un type "Speaker" que combine
//    BaseEntity con: name, bio, topics (array de strings)
type Speaker = BaseEntity & { name: string, bio : string, topics : string[] }

// 5. Creá un discriminated union "Event" con tres tipos:
//    - Conference: type: "conference", speakers: Speaker[], tracks: number
//    - Workshop: type: "workshop", instructor: Speaker, maxParticipants: number
//    - Meetup: type: "meetup", sponsor?: string, isOnline: boolean
//    Todos deben tener además: id (EventId), title, date, price
type Conference = {
    type : "conference",
    speakers : Speaker[],
    tracks : number
}

type Workshop = {
    type : "workshop",
    instructor : Speaker,
    maxParticipants : number
}

type Meetup = {
    type : "meetup",
    sponsor? : string,
    isOnline : boolean
}

type Event = {
    id : EventId,
    title : string,
    date : Date,
    price : number
} & (Conference | Workshop | Meetup)

// ============ PARTE 2: Type Guards ============

// 6. Creá type guards (funciones que retornan "x is Tipo"):
//    - isConference(event): verifica si es Conference
//    - isWorkshop(event): verifica si es Workshop
//    - isMeetup(event): verifica si es Meetup
function isConference(event : Event | Conference) : event is Conference {
    return event.type === "conference"
}

function isWorkshop(event : Event | Workshop) : event is Workshop {
    return event.type === "workshop"
}

function isMeetup(event : Event | Meetup) : event is Meetup {
    return event.type === "meetup"
}

// 7. Creá una función "getEventDetails(event: Event): string" que use
//    los type guards para retornar info específica según el tipo:
//    - Conference: "Conference: [title] - [tracks] tracks, [speakers.length] speakers"
//    - Workshop: "Workshop: [title] - by [instructor.name], max [maxParticipants] people"
//    - Meetup: "Meetup: [title] - [online/presencial], sponsor: [sponsor o 'ninguno']"
function getEventDetails(event : Event) : string {
    if (isConference(event)) {
        return `Conference: ${event.title} - ${event.tracks} tracks, ${event.speakers.length} speakers`
    }

    if (isWorkshop(event)) {
        return `Workshop: ${event.title} by ${event.instructor.name}, max ${event.maxParticipants} people`
    }

    if (isMeetup(event)) {
        return `Meetup: ${event.title} - ${event.isOnline ? "online" : "presencial"}, sponsor: ${event.sponsor ? event.sponsor : "ninguno"}`
    }

    return ""
}

// ============ PARTE 3: Utility Types y Mapped Types ============

// 8. Usando keyof, creá un type "EventKeys" con todas las keys de Conference
// Si podes dame un ejemplo de como quedaria que este no me quedo claro
type EventKeys = keyof Conference

// 9. Usando Pick, creá "EventSummary" con solo: id, title, date, type
type EventSummary = Pick<Event, "id" | "title" | "date" | "type" >

// 10. Usando Omit, creá "CreateConferenceInput" que sea Conference sin id ni createdAt
type CreateConferenceInput = Omit<Event, "id"> & { type : "conference"}

// 11. Usando Record, creá "EventRegistry" donde la key es EventId y el value es Event
type EventRegistry = Record<EventId, Event>

// 12. Usando Partial y Required, creá:
//     - "UpdateEventInput": todos los campos de Event opcionales
//     - "ValidatedEvent": todos los campos de Event requeridos (sin opcionales)
type UpdateEventInput = Partial<Event>
type ValidatedEvent = Required<Event>

// 13. Creá un mapped type "ReadonlyEvent<T>" que haga todas las propiedades
//     de T readonly
// Este no lo entendi bien
type ReadonlyEvent<T> = {
    readonly [P in keyof T] : T[P]
}

// ============ PARTE 4: Funciones avanzadas ============

// 14. Creá una función genérica con callback:
//     filterEvents<T extends Event>(events: T[], predicate: (event: T) => boolean): T[]
function filterEvents<T extends Event> (events : T[], predicate : (event : T) => boolean) : T[] {
    return events.filter(predicate);
}

// 15. Usando ReturnType, creá un type "FilterResult" que sea el tipo
//     de retorno de filterEvents
// te pido un ejemplo de como quedaria FilterResult
type FilterResult = ReturnType<typeof filterEvents>

// 16. La plataforma recibe datos de eventos desde una API externa en formato JSON.
//     Necesitás una función "processEvent" que:
//
//     - Reciba data de tipo unknown (no sabés qué viene de la API)
//     - Valide que sea un Event real antes de usarlo
//     - Según el tipo de evento, calcule el precio final:
//         - Conference: precio base + ($10 por cada speaker)
//         - Workshop: precio base + ($5 si tiene más de 10 participantes max)
//         - Meetup: gratis si es online, sino precio base
//     - Retorne el string: "Precio final: $[monto]"
//     - Si llega un tipo de evento que no conocés, el código no debería compilar
//       (esto te obliga a manejar todos los casos con never)
//     - Si la data no es un Event válido, lanzá un error

function isEvent(event : unknown) : event is Event {
    if (typeof event === "object" && event !== null) {
        if ("type" in event) {
            const type = event.type

            if (type === "conference" || type === "meetup" || type === "workshop") {
                return true
            }
        }
    }

    return false
}


function processEvent(data : unknown) : string {
   if (isEvent(data)) {
    let finalPrice = data.price;

    switch(data.type) {
        case "conference": 
            finalPrice = finalPrice + (10 * data.speakers.length)
        break
        case "workshop": 
            if (data.maxParticipants > 10) {
                finalPrice += 5
            }
        break
        case "meetup": 
            if (data.isOnline) {
                finalPrice = 0;
            }
        break  
        default:
            const neverClause : never = data
            throw new Error(`Data no puede ser ${neverClause}`)

    }

    return `Precio final ${finalPrice}`
   }

   throw new Error("data tiene que ser un Evento valido")
}

// ============ PARTE 5: Pruebas ============

// - Creá 1 speaker
const speaker : Speaker = {
    id: "1",
    createdAt: new Date,
    name: "Juan",
    bio: "Bio",
    topics: ["HTML", "CSS"]
}
// - Creá 1 evento de cada tipo (conference, workshop, meetup)
const event1 : Event = {
    id: "event_1",
    title: "Conferencia",
    date: new Date(),
    price: 200,
    type: "conference",
    speakers: [speaker],
    tracks: 2
}

const event2 : Event = {
    id: "event_2",
    title: "Workshop",
    date: new Date(),
    price: 200,
    type: "workshop",
    instructor: speaker,
    maxParticipants: 200
}

const event3 : Event = {
    id: "event_3",
    title: "Meet",
    date: new Date(),
    price: 200,
    type: "meetup",
    isOnline: false,
    sponsor: "Nike"
}
// - Probá todos los type guards
const events : Event[] = [event1, event2, event3]

if (isConference(event1)) {
    console.log("Es una conferencia")
}

if (isMeetup(event3)) {
    console.log("Es una meet")
}

if (isWorkshop(event2)) {
    console.log("Es un workshop")
}
// - Probá getEventDetails con cada evento
console.log(getEventDetails(event1))
console.log(getEventDetails(event2))
console.log(getEventDetails(event3))
// - Probá filterEvents filtrando por precio > 50
filterEvents(events, (event) => event.price > 50)