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
  console.log(issue);
  const issueCard = document.createElement("div");
  issueCard.className = "card bg-base-100 shadow-lg";
  issueCard.innerHTML = `
  <div class="card-body">
            <header class="flex justify-between">
              <img src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
              <div class="badge badge-soft badge-warning">${issue.priority}</div>
            </header>
            <h2 class="card-title">${issue.title}</h2>
            <p>
              ${issue.description}
            </p>
            <div class="flex gap-5">
              <div class="badge badge-secondary badge-outline">${issue.labels[0]}</div>
              <div class="badge badge-warning badge-outline">${issue.labels[1]}</div>
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
