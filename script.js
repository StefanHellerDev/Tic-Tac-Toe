let currentPlayer = "circle";
let fields = [null, null, null, null, null, null, null, null, null];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function init() {
  render();
}

function render() {
  let tableHTML = "<table>";

  for (let i = 0; i < 3; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      const field = fields[index];
      let cellContent = "";

      if (field === "circle") {
        cellContent = svgCircleAnimated();
      } else if (field === "cross") {
        cellContent = svgCrossAnimated();
      }

      tableHTML += `<td onclick="handleClick(${index}, this)">${cellContent}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  document.getElementById("content").innerHTML = tableHTML;
}

function handleClick(index, tdElement) {
  if (fields[index] !== null) return;

  fields[index] = currentPlayer;

  if (currentPlayer === "circle") {
    tdElement.innerHTML = svgCircleAnimated();
  } else {
    tdElement.innerHTML = svgCrossAnimated();
  }

  tdElement.onclick = null;

  const winningCombo = checkWin();
  if (winningCombo) {
    drawWinningLine(winningCombo);

    document.getElementById("restartBtn").classList.add("pulse");

    document.querySelectorAll("td").forEach((td) => (td.onclick = null));
    return;
  }

  if (checkDraw()) {
    document.getElementById("restartBtn").classList.add("pulse");

    document.querySelectorAll("td").forEach((td) => (td.onclick = null));
    return;
  }

  currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
}

function checkWin() {
  for (const combo of winConditions) {
    const [a, b, c] = combo;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return combo;
    }
  }
  return null;
}

function checkDraw() {
  return fields.every((f) => f !== null) && !checkWin();
}

function restartGame() {
  fields = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "circle";

  document.getElementById("restartBtn").classList.remove("pulse");

  document.querySelectorAll(".win-line").forEach((line) => line.remove());

  render();
}

function drawWinningLine(combo) {
  const cells = combo.map((i) => document.querySelectorAll("td")[i]);

  const rect1 = cells[0].getBoundingClientRect();
  const rect3 = cells[2].getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2;
  const y1 = rect1.top + rect1.height / 2 - 3;
  const x3 = rect3.left + rect3.width / 2;
  const y3 = rect3.top + rect3.height / 2 - 3;

  const dx = x3 - x1;
  const dy = y3 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const line = document.createElement("div");
  line.classList.add("win-line");

  line.style.position = "fixed";
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.width = `${length}px`;
  line.style.height = "6px";
  line.style.backgroundColor = "white";
  line.style.transformOrigin = "left center";
  line.style.transform = `rotate(${angle}deg)`;
  line.style.zIndex = 1000;

  document.body.appendChild(line);
}

function svgCircleAnimated({ size = 70, color = "#00B0EF", strokeWidth = 4, duration = "250ms" } = {}) {
  const cx = size / 2;
  const r = (size - strokeWidth) / 2;
  const circumference = (2 * Math.PI * r).toFixed(2);

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
  <style>
    .stroke {
      fill: none;
      stroke: ${color};
      stroke-width: ${strokeWidth};
      stroke-linecap: round;
      stroke-dasharray: ${circumference};
      stroke-dashoffset: ${circumference};
      transform-origin: ${cx}px ${cx}px;
      transform: rotate(-90deg); /* Start oben */
      animation: draw ${duration} linear forwards;
    }

    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  </style>

  <circle class="stroke" cx="${cx}" cy="${cx}" r="${r}"></circle>
</svg>`;
}

function svgCrossAnimated({ size = 70, color = "#FFC000", strokeWidth = 4, duration = "250ms" } = {}) {
  const half = size / 2;
  const offset = strokeWidth;
  const start = offset;
  const end = size - offset;

  const lineLength = Math.sqrt((end - start) ** 2 * 2).toFixed(2);

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

  <style>
    .line {
      fill: none;
      stroke: ${color};
      stroke-width: ${strokeWidth};
      stroke-linecap: round;
      stroke-dasharray: ${lineLength};
      stroke-dashoffset: ${lineLength};
      animation: draw ${duration} linear forwards;
    }

    .delay {
      animation-delay: 0.2s;
    }

    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  </style>

  <line class="line" x1="${start}" y1="${start}" x2="${end}" y2="${end}" />
  <line class="line delay" x1="${start}" y1="${end}" x2="${end}" y2="${start}" />
</svg>
`;
}
