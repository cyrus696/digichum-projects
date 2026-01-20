const properties = [
    {
      title: "Luxury Villa",
      location: "Mumbai",
      type: "Villa",
      price: 25000000,
      image: "villa.jpg"
    },
    {
      title: "Modern Apartment",
      location: "Pune",
      type: "Apartment",
      price: 12000000,
      image: "apartment.jpg"
    },
    {
      title: "Premium Plot",
      location: "Bangalore",
      type: "Plot",
      price: 8000000,
      image: "plot.jpg"
    }
  ];
  
  const grid = document.getElementById("propertyGrid");
  
  function displayProperties(data) {
    grid.innerHTML = "";
  
    if (data.length === 0) {
      grid.innerHTML = "<p>No properties found</p>";
      return;
    }
  
    data.forEach(p => {
      grid.innerHTML += `
        <div class="property-card">
          <img src="${p.image}" />
          <div class="property-info">
            <h3>${p.title}</h3>
            <p>${p.location}</p>
            <p>${p.type}</p>
            <p>₹ ${p.price.toLocaleString()}</p>
            <button>View Details</button>
          </div>
        </div>
      `;
    });
  }
  
  function filterProperties() {
    const keyword = document.getElementById("keyword").value.toLowerCase();
    const location = document.getElementById("location").value;
    const type = document.getElementById("type").value;
    const price = document.getElementById("price").value;
  
    const filtered = properties.filter(p =>
      (keyword === "" || p.title.toLowerCase().includes(keyword)) &&
      (location === "" || p.location === location) &&
      (type === "" || p.type === type) &&
      (price === "" || p.price <= price)
    );
  
    displayProperties(filtered);
  }
  
  displayProperties(properties);
  
  function openSearchPanel() {
    document.getElementById("searchPanel").classList.add("active");
    document.getElementById("overlay").classList.add("active");
  }
  
  function closeSearchPanel() {
    document.getElementById("searchPanel").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
  }

  function toggleMenu() {
    document.querySelector(".navbar nav").classList.toggle("active");
  }

