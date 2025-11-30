let fields = [
    null,
    "cross",
    null,
    "circle",
    null,
    null,
    null,
    null,
    null];

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
        ("circle");
      }

      tableHTML += `<td>${cellContent}</td>`;
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  document.getElementById("content").innerHTML = tableHTML;
}

// Erzeugt ein animiertes SVG-Kreis-Icon als HTML-String
function svgCircleAnimated({
  size = 70,
  color = "#00B0EF",
  strokeWidth = 4,
  duration = "500ms"
} = {}) {
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

function svgCrossAnimated({
  size = 70,
  color = "#FFC000",
  strokeWidth = 4,
  duration = "0.5s"
} = {}) {

  const half = size / 2;
  const offset = strokeWidth; // kleiner Randabstand
  const start = offset;
  const end = size - offset;

  // Länge der Linie (diagonal kehrt der Satz des Pythagoras zurück)
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

    /* zweite Linie startet leicht zeitversetzt */
    .delay {
      animation-delay: 0.2s;
    }

    @keyframes draw {
      to { stroke-dashoffset: 0; }
    }
  </style>

  <!-- Diagonalen des X -->
  <line class="line" x1="${start}" y1="${start}" x2="${end}" y2="${end}" />
  <line class="line delay" x1="${start}" y1="${end}" x2="${end}" y2="${start}" />
</svg>
`;
}
