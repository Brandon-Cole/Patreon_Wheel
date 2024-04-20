let spinningInterval;
let namesList = [];

function selectNames() {
    const nameInput = document.getElementById('nameInput');
    const fileInput = document.getElementById('fileInput');
    const resultDisplay = document.getElementById('result');

    const enteredNames = nameInput.value.trim().split('\n').map(name => name.trim());
    const file = fileInput.files[0];

    if (enteredNames.length > 0) {
        namesList = enteredNames;
        startSpinning();
        setTimeout(stopSpinning, 2000); // Change duration as needed
    } else if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const csvData = event.target.result;
            namesList = parseCSV(csvData);

            if (namesList.length > 0) {
                startSpinning();
                setTimeout(stopSpinning, 2000); // Change duration as needed
            } else {
                resultDisplay.textContent = 'No valid names found in the CSV file.';
            }
        };

        reader.readAsText(file);
    } else {
        resultDisplay.textContent = 'Please enter names or upload a CSV file.';
    }
}

function parseCSV(csvData) {
    const names = [];
    const rows = csvData.split(/\r\n|\n/);

    rows.forEach(row => {
        const columns = row.split(',');
        const name = columns[0].trim(); // Assuming names are in the first column

        if (name) {
            names.push(name);
        }
    });

    return names;
}

function startSpinning() {
    const resultDisplay = document.getElementById('result');
    let currentIndex = 0;

    spinningInterval = setInterval(() => {
        document.getElementById('slotContent').textContent = namesList[currentIndex];
        currentIndex = (currentIndex + 1) % namesList.length;
    }, 100); // Adjust speed as needed
}

function stopSpinning() {
    clearInterval(spinningInterval);

    const resultDisplay = document.getElementById('result');
    const randomIndex = Math.floor(Math.random() * namesList.length);
    const randomName = namesList[randomIndex];

    resultDisplay.textContent = `Winner: ${randomName}`;
}
