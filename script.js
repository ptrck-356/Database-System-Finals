// --- DOM Elements ---
// Sidebar & Navigation
const sidebar = document.getElementById("sidebar");
const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const sidebarOverlay = document.getElementById("sidebar-overlay");


// Inventory Elements
const itemNameInput = document.getElementById("item_name");
const itemQtyInput = document.getElementById("item_qty");
const addItemBtn = document.getElementById("btn-add-item");
const inventoryGrid = document.getElementById("inventory-grid");

// Sync Notification Elements
const syncNotification = document.getElementById("sync-text");
const syncIcon = document.getElementById("btn-sync");
const addNotif = document.getElementById("toast-container")

const items = [];
const spinAnimation = "spin 1s infinite linear";

//Theme Toggle
const themeBtn = document.getElementById("btn-theme-toggle")
const bodyElement = document.body;
themeBtn.addEventListener("click", () => {
    bodyElement.classList.toggle("light")
})

// --- Desktop Sidebar Toggle ---
if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });
}


// --- Helper Functions ---
const showSyncNotification = () => {
    if (!syncNotification || !syncIcon) return;

    syncNotification.classList.remove("hidden");
    syncNotification.classList.add("show");

    syncIcon.style.animation = "none";
    syncIcon.style.animation = spinAnimation;

    syncNotification.textContent = "Syncing to Database...";

    setTimeout(() => {
        syncNotification.textContent = "Changes Saved";
        syncIcon.style.animation = "none";

        setTimeout(() => {
            syncNotification.classList.remove("show");
            syncNotification.classList.add("hidden");
        }, 1000); // Give user time to read "Changes Saved" before hiding
    }, 1500); 
};


const renderItems = () => {
    if (!inventoryGrid) return;

    // Map array to HTML string for better rendering performance
    inventoryGrid.innerHTML = items.map(item => {
        const isOutOfStock = item.quantity <= 0;
        const isLowStock = item.quantity > 0 && item.quantity < 10;

        const statusClass = isOutOfStock ? "out-of-stock" : isLowStock ? "low-stock" : "in-stock";
        const statusText = isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock";

        return `
            <div class="inventory-card">
                <div class="card-icon">
                    <span class="material-symbols-outlined">inventory_2</span>
                </div>
                <h4 class="card-title">${item.name}</h4>
                <div class="card-footer">
                    <div class="qty-indicator">
                        <span class="qty-label">Qty</span>
                        <span class="qty-value">${item.quantity}</span>
                    </div>
                    <span class="status-pill ${statusClass}">
                        ${statusText}
                    </span>
                </div>
            </div>
        `;
    }).join(""); // Join the array into a single HTML string
};

// --- 5. Add Item Action ---
addItemBtn.addEventListener("click", () => {
    setTimeout(() =>{
        addNotif.classList.remove("hide");
        setTimeout(()=>{
            addNotif.classList.add("hide");
        }, 2000);
    }, 100);

    const itemName = itemNameInput.value.trim();
    const itemQty = Number(itemQtyInput.value);

    // Validate BEFORE showing the sync notification
    if (!itemName || isNaN(itemQty) || itemQty < 0) {
        alert("Please enter a valid item name and a quantity of 0 or more.");
        return;
    }

    // Inputs are valid, proceed with UI updates
    showSyncNotification();

    items.push({
        name: itemName,
        quantity: itemQty
    });

    renderItems();

    // Clear inputs
    itemNameInput.value = "";
    itemQtyInput.value = "";
});  