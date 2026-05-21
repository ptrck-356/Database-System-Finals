# Tambak HQ – Inventory Dashboard

A modern, responsive inventory management dashboard built using HTML, CSS, and vanilla JavaScript.
It provides a clean interface for adding and tracking items with simple stock status indicators.

## Overview

Tambak HQ is a lightweight inventory control system that runs entirely in the browser.
It allows users to add items, assign quantities, and visually monitor stock levels without requiring any backend or database setup.

## Features

### Inventory Management
- Add items with name and quantity
- Automatic stock status detection
- Dynamic inventory card rendering

### Theme Support
- Dark mode (default)
- Light mode toggle

### Responsive Navigation
- Collapsible sidebar for desktop
- Mobile-friendly slide-in menu with overlay

### User Feedback System
- Sync status animation for actions
- Toast notification for successful item addition

### Modern Interface Design
- Glass-style panels
- Smooth transitions and hover effects
- Material Symbols icons integration

## Tech Stack
- **HTML5** – Structure and layout
- **CSS3** – Styling, responsive design, and animations
- **JavaScript (ES6)** – Application logic and UI interactions
- **Google Fonts / Material Symbols** – Typography and icons

## Project Structure
```text
/project-folder
│
├── index.html        Main HTML file containing layout and UI
├── style.css         All styling including themes and components
├── script.js         Application logic (inventory handling and UI behavior)
├── tambak logo.svg   Application logo asset
└── Givonic-Font/     Custom font family files
```

## How It Works

### Adding Items
Users input an item name and quantity, then click the **Add Item** button. The item is stored in an array and immediately rendered in the UI.

```javascript
addItemBtn.addEventListener("click", () => {
    const itemName = itemNameInput.value.trim();
    const itemQty = Number(itemQtyInput.value);

    if (!itemName || isNaN(itemQty) || itemQty < 0) {
        alert("Please enter a valid item name and quantity.");
        return;
    }

    items.push({
        name: itemName,
        quantity: itemQty
    });

    renderItems();
});
```

### Stock Status Logic
The system automatically determines stock status based on quantity.

```javascript
const isOutOfStock = item.quantity <= 0;
const isLowStock = item.quantity > 0 && item.quantity <= 10;

const statusClass = isOutOfStock
    ? "out-of-stock"
    : isLowStock
    ? "low-stock"
    : "in-stock";

const statusText = isOutOfStock
    ? "Out of Stock"
    : isLowStock
    ? "Low Stock"
    : "In Stock";
```

### Rendering Inventory Cards
Items are dynamically converted into HTML cards and injected into the grid.

```javascript
inventoryGrid.innerHTML = items.map(item => {
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
}).join("");
```

### Theme Switching
The interface toggles between dark and light mode using a CSS class.

```javascript
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});
```

### Sync Animation Feedback
When adding items, a sync animation simulates saving behavior.

```javascript
const showSyncNotification = () => {
    syncNotification.classList.remove("hidden");

    syncIcon.style.animation = "none";
    void syncIcon.offsetWidth;
    syncIcon.style.animation = "spin 1s infinite linear";

    syncNotification.textContent = "Syncing to Database...";

    setTimeout(() => {
        syncNotification.textContent = "Changes Saved";

        setTimeout(() => {
            syncNotification.classList.add("hidden");
        }, 1000);
    }, 1500);
};
```
