function randomColor() {
    const r = Math.floor(Math.random() * 256); // Generate random red component (0-255)
    const g = Math.floor(Math.random() * 256); // Generate random green component (0-255)
    const b = Math.floor(Math.random() * 256); // Generate random blue component (0-255)
    return { r, g, b }; // Return an object containing RGB components
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width; // Get canvas width
const height = canvas.height; // Get canvas height

const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2 - 30; // Reduce radius to stay within canvas bounds

let textareaValue = document.getElementsByTagName("textarea")[0].value;
let items = textareaValue.split("\n").filter(item => item.trim() !== ''); // Split textarea value by newline and filter out empty items

let currentDeg = 0;
let step = 360 / items.length;
let colors = [];
for (let i = 0; i < items.length; i++) {
    colors.push(randomColor());
}

function draw() {
    ctx.clearRect(0, 0, width, height); // Clear canvas before drawing

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgb(33, 33, 33)";
    ctx.fill();

    let startDeg = currentDeg;
    for (let i = 0; i < items.length; i++, startDeg += step) {
        let endDeg = startDeg + step;

        // Draw colored sector
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg));
        ctx.fillStyle = `rgb(${colors[i].r}, ${colors[i].g}, ${colors[i].b})`;
        ctx.lineTo(centerX, centerY);
        ctx.fill();
    }
}

// Helper function to convert degrees to radians
function toRad(degrees) {
    return degrees * Math.PI / 180;
}

// Call draw function to render the wheel
draw();
