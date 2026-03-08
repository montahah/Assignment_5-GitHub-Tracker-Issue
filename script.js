const allIssue = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const issueContainer = document.getElementById("issueContainer");
console.log(issueContainer);

async function loadIssues() {
  const res = await fetch(allIssue);
  const data = await res.json();
  data.data.forEach((issue) => {
    // console.log(issue);
    displayIssue(issue);
  });
}
loadIssues();

// Display Function
function displayIssue(issue) {
  const issueCard = document.createElement("div");
  issueCard.className = "card bg-base-100 shadow-lg";

  const labelsHTML = issue.labels
    .map(
      (label) => `
    <div class="badge badge-outline ${labelClass(label)}">
    <i class="fa-solid ${labelIcon(label)}"></i>
    ${label}</div>
    `,
    )
    .join("");
  issueCard.innerHTML = `
  <div class="card-body">
            <header class="flex justify-between">
              <img src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
              <div class="badge badge-soft ${issue.priority === "medium" ? "badge-error uppercase font-semibold" : issue.priority === "low" ? "badge-success font-semibold uppercase" : "badge-neutral font-semibold uppercase"} ">${issue.priority}</div>
            </header>
            <h2 class="card-title">${issue.title}</h2>
            <p class="truncate">
              ${issue.description}
            </p>
            <div class="flex gap-5">
              ${labelsHTML}
            </div>
            <hr class="text-gray-300" />
            <div class="author-text">
              <p># <span>${issue.id}</span> by <span>${issue.author}</span></p>
              <p>${issue.createdAt}</p>
            </div>
          </div>
  `;
  issueContainer.appendChild(issueCard);
}
function labelIcon(label) {
  const iconClasses = {
    bug: "fa-bug",
    enhancement: "fa-star",
    documentation: "fa-sun",
    "help wanted": "fa-handshake-angle",
    "good first issue": "fa-circle-plus",
  };
  return iconClasses[label];
}

function labelClass(label) {
  const classes = {
    bug: " badge-error font-semibold uppercase",
    enhancement: "badge-success font-semibold uppercase",
    documentation: "badge-warning font-semibold uppercase",
    "help wanted": "badge-info font-semibold uppercase",
    "good first issue": "badge-secondary font-semibold uppercase",
  };
  return classes[label] || "badge-neutral font-semibold uppercase";
}
