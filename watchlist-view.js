document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("watchlist-container");
  const list = JSON.parse(localStorage.getItem("watchlist") || "[]");

  if (list.length === 0) {
    container.innerHTML = "<p style='color:white;font-size:20px;'>No movies added to your watchlist yet.</p>";
    return;
  }

  list.forEach(title => {
    const wrapper = document.createElement("div");
    wrapper.style.margin = "10px";
    wrapper.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = "lg1.jpg"; // Replace with real thumbnails if you store them
    img.alt = title;
    img.classList.add("row__posterLarge");

    const name = document.createElement("p");
    name.style.color = "white";
    name.innerText = title;

    const btn = document.createElement("button");
    btn.innerText = "Remove ❌";
    btn.style.marginTop = "5px";
    btn.style.background = "darkred";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.cursor = "pointer";

    btn.onclick = () => {
      const newList = list.filter(item => item !== title);
      localStorage.setItem("watchlist", JSON.stringify(newList));
      location.reload();
    };

    wrapper.appendChild(img);
    wrapper.appendChild(name);
    wrapper.appendChild(btn);
    container.appendChild(wrapper);
  });
});
