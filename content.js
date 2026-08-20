/*
  FICHIER PRINCIPAL À MODIFIER
  ----------------------------
  Tout ce qui change souvent est ici :
  - nom de la librairie
  - coordonnées
  - horaires
  - réseaux sociaux
  - livres
  - catégories

  Tu peux modifier ce fichier sans toucher au design.
*/

window.LIBRARY_CONTENT = {
  shop: {
    name: "Des livres, Des mots",
    address: "4-6 rue de l’Église, 59390 Toufflers",
    phoneDisplay: "",
    phoneLink: "",
    email: "",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=4-6+rue+de+l%27Eglise+59390+Toufflers",
    contactEmail: "",
    partnershipEmail: "",
    orderEmail: "",
    clubEmail: "",
    paymentUrl: "",
    instagram: "#",
    facebook: "#"
  },

  hours: [
    ["Lundi", "À confirmer"],
    ["Mardi", "À confirmer"],
    ["Mercredi", "À confirmer"],
    ["Jeudi", "À confirmer"],
    ["Vendredi", "À confirmer"],
    ["Samedi", "À confirmer"],
    ["Dimanche", "À confirmer"]
  ],

  categories: [
    { name: "Des livres, Des mots", icon: "✦", desc: "Littérature française & étrangère", color: "linear-gradient(145deg,#5c6f62,#2f4739)" },
    { name: "Des livres, Des mots", icon: "☼", desc: "Petits lecteurs, grandes histoires", color: "linear-gradient(145deg,#cf9b62,#a96d3e)" },
    { name: "Des livres, Des mots", icon: "◫", desc: "Bulles, séries & découvertes", color: "linear-gradient(145deg,#64788c,#3e5062)" },
    { name: "Des livres, Des mots", icon: "◌", desc: "Comprendre le monde autrement", color: "linear-gradient(145deg,#8a6d63,#654a44)" },
    { name: "Des livres, Des mots", icon: "◇", desc: "Arts, voyage & grands formats", color: "linear-gradient(145deg,#7a6d8a,#544961)" }
  ],

  clickCollect: [
    { id: "nouveaute", title: "Vos nouveautés", category: "Nouveautés", price: 19.90, color: "linear-gradient(145deg,#c47e5d,#86503f)" },
    { id: "coup-coeur", title: "Le coup de cœur", category: "Sélection", price: 21.90, color: "linear-gradient(145deg,#55705f,#314b3d)" },
    { id: "jeunesse", title: "Jeunesse", category: "Jeunesse", price: 14.90, color: "linear-gradient(145deg,#d0a054,#9e713a)" },
    { id: "bd-manga", title: "BD & Manga", category: "BD & Manga", price: 12.90, color: "linear-gradient(145deg,#59616f,#343c49)" }
  ],

  spaces: [
    {
      name: "Terrasse thé & café",
      icon: "☕",
      label: "Pause détente",
      color: "linear-gradient(145deg,#b08b79,#8f6c5c)",
      description: "Une terrasse conviviale pour savourer un thé ou un café, discuter tranquillement et profiter d’un vrai moment de détente autour des livres.",
      features: ["Terrasse extérieure", "Thé & café sur place", "Ambiance douce et chaleureuse"]
    },
    {
      name: "Salon lecture intérieur",
      icon: "📖",
      label: "Lecture sur place",
      color: "linear-gradient(145deg,#7fa08e,#5f8070)",
      description: "Un espace lecture intérieur confortable pour feuilleter, s’installer et découvrir les ouvrages dans une atmosphère calme et soignée.",
      features: ["Fauteuils confortables", "Coin lecture apaisant", "Découverte des nouveautés"]
    },
    {
      name: "Espace enfant",
      icon: "🧸",
      label: "Famille & jeunesse",
      color: "linear-gradient(145deg,#d0a186,#b98369)",
      description: "Un coin pensé pour les plus jeunes avec une sélection jeunesse, un espace adapté et une ambiance accueillante pour les familles.",
      features: ["Coin enfant dédié", "Sélection jeunesse", "Moment lecture en famille"]
    }
  ],

  books: [
    {
      title: "Vos nouveautés",
      author: "Sélection à compléter",
      category: "Nouveautés",
      price: "En librairie",
      badge: "À venir",
      color: "linear-gradient(145deg,#c47e5d,#86503f)",
      description: "Cet emplacement accueillera les vraies nouveautés et leurs couvertures dès qu’elles seront fournies."
    },
    {
      title: "Le coup de cœur",
      author: "Conseil libraire",
      category: "Sélection",
      price: "En librairie",
      badge: "Coup de cœur",
      color: "linear-gradient(145deg,#55705f,#314b3d)",
      description: "Une mise en avant dédiée aux recommandations de la librairie."
    },
    {
      title: "Jeunesse",
      author: "Pour petits lecteurs",
      category: "Jeunesse",
      price: "En librairie",
      badge: "Famille",
      color: "linear-gradient(145deg,#d0a054,#9e713a)",
      description: "Une sélection jeunesse pourra être ajoutée ici avec les vraies références disponibles."
    },
    {
      title: "BD & Manga",
      author: "Sélection du moment",
      category: "BD & Manga",
      price: "En librairie",
      badge: "À découvrir",
      color: "linear-gradient(145deg,#59616f,#343c49)",
      description: "Un emplacement pour les BD, mangas et séries mises en avant sur place."
    }
  ]
};
