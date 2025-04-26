export const courses = [
  {
    id: 1,
    title: "Italian Cuisine Masterclass",
    description: "Master the art of authentic Italian cooking with our comprehensive course",
    longDescription: "This immersive course takes you on a culinary journey through Italy's rich gastronomic heritage. You'll learn traditional techniques, authentic recipes, and the secrets behind Italy's most beloved dishes. From handmade pasta to perfect risotto, this course covers everything you need to become a master of Italian cuisine.",
    rating: 4.8,
    totalStudents: 1250,
    duration: "8 weeks",
    level: "Intermediate",
    price: "$199",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    features: [
      { icon: "FaUtensils", text: "40+ Video Lessons" },
      { icon: "FaBook", text: "100+ Recipes" },
      { icon: "FaVideo", text: "Lifetime Access" },
      { icon: "FaGraduationCap", text: "Certificate" }
    ],
    whatYouWillLearn: [
      "Master the art of making fresh pasta from scratch",
      "Create authentic Italian sauces and condiments",
      "Perfect the technique of making risotto",
      "Learn traditional Italian meat and seafood preparation",
      "Understand regional Italian cooking variations",
      "Develop plating and presentation skills",
      "Learn wine pairing with Italian dishes",
      "Master Italian dessert making"
    ],
    sampleRecipes: [
      {
        name: "Handmade Tagliatelle with Bolognese",
        description: "Learn to make fresh tagliatelle pasta and authentic Bolognese sauce",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Risotto alla Milanese",
        description: "Classic saffron-infused risotto with bone marrow",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Tiramisu Classico",
        description: "Traditional Italian coffee-flavored dessert",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ],
    instructor: {
      name: "Chef Marco Rossi",
      bio: "With over 15 years of experience in Italian cuisine, Chef Marco has worked in Michelin-starred restaurants across Italy, including Osteria Francescana and La Pergola. He brings his expertise and passion for authentic Italian cooking to this comprehensive course.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      specialties: ["Pasta Making", "Risotto", "Traditional Sauces", "Italian Desserts"],
      experience: [
        "Head Chef at Osteria Francescana (2015-2018)",
        "Sous Chef at La Pergola (2012-2015)",
        "Guest Chef at various Michelin-starred restaurants",
        "Italian Cuisine Consultant for international hotels"
      ]
    },
    curriculum: [
      {
        week: 1,
        title: "Introduction to Italian Cuisine",
        topics: [
          "History and regional variations",
          "Essential Italian ingredients",
          "Basic cooking techniques",
          "Kitchen setup and tools"
        ],
        duration: "2 hours",
        lessons: [
          "Understanding Italian culinary regions",
          "Essential pantry items",
          "Basic knife skills",
          "Cooking with olive oil"
        ]
      },
      {
        week: 2,
        title: "Pasta Making Mastery",
        topics: [
          "Fresh pasta dough techniques",
          "Traditional pasta shapes",
          "Stuffed pasta varieties",
          "Perfect pasta cooking methods"
        ],
        duration: "3 hours",
        lessons: [
          "Making fresh egg pasta",
          "Shaping tagliatelle and pappardelle",
          "Creating stuffed ravioli",
          "Perfect pasta cooking techniques"
        ]
      }
    ],
    certificate: {
      title: "Italian Cuisine Master Certificate",
      description: "This prestigious certificate is awarded upon successful completion of all course modules, practical assignments, and final assessment. It recognizes your mastery of authentic Italian cooking techniques and recipes.",
      image: "https://images.unsplash.com/photo-1589330694653-a3c8b7b1c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      benefits: [
        "Recognized by Italian culinary institutions",
        "Valid for professional development",
        "Can be shared on LinkedIn and professional networks",
        "Access to exclusive alumni network",
        "Eligibility for advanced courses"
      ]
    },
    requirements: [
      "Basic cooking experience",
      "Access to standard kitchen equipment",
      "Willingness to learn and practice",
      "Passion for Italian cuisine",
      "Basic understanding of cooking terms",
      "Access to quality ingredients"
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Home Chef",
        text: "This course transformed my cooking! The techniques I learned are now part of my daily cooking routine. The pasta-making module was particularly valuable.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Michael Chen",
        role: "Restaurant Owner",
        text: "As a professional chef, I found the advanced techniques and traditional methods incredibly valuable. The course helped me elevate my Italian menu.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  },
  {
    id: 2,
    title: "Baking Fundamentals",
    description: "Master the art of baking with this comprehensive course",
    longDescription: "Learn the essential techniques and science behind baking. From bread to pastries, this course covers everything you need to become a confident baker. Perfect for beginners and intermediate bakers alike.",
    rating: 4.6,
    totalStudents: 980,
    duration: "6 weeks",
    level: "Beginner to Intermediate",
    price: "$149",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    features: [
      { icon: "FaUtensils", text: "30+ Video Lessons" },
      { icon: "FaBook", text: "50+ Recipes" },
      { icon: "FaVideo", text: "Lifetime Access" },
      { icon: "FaGraduationCap", text: "Certificate" }
    ],
    whatYouWillLearn: [
      "Master basic baking techniques",
      "Understand the science of baking",
      "Create perfect bread and pastries",
      "Learn cake decorating basics",
      "Develop cookie and biscuit skills",
      "Understand ingredient functions",
      "Learn proper measuring techniques",
      "Master oven temperature control"
    ],
    sampleRecipes: [
      {
        name: "Classic French Baguette",
        description: "Learn to make authentic French baguettes with perfect crust and crumb",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Chocolate Croissants",
        description: "Master the art of making flaky, buttery croissants",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ],
    instructor: {
      name: "Chef Marie Laurent",
      bio: "With over 12 years of experience in French baking, Chef Marie has worked in prestigious bakeries across France and now shares her expertise through online courses.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      specialties: ["Bread Making", "Pastry", "Cake Decorating", "French Baking"],
      experience: [
        "Head Baker at Ladurée Paris (2016-2020)",
        "Pastry Chef at Le Cordon Bleu (2012-2016)",
        "Baking Instructor at various culinary schools",
        "Author of 'The Art of French Baking'"
      ]
    },
    curriculum: [
      {
        week: 1,
        title: "Baking Basics",
        topics: [
          "Understanding ingredients",
          "Essential equipment",
          "Basic techniques",
          "Temperature control"
        ],
        duration: "2 hours",
        lessons: [
          "Flour types and uses",
          "Yeast and leavening agents",
          "Measuring techniques",
          "Oven temperature management"
        ]
      },
      {
        week: 2,
        title: "Bread Making",
        topics: [
          "Yeast bread basics",
          "Kneading techniques",
          "Proofing methods",
          "Baking bread"
        ],
        duration: "3 hours",
        lessons: [
          "Basic white bread",
          "Whole grain bread",
          "Sourdough starter",
          "Baguette making"
        ]
      }
    ],
    certificate: {
      title: "Baking Fundamentals Certificate",
      description: "This certificate recognizes your mastery of fundamental baking techniques and recipes.",
      image: "https://images.unsplash.com/photo-1589330694653-a3c8b7b1c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      benefits: [
        "Recognized by baking institutions",
        "Valid for professional development",
        "Can be shared on professional networks",
        "Access to baking community"
      ]
    },
    requirements: [
      "Basic kitchen equipment",
      "Access to an oven",
      "Willingness to practice",
      "Interest in baking",
      "Basic measuring tools",
      "Quality ingredients"
    ],
    testimonials: [
      {
        name: "John Smith",
        role: "Home Baker",
        text: "This course gave me the confidence to start my own home bakery. The techniques are explained clearly and the recipes are foolproof.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        name: "Lisa Brown",
        role: "Café Owner",
        text: "The bread-making module alone was worth the price of the course. My customers love the fresh bread we now serve.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  }
]; 