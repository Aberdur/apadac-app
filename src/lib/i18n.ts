export const locales = ["es", "en", "de"] as const;

export type Locale = (typeof locales)[number];

export const localeCookieName = "apadac-locale";

export const localeLabels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  es: "ES",
};

const defaultLocale: Locale = "es";

export const getLocaleFromValue = (value: string | null | undefined): Locale =>
  locales.includes(value as Locale) ? (value as Locale) : defaultLocale;

export const getDateLocale = (locale: Locale) => {
  switch (locale) {
    case "en":
      return "en-GB";
    case "de":
      return "de-DE";
    default:
      return "es-ES";
  }
};

const dictionaries = {
  de: {
    common: {
      announcements: "Ankündigungen",
      addPhotos: "Fotos hinzufügen oder neu sortieren",
      adopt: "Adoptieren",
      admin: "Internes Panel",
      age: "Alter",
      all: "Alle",
      apply: "Anwenden",
      brandTagline: "Tierschutzverein aus Callosa de Segura",
      backToAdoptions: "Zurück zu Vermittlungen",
      backToSuccessCases: "Zurück zu Erfolgsgeschichten",
      casesOfSuccess: "Erfolgsgeschichten",
      clear: "Zurücksetzen",
      collaborate: "Mitmachen",
      contact: "Kontakt",
      dogs: "Hunde",
      editContent: "Inhalte in der Verwaltung bearbeiten",
      editPanel: "Im Panel bearbeiten",
      female: "Weiblich",
      gallery: "Galerie",
      gatos: "Katzen",
      help: "So kannst du helfen",
      home: "Startseite",
      imagePending: "Bald fügen wir ein Bild hinzu",
      male: "Männlich",
      menu: "Menü",
      moreFilters: "Weitere Filter",
      navigation: "Navigation",
      noImage: "Bald fügen wir ein Bild hinzu",
      otherWaysToHelp: "Weitere Möglichkeiten zu helfen",
      panel: "Panel",
      pendingInPanel: "Informationen folgen in Kürze.",
      published: "Veröffentlicht",
      recentStory: "Weitere Informationen folgen in Kürze",
      results: (count: number) => `${count} Ergebnis${count === 1 ? "" : "se"}`,
      seeAllDogs: "Alle Hunde ansehen",
      seeAllSuccessCases: "Alle Geschichten ansehen",
      seeAllCats: "Alle Katzen ansehen",
      seeAnimalsInAdoption: "Tiere zur Adoption ansehen",
      sex: "Geschlecht",
      size: "Größe",
      writeNow: "Jetzt schreiben",
    },
    footer: {
      cta:
        "Wenn du helfen, adoptieren oder die Arbeit von APADAC unterstützen möchtest, findest du im Hilfebereich die passende Möglichkeit.",
      description:
        "Verein zum Schutz ausgesetzter Haustiere in Callosa de Segura. Vermittlung, Hilfe und Unterstützung für Tiere, die eine zweite Chance brauchen.",
    },
    help: {
      contactTitle: "Mit APADAC sprechen",
      contactText:
        "Wenn du nicht sicher bist, wie du am besten helfen kannst, schreib uns und der Verein wird dich je nach aktuellem Bedarf beraten.",
      bankDetails: "Bankdaten",
      bankInfo: "Bankinformationen",
      bicSwift: "BIC / SWIFT",
      bizumNote: "Hinweis",
      donationTitle: "Finanzielle Hilfe für den Alltag",
      donationText:
        "Jeder Beitrag hilft bei Futter, Tierarztkosten, Medikamenten, Rettungen und Notfällen.",
      donationWrite: "Schreiben, um zu helfen",
      dogsAccount: "Spendenkonto für Hunde",
      catsAccount: "Spendenkonto für Katzen",
      conceptNote: "Verwendungszweck",
      diffusionButton: "Beim Teilen helfen",
      diffusionTitle: "Teilen hilft ebenfalls",
      diffusionLabel: "Netzwerk und Sichtbarkeit",
      diffusionText:
        "Fälle teilen, über APADAC sprechen und andere mobilisieren hilft ebenfalls, Leben zu retten.",
      optionsEyebrow: "Möglichkeiten zu helfen",
      optionsTitle: "Wähle, wie du helfen möchtest",
      pageEyebrow: "So kannst du APADAC helfen",
      pageText:
        "Wähle die Art der Unterstützung, die am besten zu dir passt, und finde hier alle Kontakt- und Hilfsmöglichkeiten.",
      pageTitle: "Wenn du nicht adoptieren kannst, kannst du trotzdem ein Leben verändern.",
      paypalButton: "Zu PayPal",
      paypalText:
        "Wenn du lieber online spenden möchtest, kannst du dies direkt über PayPal tun.",
      sponsorshipButton: "Ich möchte eine Patenschaft übernehmen",
      sponsorshipTitle: "Laufende Hilfe für besondere Fälle",
      sponsorshipText:
        "Patenschaften helfen besonders Tieren mit besonderen Bedürfnissen, langer Aufenthaltsdauer oder höheren Pflegekosten.",
      teamingButton: "Zu Teaming",
      teamingLinkLabel: "Teaming-Link",
      teamingText:
        "Mit einem kleinen monatlichen Beitrag hilfst du, einen stabilen Teil der Arbeit des Vereins zu tragen.",
      teamingTitle: "Ein kleiner Beitrag, eine stabile Hilfe",
      title: "So kannst du helfen",
      viewOptions: "Optionen ansehen",
      volunteerButton: "Ich möchte helfen",
      volunteerTitle: "Zeit und Hände für die tägliche Arbeit",
      volunteerText:
        "Spaziergänge, Fahrten, Veranstaltungen, Sichtbarkeit oder organisatorische Aufgaben. Jede investierte Stunde zählt.",
      fosterButton: "Ich möchte Pflegestelle werden",
      fosterTitle: "Ein Platz rettet Leben",
      fosterText:
        "Pflegestelle zu sein hilft, Tiere aus schwierigen Situationen zu holen und ihren Charakter besser kennenzulernen.",
      bankTransfer: "Banküberweisung",
      contactBlockEmail: "E-Mail",
      contactBlockPhone: "Telefon",
      contactBlockWhatsapp: "WhatsApp",
      donateOrJoin: "Spenden oder Mitglied werden",
      teaming: "Teaming",
      foster: "Pflegestelle",
      sponsorship: "Patenschaft",
      volunteering: "Freiwilligenarbeit",
      diffusion: "Teilen und mithelfen",
      bizum: "Bizum",
      paypal: "PayPal",
      accountHolder: "Kontoinhaber",
      bank: "Bank",
    },
    home: {
      adoptionEyebrow: "Zur Adoption",
      adoptionText:
        "Hier findest du Hunde und Katzen, die derzeit ein Zuhause suchen, klar vorgestellt und leicht zu entdecken.",
      announcementsAdminCta: "Ankündigung erstellen",
      announcementsCta: "Alle Ankündigungen ansehen",
      announcementsEyebrow: "Ankündigungen",
      announcementsText:
        "Veranstaltungen, wichtige Mitteilungen und aktuelle Nachrichten von APADAC an einem Ort.",
      announcementsTitle: "Aktuelles aus dem Verein",
      heroEyebrow: "APADAC",
      heroPrimary: (species: "gato" | "perro") =>
        `Alle ${species === "gato" ? "Katzen" : "Hunde"} zur Adoption ansehen`,
      heroSecondary: "Erfolgsgeschichten ansehen",
      heroText:
        "Entdecke Tiere, die ein Zuhause suchen, erfahre von gelungenen Vermittlungen und finde Wege, APADAC zu unterstützen.",
      heroTitle: "Klare Vermittlungen, schöne Happy Ends und Tiere auf der Suche nach einer Familie.",
      helpEyebrow: "So kannst du helfen",
      helpText:
        "Spenden, Pflegestelle, Freiwilligenarbeit, Teaming oder Teilen. Hier findest du einen schnellen Einstieg und auf der eigenen Seite alle Details.",
      helpTitle: "Ein kleiner Bereich für alle, die auf andere Weise helfen möchten",
      helpCta: "So kannst du helfen",
      noAnnouncements:
        "Hier veröffentlichen wir nach und nach Veranstaltungen, wichtige Hinweise und Neuigkeiten von APADAC.",
      noAnimals: (species: "gato" | "perro") =>
        `Schon bald zeigen wir hier die ersten ${species === "gato" ? "Katzen" : "Hunde"}, die aktuell ein Zuhause suchen.`,
      noSuccess:
        "Hier teilen wir nach und nach die Geschichten der Tiere, die bereits eine Familie gefunden haben.",
      speciesHeading: (species: "gato" | "perro") =>
        `Lerne einige unserer ${species === "gato" ? "Katzen" : "Hunde"} kennen`,
      successEyebrow: "Erfolgsgeschichten",
      successText:
        "Jede gelungene Vermittlung erzählt von Fürsorge, Geduld und einer zweiten Chance.",
      successTitle: "Geschichten mit gutem Ende",
      successCta: "Alle Geschichten ansehen",
    },
    animal: {
      adoption: "Verantwortungsvolle Adoption",
      adoptionContact: "Adoptionskontakt",
      adoptionQuestion: (name: string) => `Denkst du, ${name} könnte zu dir passen?`,
      adoptionText:
        "Schreib uns kurz etwas über dich und wir erzählen dir mehr über die Situation, den Charakter und den Vermittlungsprozess.",
      adoptThisAnimal: (name: string) => `Ich möchte ${name} adoptieren`,
      browseAnimals: "Weitere Tiere ansehen",
      browseStories: "Weitere Geschichten ansehen",
      care: "Pflege",
      coexistence: "Zusammenleben",
      completeProfile: "Wir aktualisieren dieses Profil",
      completeProfileText: (name: string) =>
        `Du siehst bereits das Hauptbild und die wichtigsten Informationen. Wenn du ${name} besser kennenlernen möchtest, schreib uns und wir erzählen dir gern mehr.`,
      detailsAdoption: "Adoption",
      detailsCharacter: "Charakter",
      detailsHealth: "Gesundheit",
      happyEnding: "Happy End",
      happyEndingText:
        "Dieses Profil bleibt als Erfolgsgeschichte sichtbar. Wenn du einem anderen Tier helfen möchtest, kannst du weiter die Tiere ansehen, die noch ein Zuhause suchen.",
      foundFamily: (name: string) => `${name} hat bereits eine Familie gefunden`,
      morePhotos: (name: string) => `Mehr Fotos von ${name}`,
      sponsorStateNo: "Sucht noch eine Patenschaft",
      sponsorStateYes: "Hat bereits eine Patenschaft",
      successCase: "Erfolgsgeschichte",
      viewOtherAnimals: "Andere Tiere zur Adoption ansehen",
      writeAbout: (name: string) => `Wegen ${name} schreiben`,
      adoptedOn: (date: string) => `Adoptiert am ${date}.`,
      facts: {
        age: "Alter",
        breed: "Rasse",
        energy: "Energie",
        location: "Ort",
        sex: "Geschlecht",
        size: "Größe",
        species: "Art",
        sponsor: "Patenschaft",
      },
      tags: {
        goodWithCats: "Verträgt sich mit Katzen",
        goodWithDogs: "Verträgt sich mit Hunden",
        goodWithKids: "Verträgt sich mit Kindern",
        specialNeeds: "Besondere Bedürfnisse",
        sterilized: "Kastriert",
        vaccinated: "Geimpft",
      },
    },
    adoptionList: {
      emptyButton: "Erste Profile anlegen",
      emptyText:
        "Die ersten verfügbaren Tiere erscheinen hier, sobald ihre Profile veröffentlicht sind.",
      emptyTitle: "Aktuell sind keine Tiere veröffentlicht",
      heading: (species: "gato" | "perro" | null) =>
        species === "perro"
          ? "Hunde, die ein Zuhause suchen"
          : species === "gato"
            ? "Katzen, die ein Zuhause suchen"
            : "Hunde und Katzen, die ein Zuhause suchen",
      pageEyebrow: "Vermittlungen",
      pageText:
        "Hier findest du die aktuell verfügbaren Tiere mit den wichtigsten Informationen für den Start in den Adoptionsprozess.",
      cta: (name: string) => `${name} kennenlernen`,
      allFemale: "Alle",
    },
    sponsorPage: {
      cta: "Ich möchte eine Patenschaft übernehmen",
      emptyPrimary: "Zur Adoption stehende Tiere ansehen",
      emptySecondary: "Andere Möglichkeiten zu helfen",
      emptyText:
        "Aktuell gibt es keine Tiere, die noch eine Patenschaft suchen. Du kannst zu den Vermittlungen zurückkehren oder andere Wege ansehen, APADAC zu unterstützen.",
      emptyTitle: "Im Moment sind alle versorgt",
      eyebrow: "Patenschaften",
      subtitle:
        "Hier findest du Tiere, die weiterhin eine dauerhafte Unterstützung suchen. Eine Patenschaft ersetzt keine Adoption, hilft aber bei Pflege, Futter und Tierarztkosten.",
      title: "Tiere, die noch eine Patenschaft suchen",
      viewHelp: "Zurück zur Hilfeseite",
      viewAnimal: (name: string) => `${name} ansehen`,
    },
    successPage: {
      emptyButton: "Tiere zur Adoption ansehen",
      emptyText:
        "Hier erscheinen nach und nach die Geschichten der Tiere, die bereits adoptiert wurden.",
      emptyTitle: "Aktuell gibt es noch keine veröffentlichten Geschichten",
      eyebrow: "Erfolgsgeschichten",
      subtitle:
        "Dieser Bereich versammelt gelungene Vermittlungen und zeigt die Wirkung der täglichen Arbeit von APADAC.",
      title: "Tiere, die bereits eine Familie gefunden haben",
      viewStory: "Geschichte ansehen",
    },
    announcementsPage: {
      backToAnnouncements: "Zurück zu den Ankündigungen",
      badge: "Ankündigung",
      createAnnouncement: "Ankündigung erstellen",
      emptyHome: "Zur Startseite",
      emptyText:
        "Hier erscheinen nach und nach Veranstaltungen, Hinweise und Neuigkeiten von APADAC.",
      emptyTitle: "Es gibt noch keine veröffentlichten Ankündigungen",
      eyebrow: "Ankündigungen",
      externalCta: "Weitere Informationen",
      fallbackSummary: "Weitere Informationen folgen in Kürze.",
      fallbackTitle: "Neue Ankündigung",
      subtitle:
        "Dieser Bereich sammelt Neuigkeiten, Veranstaltungen und wichtige Hinweise, damit alles an einem Ort schnell auffindbar ist.",
      title: "Tafel mit Neuigkeiten und Veranstaltungen",
      viewAnnouncement: "Ankündigung ansehen",
    },
  },
  en: {
    common: {
      announcements: "Notice board",
      addPhotos: "Add or reorder photos",
      adopt: "Adopt",
      admin: "Internal panel",
      age: "Age",
      all: "All",
      apply: "Apply",
      brandTagline: "Animal shelter in Callosa de Segura",
      backToAdoptions: "Back to adoptions",
      backToSuccessCases: "Back to success stories",
      casesOfSuccess: "Success stories",
      clear: "Clear",
      collaborate: "Get involved",
      contact: "Contact",
      dogs: "Dogs",
      editContent: "Edit content in admin",
      editPanel: "Edit in panel",
      female: "Female",
      gallery: "Gallery",
      gatos: "Cats",
      help: "How to help",
      home: "Home",
      imagePending: "Image coming soon",
      male: "Male",
      menu: "Menu",
      moreFilters: "More filters",
      navigation: "Navigation",
      noImage: "Image coming soon",
      otherWaysToHelp: "Other ways to help",
      panel: "Panel",
      pendingInPanel: "Information will be updated soon.",
      published: "Published",
      recentStory: "More information coming soon",
      results: (count: number) => `${count} result${count === 1 ? "" : "s"}`,
      seeAllDogs: "See all dogs",
      seeAllSuccessCases: "See all stories",
      seeAllCats: "See all cats",
      seeAnimalsInAdoption: "See animals for adoption",
      sex: "Sex",
      size: "Size",
      writeNow: "Write now",
    },
    footer: {
      cta:
        "If you want to help, adopt, or support APADAC, head to our help section to find the option that best fits you.",
      description:
        "Association for the protection of abandoned domestic animals in Callosa de Segura. Adoptions, collaboration, and support for animals needing a second chance.",
    },
    help: {
      accountHolder: "Account holder",
      bank: "Bank",
      bankDetails: "Bank details",
      bankInfo: "Bank information",
      bankTransfer: "Bank transfer",
      bicSwift: "BIC / SWIFT",
      bizum: "Bizum",
      bizumNote: "Note",
      catsAccount: "Donations for cats",
      conceptNote: "Reference note",
      contactBlockEmail: "Email",
      contactBlockPhone: "Phone",
      contactBlockWhatsapp: "WhatsApp",
      contactText:
        "If you aren't sure how best to help, write to us and the shelter will guide you based on our current needs.",
      contactTitle: "Talk to APADAC",
      diffusion: "Spread the word",
      diffusionButton: "I want to help by sharing",
      diffusionLabel: "Visibility and network",
      diffusionText:
        "Sharing cases, talking about APADAC, and getting other people involved also helps save lives.",
      diffusionTitle: "Sharing also helps",
      donateOrJoin: "Donate or become a member",
      donationText:
        "Every contribution helps cover food, veterinary care, medication, rescues, and emergencies.",
      donationTitle: "Financial help for day-to-day needs",
      donationWrite: "Write to collaborate",
      dogsAccount: "Donations for dogs",
      foster: "Become a foster home",
      fosterButton: "I want to foster",
      fosterText:
        "Becoming a foster home helps animals escape difficult situations and allows us to better understand their personality.",
      fosterTitle: "Making room saves lives",
      optionsEyebrow: "Ways to get involved",
      optionsTitle: "Choose how you want to help",
      pageEyebrow: "How to help APADAC",
      pageText:
        "Choose the method of support that fits you best and find all the key contact information here.",
      pageTitle: "If you cannot adopt, you can still change a life.",
      paypal: "PayPal",
      paypalButton: "Go to PayPal",
      paypalText:
        "If you prefer to donate online, you can do so directly through PayPal.",
      sponsorship: "Sponsor an animal",
      sponsorshipButton: "I want to sponsor",
      sponsorshipText:
        "Sponsorship provides crucial support for animals with special needs, long stays, or expensive veterinary care.",
      sponsorshipTitle: "Ongoing help for special cases",
      teaming: "Join Teaming",
      teamingButton: "Go to Teaming",
      teamingLinkLabel: "Teaming link",
      teamingText:
        "With a small monthly contribution, you help sustain a stable part of the shelter's vital work.",
      teamingTitle: "A small monthly amount, stable support",
      title: "How to help",
      viewOptions: "See options",
      volunteerButton: "I want to volunteer",
      volunteerText:
        "Dog walking, transportation, events, outreach, or administrative tasks. Every hour you give matters.",
      volunteerTitle: "Time and hands for daily work",
      volunteering: "Volunteer",
    },
    home: {
      adoptionEyebrow: "Available for adoption",
      adoptionText:
        "Discover dogs and cats currently looking for a home, presented clearly and easy to browse.",
      announcementsAdminCta: "Create announcement",
      announcementsCta: "See all announcements",
      announcementsEyebrow: "Notice board",
      announcementsText:
        "Events, important notices, and updates from APADAC, all gathered in one place.",
      announcementsTitle: "Latest news from the shelter",
      heroEyebrow: "APADAC",
      heroPrimary: (species: "gato" | "perro") =>
        `See ${species === "gato" ? "cats" : "dogs"} for adoption`,
      heroSecondary: "See success stories",
      heroText:
        "Meet the animals looking for a home, discover successful adoptions, and find simple ways to support APADAC.",
      heroTitle: "Clear adoptions, happy endings, and animals waiting for a family.",
      helpCta: "See how to help",
      helpEyebrow: "How to help",
      helpText:
        "You can support APADAC through donations, fostering, volunteering, or simply helping to spread the word.",
      helpTitle: "A dedicated section for people who want to help in other ways",
      noAnnouncements:
        "We will publish events, notices, and updates from APADAC here as they become available.",
      noAnimals: (species: "gato" | "perro") =>
        `Soon we will feature the first ${species === "gato" ? "cats" : "dogs"} currently looking for a home.`,
      noSuccess:
        "We will share the stories of animals that have already found their forever family here.",
      speciesHeading: (species: "gato" | "perro") =>
        `Meet some of our ${species === "gato" ? "cats" : "dogs"}`,
      successCta: "See all stories",
      successEyebrow: "Success stories",
      successText:
        "Every completed adoption speaks of care, patience, and second chances.",
      successTitle: "Stories that ended well",
    },
    animal: {
      adoptedOn: (date: string) => `Adopted on ${date}.`,
      adoption: "Responsible adoption",
      adoptionContact: "Adoption contact",
      adoptionQuestion: (name: string) => `Do you think ${name} could be a match for you?`,
      adoptionText:
        "Write to us with a short introduction and we will tell you more about their situation, character, and the adoption process.",
      adoptThisAnimal: (name: string) => `I want to adopt ${name}`,
      browseAnimals: "See other animals for adoption",
      browseStories: "Keep browsing stories",
      care: "Care requirements",
      coexistence: "Living together",
      completeProfile: "We are updating this profile",
      completeProfileText: (name: string) =>
        `You can already see their main photo and basic details. If you'd like to know ${name} better, write to us and we would love to tell you more.`,
      detailsAdoption: "Adoption details",
      detailsCharacter: "Character",
      detailsHealth: "Health",
      facts: {
        age: "Age",
        breed: "Breed",
        energy: "Energy",
        location: "Location",
        sex: "Sex",
        size: "Size",
        species: "Species",
        sponsor: "Sponsorship",
      },
      foundFamily: (name: string) => `${name} has already found a family!`,
      happyEnding: "Happy ending",
      happyEndingText:
        "This profile remains published as a success story. If you want to help another animal, you can keep exploring those still looking for a home.",
      morePhotos: (name: string) => `More photos of ${name}`,
      sponsorStateNo: "Looking for a sponsor",
      sponsorStateYes: "Already sponsored",
      successCase: "Success story",
      tags: {
        goodWithCats: "Good with cats",
        goodWithDogs: "Good with dogs",
        goodWithKids: "Good with children",
        specialNeeds: "Special needs",
        sterilized: "Neutered / Spayed",
        vaccinated: "Vaccinated",
      },
      viewOtherAnimals: "See other animals for adoption",
      writeAbout: (name: string) => `Write to us about ${name}`,
    },
    adoptionList: {
      allFemale: "All",
      cta: (name: string) => `Meet ${name}`,
      emptyButton: "Create first profiles",
      emptyText:
        "The first available profiles will appear here as soon as they are ready to be published.",
      emptyTitle: "There are no animals published right now",
      heading: (species: "gato" | "perro" | null) =>
        species === "perro"
          ? "Dogs looking for a family"
          : species === "gato"
            ? "Cats looking for a family"
            : "Dogs and cats looking for a family",
      pageEyebrow: "Adoptions",
      pageText:
        "Here you will find the animals currently available, along with the essential information needed to begin the adoption process.",
    },
    sponsorPage: {
      cta: "I want to sponsor",
      emptyPrimary: "See animals for adoption",
      emptySecondary: "Other ways to help",
      emptyText:
        "At the moment, all our animals have support. You can still browse adoptions or discover other ways to help APADAC.",
      emptyTitle: "Right now, they all have support",
      eyebrow: "Sponsorship",
      subtitle:
        "Here are the animals still looking for ongoing support. Sponsoring does not replace adoption, but it helps cover their daily care, food, and veterinary needs.",
      title: "Animals still looking for a sponsor",
      viewAnimal: (name: string) => `See ${name}`,
      viewHelp: "See other ways to help",
    },
    successPage: {
      emptyButton: "See animals for adoption",
      emptyText:
        "Stories of adopted animals will appear here progressively as more happy endings happen.",
      emptyTitle: "There are no published stories right now",
      eyebrow: "Success stories",
      subtitle:
        "This section brings together completed adoptions and highlights the real impact of APADAC's daily work.",
      title: "Animals that have already found their family",
      viewStory: "See story",
    },
    announcementsPage: {
      backToAnnouncements: "Back to announcements",
      badge: "Announcement",
      createAnnouncement: "Create announcement",
      emptyHome: "Back to home",
      emptyText:
        "Events, notices, and updates from APADAC will appear here as they are published.",
      emptyTitle: "There are no published announcements right now",
      eyebrow: "Notice board",
      externalCta: "More information",
      fallbackSummary: "More information will be available soon.",
      fallbackTitle: "New announcement",
      subtitle:
        "This section gathers updates, events, and important notices so everything is easy to find in one place.",
      title: "News and events board",
      viewAnnouncement: "See announcement",
    },
  },
  es: {
    common: {
      announcements: "Anuncios",
      addPhotos: "Añadir o reordenar fotos",
      adopt: "Adopta",
      admin: "Panel interno",
      age: "Edad",
      all: "Todos",
      apply: "Aplicar",
      brandTagline: "Protectora de animales de Callosa de Segura",
      backToAdoptions: "Volver a adopciones",
      backToSuccessCases: "Volver a casos de éxito",
      casesOfSuccess: "Casos de éxito",
      clear: "Limpiar",
      collaborate: "Colabora",
      contact: "Contacto",
      dogs: "Perros",
      editContent: "Editar contenido desde administración",
      editPanel: "Editar en panel",
      female: "Hembra",
      gallery: "Galería",
      gatos: "Gatos",
      help: "Cómo ayudar",
      home: "Inicio",
      imagePending: "Pronto añadiremos una imagen",
      male: "Macho",
      menu: "Menú",
      moreFilters: "Más filtros",
      navigation: "Navegación",
      noImage: "Pronto añadiremos una imagen",
      otherWaysToHelp: "Otras formas de ayudar",
      panel: "Panel",
      pendingInPanel: "Información pendiente de actualización.",
      published: "Publicado",
      recentStory: "Más información próximamente",
      results: (count: number) => `${count} resultado${count === 1 ? "" : "s"}`,
      seeAllDogs: "Ver todos los perros",
      seeAllSuccessCases: "Ver todos los casos",
      seeAllCats: "Ver todos los gatos",
      seeAnimalsInAdoption: "Ver animales en adopción",
      sex: "Sexo",
      size: "Tamaño",
      writeNow: "Escribir ahora",
    },
    footer: {
      cta:
        "Si quieres ayudar, adoptar o apoyar la labor de APADAC, entra en la sección de colaboración y descubre la forma que mejor encaja contigo.",
      description:
        "Asociación Protectora de Animales Domésticos Abandonados de Callosa de Segura. Adopciones, colaboración y apoyo a animales que necesitan una segunda oportunidad.",
    },
    help: {
      accountHolder: "Titular",
      bank: "Banco",
      bankDetails: "Datos bancarios",
      bankInfo: "Información bancaria",
      bankTransfer: "Transferencia bancaria",
      bicSwift: "BIC / SWIFT",
      bizum: "Bizum",
      bizumNote: "Nota",
      catsAccount: "Cuenta donaciones para gatos",
      conceptNote: "Concepto de la transferencia",
      contactBlockEmail: "Email",
      contactBlockPhone: "Teléfono",
      contactBlockWhatsapp: "WhatsApp",
      contactText:
        "Si no tienes claro cuál es la mejor forma de ayudar, escribe y la protectora podrá orientarte según lo que necesiten ahora mismo.",
      contactTitle: "Hablar con APADAC",
      diffusion: "Difundir y colaborar",
      diffusionButton: "Quiero ayudar difundiendo",
      diffusionLabel: "Difusión y red",
      diffusionText:
        "Compartir casos, hablar de APADAC y movilizar a otras personas también ayuda a salvar vidas.",
      diffusionTitle: "Compartir también ayuda",
      donateOrJoin: "Donar o hacerse socio",
      donationText:
        "Cada aportación ayuda a cubrir alimentación, veterinario, medicación, rescates y urgencias.",
      donationTitle: "Ayuda económica para sostener el día a día",
      donationWrite: "Escribir para colaborar",
      dogsAccount: "Cuenta donaciones para perros",
      foster: "Ser casa de acogida",
      fosterButton: "Quiero ser casa de acogida",
      fosterText:
        "Ser casa de acogida permite sacar animales de situaciones complicadas y conocer mejor su carácter.",
      fosterTitle: "Abrir un hueco salva vidas",
      optionsEyebrow: "Vías de colaboración",
      optionsTitle: "Elige cómo quieres ayudar",
      pageEyebrow: "Cómo ayudar a APADAC",
      pageText:
        "Elige la forma de ayudar que mejor encaja contigo y encuentra aquí toda la información para colaborar con APADAC.",
      pageTitle: "Si no puedes adoptar, también puedes cambiar una vida.",
      paypal: "PayPal",
      paypalButton: "Ir a PayPal",
      paypalText:
        "Si prefieres donar online, puedes hacerlo directamente desde PayPal.",
      sponsorship: "Apadrinar un animal",
      sponsorshipButton: "Quiero apadrinar",
      sponsorshipText:
        "Apadrinar ayuda especialmente a animales con necesidades especiales, estancias largas o cuidados más costosos.",
      sponsorshipTitle: "Ayuda continuada para casos especiales",
      teaming: "Unirse a Teaming",
      teamingButton: "Ir a Teaming",
      teamingLinkLabel: "Enlace de Teaming",
      teamingText:
        "Con una pequeña cuota mensual ayudas a sostener una parte estable del trabajo de la protectora.",
      teamingTitle: "Una pequeña cuota, un apoyo estable",
      title: "Cómo ayudar",
      viewOptions: "Ver opciones",
      volunteerButton: "Quiero hacer voluntariado",
      volunteerText:
        "Paseos, traslados, eventos, difusión o tareas organizativas. Cada hora dedicada cuenta.",
      volunteerTitle: "Tiempo y manos para el trabajo diario",
      volunteering: "Ser voluntario",
    },
    home: {
      adoptionEyebrow: "En adopción",
      adoptionText: "",
      announcementsAdminCta: "Crear anuncio",
      announcementsCta: "Ver todos los anuncios",
      announcementsEyebrow: "Anuncios",
      announcementsText:
        "Eventos, avisos importantes y novedades de APADAC reunidos en un mismo espacio.",
      announcementsTitle: "Tablón de noticias y eventos",
      heroEyebrow: "APADAC",
      heroPrimary: (species: "gato" | "perro") =>
        `Ver ${species === "gato" ? "gatos" : "perros"} en adopción`,
      heroSecondary: "Ver casos de éxito",
      heroText:
        "Conoce a los animales que buscan hogar, descubre las adopciones que ya han salido bien y encuentra formas sencillas de apoyar a APADAC.",
      heroTitle: "Adopciones claras, historias con final feliz y animales esperando una familia.",
      helpCta: "Ver cómo ayudar",
      helpEyebrow: "Cómo ayudar",
      helpText:
        "Puedes colaborar con APADAC donando, ofreciendo acogida, haciendo voluntariado o ayudando a difundir.",
      helpTitle: "Una pequeña sección para quien quiere sumar de otra forma",
      noAnnouncements:
        "Aquí iremos publicando eventos, avisos y novedades importantes de APADAC.",
      noAnimals: (species: "gato" | "perro") =>
        `Pronto mostraremos aquí los primeros ${species === "gato" ? "gatos" : "perros"} que estén buscando hogar.`,
      noSuccess:
        "Aquí iremos compartiendo las historias de quienes ya han encontrado familia.",
      speciesHeading: (species: "gato" | "perro") =>
        `Conoce a algunos de nuestros ${species === "gato" ? "gatos" : "perros"}`,
      successCta: "Ver todos los casos",
      successEyebrow: "Casos de éxito",
      successText:
        "Cada adopción conseguida habla de cuidado, paciencia y segundas oportunidades.",
      successTitle: "Historias que ya terminaron bien",
    },
    animal: {
      adoptedOn: (date: string) => `Adoptada/o el ${date}.`,
      adoption: "Adopción responsable",
      adoptionContact: "Contacto de adopciones",
      adoptionQuestion: (name: string) => `¿Crees que ${name} puede encajar contigo?`,
      adoptionText:
        "Escríbenos con una breve presentación y te contaremos más sobre su situación, carácter y proceso de adopción.",
      adoptThisAnimal: (name: string) => `Quiero adoptar a ${name}`,
      browseAnimals: "Ver otros animales en adopción",
      browseStories: "Seguir viendo historias",
      care: "Cuidados",
      coexistence: "Convivencia",
      completeProfile: "Estamos actualizando su ficha",
      completeProfileText: (name: string) =>
        `Ya puedes ver su foto principal y sus datos básicos. Si quieres conocer mejor a ${name}, escríbenos y te contaremos más.`,
      detailsAdoption: "Adopción",
      detailsCharacter: "Carácter",
      detailsHealth: "Salud",
      facts: {
        age: "Edad",
        breed: "Raza",
        energy: "Energía",
        location: "Zona",
        sex: "Sexo",
        size: "Tamaño",
        species: "Especie",
        sponsor: "Apadrinamiento",
      },
      foundFamily: (name: string) => `${name} ya ha encontrado familia`,
      happyEnding: "Final feliz",
      happyEndingText:
        "Esta ficha queda publicada como caso de éxito. Si quieres ayudar a otro animal, puedes seguir explorando los que todavía buscan hogar.",
      morePhotos: (name: string) => `Más fotos de ${name}`,
      sponsorStateNo: "Busca padrino o madrina",
      sponsorStateYes: "Ya tiene padrino o madrina",
      successCase: "Caso de éxito",
      tags: {
        goodWithCats: "Convive bien con gatos",
        goodWithDogs: "Convive bien con perros",
        goodWithKids: "Convive bien con niños",
        specialNeeds: "Necesidades especiales",
        sterilized: "Esterilizada/o",
        vaccinated: "Vacunada/o",
      },
      viewOtherAnimals: "Ver otros animales en adopción",
      writeAbout: (name: string) => `Escribir por ${name}`,
    },
    adoptionList: {
      allFemale: "Todas",
      cta: (name: string) => `Conocer a ${name}`,
      emptyButton: "Crear primeras fichas",
      emptyText:
        "Las primeras fichas disponibles aparecerán aquí en cuanto estén listas para publicarse.",
      emptyTitle: "Ahora mismo no hay animales publicados",
      heading: (species: "gato" | "perro" | null) =>
        species === "perro"
          ? "Perros que buscan familia"
          : species === "gato"
            ? "Gatos que buscan familia"
            : "Perros y gatos que buscan familia",
      pageEyebrow: "Adopciones",
      pageText:
        "Aquí encontrarás a los animales disponibles, con la información esencial para empezar el proceso de adopción.",
    },
    sponsorPage: {
      cta: "Quiero apadrinar",
      emptyPrimary: "Ver animales en adopción",
      emptySecondary: "Otras formas de ayudar",
      emptyText:
        "En este momento todos los animales cuentan ya con apoyo. Aun así, puedes seguir viendo adopciones u otras formas de colaborar con APADAC.",
      emptyTitle: "Ahora mismo todos tienen apoyo",
      eyebrow: "Apadrinamiento",
      subtitle:
        "Aquí se reúnen los animales que siguen buscando una ayuda continuada. Apadrinar no sustituye a la adopción, pero sí permite sostener cuidados, alimentación y necesidades veterinarias.",
      title: "Animales que todavía buscan padrino o madrina",
      viewAnimal: (name: string) => `Ver a ${name}`,
      viewHelp: "Volver a cómo ayudar",
    },
    successPage: {
      emptyButton: "Ver animales en adopción",
      emptyText:
        "Aquí iremos reuniendo las historias de los animales que ya han sido adoptados.",
      emptyTitle: "Ahora mismo no hay historias publicadas",
      eyebrow: "Casos de éxito",
      subtitle:
        "Esta sección reúne adopciones cerradas y muestra el impacto del trabajo diario de APADAC.",
      title: "Animales que ya han encontrado familia",
      viewStory: "Ver historia",
    },
    announcementsPage: {
      backToAnnouncements: "Volver a anuncios",
      badge: "Anuncio",
      createAnnouncement: "Crear anuncio",
      emptyHome: "Volver a inicio",
      emptyText:
        "Aquí aparecerán poco a poco eventos, avisos y novedades relevantes de APADAC.",
      emptyTitle: "Ahora mismo no hay anuncios publicados",
      eyebrow: "Tablón de anuncios",
      externalCta: "Más información",
      fallbackSummary: "Más información próximamente.",
      fallbackTitle: "Nuevo anuncio",
      subtitle:
        "Este espacio reúne noticias, eventos y avisos importantes para mantener toda la actualidad de APADAC a mano.",
      title: "Noticias, eventos y avisos",
      viewAnnouncement: "Ver anuncio",
    },
  },
} as const;

export const getDictionary = (locale: Locale) => dictionaries[locale];