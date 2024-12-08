const data = [
    {
        id: 1,
        tags: ["shoes", "clothing"],
        types: "kids",
        name: "Vibox With Mesh Lining",
        rating: 3.5,
        price: { min: 50, max: 90 },
        img: "png/1.jpg",
        link: "1index.html"
    },
    {
        id: 2,
        tags: ["shoes", "clothing"],
        types: "man",
        name: "Comfort Flex Shoes",
        rating: 2.5,
        price: { min: 80, max: 120 },
        img: "png/2.jpg",
        link: "1index.html"
    },
    {
        id: 3,
        tags: ["shoes", "clothing"],
        types: "women",
        name: "Trail Runner Pro",
        rating: 5,
        price: { min: 100, max: 150 },
        img: "png/3.jpg",
        link: "1index.html"
    },
    {
        id: 4,
        tags: ["shoes", "sportswear"],
        types: "woman",
        name: "Air Glide Sneakers",
        rating: 4.2,
        price: { min: 60, max: 100 },
        img: "png/4.jpg",
        link: "1index.html"
    },
    {
        id: 5,
        tags: ["shoes", "clothing"],
        types: "man",
        name: "Classic Retro Runners",
        rating: 4.8,
        price: { min: 70, max: 110 },
        img: "png/5.jpg",
        link: "1index.html"
    },
    {
        id: 6,
        tags: ["shoes", "clothing"],
        types: "kid",
        name: "Street Style Kicks",
        rating: 3.9,
        price: { min: 45, max: 85 },
        img: "png/4.jpg",
        link: "1index.html"
    },
    {
        id: 7,
        tags: ["shoes", "sportswear"],
        types: "kid",
        name: "Dynamic Fit Sneakers",
        rating: 4.7,
        price: { min: 90, max: 140 },
        img: "png/1.jpg",
        link: "1index.html"
    },
    {
        id: 8,
        tags: ["shoes", "clothing"],
        types: "woman",
        name: "Urban Casual Sneakers",
        rating: 4.0,
        price: { min: 50, max: 95 },
        img: "png/4.jpg",
        link: "1index.html"
    },
    {
        id: 9,
        tags: ["shoes", "clothing"],
        types: "man",
        name: "High Performance Runners",
        rating: 4.5,
        price: { min: 85, max: 130 },
        img: "png/2.jpg",
        link: "1index.html"
    },
    {
        id: 10,
        tags: ["shoes", "sportswear"],
        types: "kid",
        name: "Energy Boost Trail Shoes",
        rating: 4.9,
        price: { min: 100, max: 160 },
        img: "png/4.jpg",
        link: "1index.html"
    },
    {
        id: 11,
        tags: ["shoes", "clothing"],
        types: "woman",
        name: "Comfy Step Sneakers",
        rating: 3.8,
        price: { min: 40, max: 70 },
        img: "png/5.jpg",
        link: "1index.html"
    },
    {
        id: 12,
        tags: ["shoes", "clothing"],
        types: "man",
        name: "ProFit Sneakers",
        rating: 4.6,
        price: { min: 95, max: 145 },
        img: "png/4.jpg",
        link: "1index.html"
    },
    {
        id: 13,
        tags: ["shoes", "clothing"],
        types: "woman",
        name: "Floral Breeze Sneakers",
        rating: 4.3,
        price: { min: 60, max: 110 },
        img: "png/2.jpg",
        link: "1index.html"
    }
];

  
  let currentIndex = 0;
  let filteredData = [...data];
  const itemsToShow = 3;
  
  const container = document.getElementById("offers-container");
  const btnLeft = document.getElementById("swipe-left");
  const btnRight = document.getElementById("swipe-right");
  
  function generateOfferHTML(product) {
    return `
      <div class="offer-item">
        <a href="1index.html">
          <img src="${product.img}" alt="${product.name}">
        </a>
        <div class="info">
          <p class="category">${product.tags.join(", ").toUpperCase()}</p>
          <div class="stars">${generateStars(product.rating)}</div>
          <a href="1index.html" class="name">${product.name}</a>
          <p class="price">$${product.price.min} - $${product.price.max}</p>
        </div>
      </div>
    `;
  }
  
  function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return "★".repeat(fullStars) + (halfStar ? "☆" : "") + "☆".repeat(emptyStars);
  }
  
  function renderOffers() {
    const start = currentIndex * itemsToShow;
    const end = start + itemsToShow;
    const currentPageData = filteredData.slice(start, end);
    container.innerHTML = currentPageData.map(generateOfferHTML).join("");
  }
  
  function filterOffers(type) {
    currentIndex = 0;
    if (type === "all") {
      filteredData = [...data];
    } else {
      filteredData = data.filter(product => product.types === type);
    }
    renderOffers();
  }
  
  btnLeft.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderOffers();
    }
  });
  
  btnRight.addEventListener("click", () => {
    const maxIndex = Math.ceil(filteredData.length / itemsToShow) - 1;
    if (currentIndex < maxIndex) {
      currentIndex += 1;
      renderOffers();
    }
  });
  
  renderOffers();
  