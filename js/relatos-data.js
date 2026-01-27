const relatosData = [
    {
        id: "rel-001",
        titulo: "El ruido subterráneo",
        autor: "María González, 82 años",
        fecha: "2024-01-15",
        formattedDate: "15 Ene, 2024",
        categoria: "Catástrofe",
        modalId: "terremotoModal",
        texto: "Yo tenía 7 años cuando pasó. Recuerdo que los pajaritos dejaron de cantar unos minutos antes. Mi mamá estaba cocinando pan y de repente el suelo bramó. No fue un ruido normal, fue un bramido que venía de las entrañas de la tierra. Salimos corriendo al patio y vimos cómo la torre de la iglesia se mecía como un péndulo antes de caer. Ese polvo que se levantó... nunca olvidaré ese olor a adobe molido.",
        tags: ["Terremoto 1939", "Infancia"],
        readingTime: "1 min",
        emotion: "Solemne",
        views: 1240
    },
    {
        id: "rel-002",
        titulo: "Viajes a la costa",
        autor: "Roberto Muñoz, 75 años",
        fecha: "2024-02-01",
        formattedDate: "1 Feb, 2024",
        categoria: "Vida Cotidiana",
        modalId: "rutaModal",
        texto: "El tren a Cauquenes era una fiesta. Mi papá nos llevaba a vender quesos y traíamos mariscos. Recuerdo que el tren paraba en todas partes, y en cada estación subían las señoras vendiendo tortillas con huevo duro. El viaje era lento, el tren resoplaba en las subidas, y uno iba mirando el campo pasar despacito, no como ahora que todo es rápido.",
        tags: ["Tren", "Comercio", "Infancia"],
        readingTime: "2 min",
        emotion: "Nostalgia",
        views: 856
    },
    {
        id: "rel-003",
        titulo: "Las tardes en la Plaza",
        autor: "Sra. Carmen, 68 años",
        fecha: "2024-01-20",
        formattedDate: "20 Ene, 2024",
        categoria: "Vida Social",
        modalId: "plazaModal",
        texto: "La plaza antigua tenía una magia especial. Los domingos después de misa era obligatorio ir a dar vueltas. Los hombres caminaban en un sentido y las mujeres en el otro, así nos cruzábamos y nos mirábamos. Ahí conocí a mi marido, cruzando miradas mientras la banda tocaba en el odeón. Extraño esa pileta antigua.",
        tags: ["Plaza de Armas", "Juventud", "Amor"],
        readingTime: "1 min",
        emotion: "Romántico",
        views: 2103
    },
    {
        id: "rel-004",
        titulo: "El primer auto del pueblo",
        autor: "Don Pepe, 90 años",
        fecha: "2024-01-28",
        formattedDate: "28 Ene, 2024",
        categoria: "Tecnología",
        modalId: "vehiculosModal",
        texto: "Cuando llegó el primer Ford T, la gente salía a las calles a verlo pasar. Hacía un ruido infernal y espantaba a los caballos. Recuerdo que el chofer usaba antiparras y guantes de cuero. Era todo un espectáculo, parecían naves espaciales comparados con nuestras carretas.",
        tags: ["Autos", "Progreso"],
        readingTime: "2 min",
        emotion: "Asombro",
        views: 945
    },
    {
        id: "rel-005",
        titulo: "La Fiesta de la Primavera",
        autor: "Graciela Mendez, 77 años",
        fecha: "2024-02-10",
        formattedDate: "10 Feb, 2024",
        categoria: "Vida Social",
        modalId: "plazaModal",
        texto: "¡Qué fiestas aquellas! Elegíamos a la reina de la primavera y hacíamos carros alegóricos. Todo el pueblo participaba. Recuerdo un año que mi hermano se disfrazó de bombero y terminó mojando a medio mundo desde el carro. La gente se reía tanto. No había televisión, así que nosotros éramos nuestro propio espectáculo.",
        tags: ["Fiestas", "Comunidad", "Alegría"],
        readingTime: "2 min",
        emotion: "Alegría",
        views: 1530
    }
];

// Hacer disponible para otros scripts
window.relatosData = relatosData;
