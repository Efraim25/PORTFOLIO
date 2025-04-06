let patientRecords = []; // Array to hold patient records
let currentAccount = ''; // Variable to store the connected account

// Connect to MetaMask
document.getElementById('connectButton')?.addEventListener('click', async function () {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            currentAccount = accounts[0]; // Store the connected account
            document.getElementById('accountInfo').textContent = `Connected: ${currentAccount}`;
        } catch (error) {
            console.error(error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    } else {
        alert('Please install MetaMask to connect your account.');
    }
});

// Handle patient record submission
document.getElementById('addPatientForm')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve form values
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const diagnosis = document.getElementById('diagnosis').value;
    const treatment = document.getElementById('treatment').value;

    // Create a unique hash for the record based on patient details
    const recordHash = createHash(name, age, height, weight, diagnosis, treatment);

    // Create a new patient record object
    const patientRecord = {
        name,
        age: parseInt(age),
        height: parseInt(height),
        weight: parseInt(weight),
        diagnosis,
        treatment,
        addedBy: currentAccount || 'Not connected', // Use the connected MetaMask account
        timestamp: new Date().toLocaleString(),
        hash: recordHash // Include the unique hash
    };

    // Add to patient records
    patientRecords.push(patientRecord);

    // Store patient records in localStorage to persist data across pages
    localStorage.setItem('patientRecords', JSON.stringify(patientRecords));

    // Notify the user and redirect to the home page
    alert('Patient record added successfully! Redirecting to home.');
    window.location.href = 'finals.html'; // Redirect to the home page
});

// Function to create a unique hash based on patient details
function createHash(name, age, height, weight, diagnosis, treatment) {
    return btoa(`${name}-${age}-${height}-${weight}-${diagnosis}-${treatment}-${Date.now()}`);
}

// Load patient records from localStorage and display them in the table
function loadPatientRecords() {
    const storedRecords = localStorage.getItem('patientRecords');
    if (storedRecords) {
        patientRecords = JSON.parse(storedRecords); // Parse stored records

        const tableBody = document.getElementById('patientRecordsTableBody');
        tableBody.innerHTML = ''; // Clear existing records

        // Populate the table with all patient records
        patientRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.age}</td>
                <td>${record.height}</td>
                <td>${record.weight}</td>
                <td>${record.diagnosis}</td>
                <td>${record.treatment}</td>
                <td>${record.addedBy}</td> <!-- Display the MetaMask account -->
                <td>${record.timestamp}</td>
                <td>${record.hash}</td> <!-- Display the unique hash -->
            `;
            tableBody.appendChild(row);
        });
    }
}

// Call loadPatientRecords when the page loads
window.onload = function () {
    loadPatientRecords();
};
