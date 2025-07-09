// Show loading spinner
window.addEventListener("DOMContentLoaded", () => {
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.innerHTML = '<div style="color:white;text-align:center;margin-top:20%;font-size:25px;">Loading...</div>';
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.remove();
    renderContent(); // Load main movie content
  }, 2000);
});

// Logout function
function logout() {
  localStorage.removeItem("user");
  alert("Logged out!");
  window.location.href = "signup.html";
}

// Render content from YouTube API
async function renderContent() {
  const contentData = [
    {
      title: "Netflix Originals",
      large: true,
      movies: [
        { title: "Money Heist" },
        { title: "Stranger Things" }
      ]
    },
    {
      title: "Trending Now",
      movies: [
        { title: "Wednesday Netflix" },
        { title: "Extraction 2" }
      ]
    }
  ];

  const apiKey = "AIzaSyC5JiEzIIiWg7BKBezPxPYRmDznh7XoewI"; 
  const mainContent = document.getElementById("main-content");

  for (const row of contentData) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");

    const titleEl = document.createElement("h2");
    titleEl.textContent = row.title;
    rowElement.appendChild(titleEl);

    const posters = document.createElement("div");
    posters.classList.add("row__posters");

    for (const movie of row.movies) {
      try {
        const searchQuery = encodeURIComponent(movie.title + " official trailer");
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchQuery}&key=${apiKey}`);
        const data = await response.json();
        const videoId = data?.items?.[0]?.id?.videoId;

        if (!videoId) continue;

        const img = document.createElement("img");
        img.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        img.alt = movie.title;
        img.classList.add("row__poster");
        if (row.large) img.classList.add("row__posterLarge");

        img.style.cursor = "pointer";
        img.onclick = () => createTrailerModal(`https://www.youtube.com/embed/${videoId}?autoplay=1`);

        posters.appendChild(img);
      } catch (err) {
        console.error("YouTube fetch error:", err);
      }
    }

    rowElement.appendChild(posters);
    mainContent.appendChild(rowElement);
  }
}

// Search filtering
document.addEventListener("input", (e) => {
  if (e.target.id === "searchInput") {
    const searchTerm = e.target.value.toLowerCase();
    const posters = document.querySelectorAll(".row__poster");

    posters.forEach(poster => {
      const title = poster.alt.toLowerCase();
      const wrapper = poster.closest("div.row__posters > *") || poster.parentElement;
      wrapper.style.display = title.includes(searchTerm) ? "inline-block" : "none";
    });
  }
});

// Trailer modal popup
function createTrailerModal(videoURL) {
  const modal = document.createElement("div");
  modal.id = "trailerModal";
  Object.assign(modal.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  });

  const iframe = document.createElement("iframe");
  iframe.src = videoURL;
  iframe.width = "800";
  iframe.height = "450";
  iframe.allow = "autoplay; encrypted-media";
  iframe.allowFullscreen = true;
  iframe.style.border = "none";
  iframe.style.borderRadius = "10px";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✖";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "20px",
    right: "30px",
    fontSize: "30px",
    color: "white",
    background: "transparent",
    border: "none",
    cursor: "pointer"
  });
  closeBtn.onclick = () => modal.remove();

  modal.appendChild(closeBtn);
  modal.appendChild(iframe);
  document.body.appendChild(modal);
}
