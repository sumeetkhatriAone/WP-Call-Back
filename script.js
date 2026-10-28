// --- 1. LOGIN LOGIC (For index.html) ---
function handleLogin(event) {
    event.preventDefault(); // Stop form from refreshing page
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    // Hardcoded credentials
    if (username === "123" && password === "123") {
        // Save login state to browser session
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'auctions.html'; // Go to next page
    } else {
        errorMsg.textContent = "Invalid ID or Password. Please try again.";
        errorMsg.classList.remove('d-none');
    }
}

// --- 2. AUCTION PAGE LOGIC (For auctions.html) ---
const AUCTIONS = [
    { id: "A-26-9734", name: "THE INDIA CEMENTS LIMITED (UNIT: VISHNUPURAM WORKS)" },
    { id: "A-26-9735", name: "Hindalco Industries Limited - Hirakud (Unit: Hirakud, Sambalpur (Odisha))" },
    { id: "A-26-9741", name: "GREENPANEL PRIVATE LIMITED (UNIT- ANDHRA PRADESH)" },
    { id: "A-26-9747", name: "Ultratech Cement Ltd (Unit: Aditya Cement Works chittorgarh)" }
];

// Check if user is logged in (Runs when auctions.html loads)
if (window.location.pathname.includes('auctions.html')) {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html'; // Kick them back to login
    } else {
        renderAuctions(); // Populate the list
    }
}

function renderAuctions() {
    const listContainer = document.getElementById('auctionList');
    if (!listContainer) return;

    let html = '';
    AUCTIONS.forEach(auction => {
        html += `
        <div class="form-check">
            <input class="form-check-input auction-checkbox" type="checkbox" value="${auction.id}" id="${auction.id}">
            <label class="form-check-label" for="${auction.id}">
                <span class="auction-id">${auction.id}</span> | ${auction.name}
            </label>
        </div>
        `;
    });
    listContainer.innerHTML = html;
}

function handleAuctionSubmit(event) {
    event.preventDefault();
    
    // Get all checked boxes
    const selected = document.querySelectorAll('.auction-checkbox:checked');
    const errorMsg = document.getElementById('selectionError');

    if (selected.length === 0) {
        errorMsg.classList.remove('d-none'); // Show warning
    } else {
        errorMsg.classList.add('d-none'); // Hide warning
        
        // Hide Form, Show Success Message
        document.getElementById('formView').classList.add('d-none');
        document.getElementById('successView').classList.remove('d-none');
        
        // If you want to clear the login session when they click "Close", 
        // the logout button in HTML already links to index.html. 
        // You could add sessionStorage.clear(); to that button if needed.
    }
}
