// Add to Watchlist (simulated)
document.addEventListener("DOMContentLoaded", () => {
  const posters = document.querySelectorAll(".row__poster");
  posters.forEach(poster => {
    const wrapper = poster.closest("a");
    const btn = document.createElement("button");
    btn.innerText = "❤️";
    btn.style.marginTop = "10px";
    btn.style.background = "transparent";
    btn.style.color = "red";
    btn.style.border = "none";
    btn.style.cursor = "pointer";

    btn.onclick = (e) => {
      e.preventDefault();
      const title = poster.alt;
      let list = JSON.parse(localStorage.getItem("watchlist") || "[]");
      if (!list.includes(title)) {
        list.push(title);
        localStorage.setItem("watchlist", JSON.stringify(list));
        alert(`Added "${title}" to your Watchlist!`);
      } else {
        alert(`"${title}" is already in your Watchlist.`);
      }
    };

    wrapper.parentElement.appendChild(btn);
  });
});
