export const Languages = [
  {
    id: "LA01",
    key: "EN",
    language: "English",
    words: {
      home: "Home",
      favs: "Favs",
      contact: "Contact",
      addFV: "Add Fav",
      dentistFavs: "Fav Dentists",
      detailDentist: "Dentist Details ",
      fullName: "Full Name:",
      email: "Email:",
      send: "Send",
      contactTitle: "Want to know more?",
      contactText: "Send us your questions and we will contact you",
      messageStart: "Thank you ",
      messageEnd: ", we will contact you as soon as possible via email.",
      name: "Name",
      phone: "Phone",
      website: "Website",
      emailTable: "E-mail",
      errorName: "Please enter a full name (first and last)",
      errorEmail: "Please enter an email",
    },
  },
  {
    id: "LA02",
    key: "ES",
    language: "Spanish",
    words: {
      home: "Inicio",
      favs: "Favoritos",
      contact: "Contacto",
      addFV: "Agregar a Favoritos",
      dentistFavs: "Dentistas Favoritos",
      detailDentist: "Detalle del dentista ",
      fullName: "Nombre Completo:",
      email: "Correo Electrónico:",
      send: "Enviar",
      contactTitle: "¿Quieres saber más?",
      contactText: "Envíanos tus preguntas y nos pondremos en contacto contigo",
      messageStart: "Gracias ",
      messageEnd: ", te contactaremos cuando antes vía email.",
      name: "Nombre",
      phone: "Teléfono",
      website: "Sitio web",
      emailTable: "Correo Electrónico",
      errorName:
        "Por favor, ingrese un nombre completo (primer y último apellido)",
      errorEmail: "Por favor, ingrese un correo electrónico válido",
    },
  },
  {
    id: "LA03",
    key: "PT",
    language: "Portuguese",
    words: {
      home: "Início",
      favs: "Favoritos",
      contact: "Contato",
      addFV: "Adicionar aos Favoritos",
      dentistFavs: "Dentistas Favoritos",
      detailDentist: "Detalhes do dentista ",
      fullName: "Nome Completo:",
      email: "E-mail:",
      send: "Enviar",
      contactTitle: "Quer saber mais?",
      contactText: "Envie-nos suas perguntas e entraremos em contato com você",
      messageStart: "Obrigado(a) ",
      messageEnd: ", entraremos em contato o mais breve possível por e-mail.",
      name: "Nome",
      phone: "Telefone",
      website: "Site",
      emailTable: "E-mail",
      errorName:
        "Por favor, digite um nome completo (primeiro e último sobrenome)",
      errorEmail: "Por favor, digite um endereço de e-mail válido",
    },
  },
  {
    id: "LA04",
    key: "IT",
    language: "Italian",
    words: {
      home: "Home",
      favs: "Preferiti",
      contact: "Contatto",
      addFV: "Aggiungi ai Preferiti",
      dentistFavs: "Dentisti Preferiti",
      detailDentist: "Dettagli del dentista ",
      fullName: "Nome Completo:",
      email: "E-mail:",
      send: "Invia",
      contactTitle: "Vuoi saperne di più?",
      contactText: "Inviaci le tue domande e ti contatteremo",
      messageStart: "Grazie ",
      messageEnd: ", ti contatteremo al più presto via email.",
      name: "Nome",
      phone: "Teléfono",
      website: "Sitio web",
      emailTable: "E-mail",
      errorName: "Per favore, inserisci un nome completo (nome e cognome)",
      errorEmail: "Per favore, inserisci un indirizzo email valido",
    },
  },
];

export const getCurrentLanguage = (language) => {
  console.log(`Getting current language ${language} -`);
  const filtered = Languages.filter((la) => la.key === language)[0];
  return filtered;
};

export const messageComplete = (language, name) => {
  const filtered = Languages.filter((la) => la.key === language)[0];
  const { messageStart, messageEnd } = filtered.words;
  return `${messageStart}${name}${messageEnd}`;
};
