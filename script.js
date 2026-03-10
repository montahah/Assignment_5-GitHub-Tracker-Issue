const allIssue = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const issueContainer = document.getElementById("issueContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
let allIssuesData = [];
// Buttons
const allButton = document.getElementById("allBtn");
const openButton = document.getElementById("openBtn");
const closedButton = document.getElementById("closedBtn");
const buttonContainer = document.getElementById("btnContainer");

// Status
const allStatus = document.getElementById("allStatus");
const openStatus = document.getElementById("openStatus");
const closedStatus = document.getElementById("closedStatus");

// Modal Information
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalStatus = document.getElementById("modalStatus");
const modalOpen = document.getElementById("modalOpened");
const modalName = document.querySelectorAll(".modalName");
const modalDate = document.getElementById("modalDate");
const modalPriority = document.getElementById("modalPriority");
const modalLabels = document.getElementById("modalLabels");

// Modal
const issueModal = document.getElementById("issue-details-modal");

async function issueModalOpen(issueId) {
  console.log(issueId, "issueId");

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  );
  const data = await res.json();
  const issueDetails = data.data;
  console.log(issueDetails, "data");
  modalTitle.textContent = issueDetails.title;
  modalDescription.textContent = issueDetails.description;
  modalName[0].textContent = issueDetails.assignee;
  modalName[1].textContent = issueDetails.assignee;
  modalDate.textContent = issueDetails.createdAt;
  modalPriority.textContent = issueDetails.priority;
  // modalLabels.textContent = issueDetails.labels;
  // modalLabels.classList.add("badge", "badge-outline", "uppercase");
  // issueDetails.labels.map((issue) => {
  //   console.log(issue);
  // });
  modalLabels.innerHTML = issueDetails.labels
    .map(
      (label) => `
    <div class="badge badge-outline uppercase ${label}">
      <i class="fa-solid fa-sun"></i>
      ${label}
    </div>
  `,
    )
    .join("");

  // modalLabels.innerHTML = ''

  if (issueDetails.status === "open") {
    modalStatus.classList.add("btn-success");
    modalStatus.textContent = "Opened";
    modalOpen.textContent = "Opened";
  } else {
    modalStatus.classList.remove("btn-success");
    modalStatus.classList.add("bg-purple-600");
    modalStatus.textContent = "Closed";
    modalOpen.textContent = "Closed";
  }

  issueDetailsModal.showModal();
}

// Load Issues
async function loadIssues() {
  loadingSpinner.classList.remove("hidden");
  const res = await fetch(allIssue);
  const data = await res.json();
  allIssuesData = data.data;

  loadingSpinner.classList.add("hidden");
  specificDisplayIssue(allStatus);
  data.data.forEach((issue) => {
    displayIssue(issue);
  });
}
loadIssues();

function statusCount() {
  const total = allIssuesData.length;

  const open = allIssuesData.filter((i) => i.status === "open").length;
  const closed = allIssuesData.filter((i) => i.status === "closed").length;

  document.querySelector("#allStatus").textContent = total;
  document.querySelector("#allStatus").textContent = open;
  document.querySelector("#allStatus").textContent = closed;
}

function specificDisplayIssue(filter) {
  issueContainer.innerHTML = "";
  // const filtered = allIssuesData.filter((issue) => {
  //   if (filter === "open") return issue.status === "open";
  //   if (filter === "closed") return issue.status === "closed";
  // });
  const filtered =
    filter === allStatus
      ? allIssuesData
      : allIssuesData.filter((issue) => issue.status === filter);
  allStatus.textContent = filtered.length;
  filtered.forEach((issue) => displayIssue(issue));
}
specificDisplayIssue();

// Buttons

allButton.addEventListener("click", function () {
  closedStatus.classList.remove("hidden");
  openStatus.classList.remove("hidden");
  allButton.classList.add("btn-primary");
  openButton.classList.remove("btn-primary");
  closedButton.classList.remove("btn-primary");
  specificDisplayIssue(loadIssues());
});
openButton.addEventListener("click", function () {
  closedStatus.classList.add("hidden");
  openStatus.classList.remove("hidden");
  allButton.classList.remove("btn-primary");
  openButton.classList.add("btn-primary");
  closedButton.classList.remove("btn-primary");
  specificDisplayIssue("open");
});
closedButton.addEventListener("click", function () {
  openStatus.classList.add("hidden");
  closedStatus.classList.remove("hidden");
  allButton.classList.remove("btn-primary");
  openButton.classList.remove("btn-primary");
  closedButton.classList.add("btn-primary");
  specificDisplayIssue("closed");
});

// Display Function
function displayIssue(issue) {
  const issueCard = document.createElement("div");
  issueCard.className = `card bg-base-100 shadow-lg border-t-4 ${
    issue.status === "open" ? "border-green-400" : "border-purple-400"
  }`;

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
  <div class="card-body" >
            <header class="flex justify-between">
              <img src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
              <div class="badge badge-soft ${issue.priority === "medium" ? "badge-warning uppercase font-semibold" : issue.priority === "low" ? "badge-neutral font-semibold uppercase" : "badge-error font-semibold uppercase"} ">${issue.priority}</div>
            </header>
            <h2 class="card-title " onclick="issueModalOpen(${issue.id})">${issue.title}</h2>
            <p class="line-clamp-2 text-gray-500">
              ${issue.description}
            </p>
            <div class="flex gap-2 mb-2">
              ${labelsHTML}
            </div>
            <hr class="text-gray-300" />
            <div class="author-text text-gray-500">
              <p># <span>${issue.id}</span> by <span>${issue.author}</span></p>
              <p>${issue.createdAt}</p>
            </div>
          </div>
  `;
  issueContainer.appendChild(issueCard);
}
// Icon
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
// Label
function labelClass(label) {
  const classes = {
    bug: "px-[2px] badge-error font-semibold uppercase",
    enhancement: "px-[2px] badge-success font-semibold  uppercase",
    documentation: "px-[2px] badge-info font-semibold uppercase",
    "help wanted": "px-[2px] badge-warning font-semibold uppercase",
    "good first issue":
      "px-[2px] text-[13px] badge-secondary font-semibold uppercase",
  };
  return classes[label] || "badge-neutral font-semibold uppercase";
}
