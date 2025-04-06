let currentAccount = '';
let balance = 0;
const purchases = {};

// Use Web3.js if you haven't already included it
if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(window.ethereum);
}

document.getElementById('connectButton').addEventListener('click', async function () {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            currentAccount = accounts[0];
            document.getElementById('accountInfo').textContent = `Connected: ${currentAccount}`;
            await updateBalance(); // Wait for balance to be updated
        } catch (error) {
            console.error(error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    } else {
        alert('Please install MetaMask to connect your account.');
    }
});

async function updateBalance() {
    if (currentAccount) {
        try {
            const balanceInWei = await window.web3.eth.getBalance(currentAccount);
            balance = parseFloat(window.web3.utils.fromWei(balanceInWei, 'ether'));
            document.getElementById('balanceInfo').textContent = `Balance: ${balance} ETH`;
        } catch (error) {
            console.error('Error fetching balance:', error);
            alert('Could not fetch the balance. Please check the console for details.');
        }
    }
}

async function purchaseMedicine(medicineName) {
    if (balance >= 1) {
        // Deduct 1 ETH by sending a transaction to the smart contract
        const transactionParameters = {
            to: '0xbbf5df5b6f40438fba5801db6293d88473f77abb', // Replace with your deployed contract address dito lalagay address
            from: currentAccount,
            value: web3.utils.toHex(web3.utils.toWei('1', 'ether')), // Sending 1 ETH
            gas: '21000', // Adjust if needed
        };

        try {
            // Send the transaction
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });

            // Update the purchased items
            if (purchases[medicineName]) {
                purchases[medicineName] += 1;
            } else {
                purchases[medicineName] = 1;
            }
            
            updatePurchasedTable();
            alert(`You have purchased ${medicineName}. Transaction Hash: ${txHash}`);
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed. Please check the console for details.');
        }
    } else {
        alert('Insufficient balance to purchase this medicine.');
    }
}

function updatePurchasedTable() {
    const tableBody = document.getElementById('purchasedTableBody');
    tableBody.innerHTML = ''; // Clear existing entries

    for (const [medicineName, quantity] of Object.entries(purchases)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${medicineName}</td><td>${quantity}</td>`;
        tableBody.appendChild(row);
    }
}
