document.addEventListener('DOMContentLoaded', function() {
    const transactions = [
        { no: 1, country: 'India', requirement: 'Supply of 25% Broken Rice – White', quantity: '25,000 MT', status: 'Pending' },
        { no: 2, country: 'Senegal', requirement: 'Supply of Home Healthcare Kit', quantity: '3,600 Sets', status: 'Pending for Sample Approval' },
        { no: 3, country: 'Ethiopia', requirement: 'Supply of Sunflower Oil', quantity: '100,000 MT', status: 'Pending for Seller FCO' },
        { no: 4, country: 'Maldives', requirement: 'Supply of Kitchen Equipment', quantity: '12', status: 'Pending for Client PO' },
        { no: 5, country: 'Malaysia', requirement: 'Supply of CP10 Palm Olein [20L * 20 FCL]', quantity: '6,600 Bottles', status: 'Pending for Client PO' },
        { no: 6, country: 'Papua New Guinea', requirement: 'Supply of Cooking Oil CP8 & CP10', quantity: '12 * 20 FCL', status: 'Pending for Feedback' },
        { no: 7, country: 'Kenya', requirement: 'Supply of Bitumen 50/70', quantity: '5,000 MT', status: 'Sourcing in Progress' },
        { no: 8, country: 'Ethiopia', requirement: 'Supply of Urea N46', quantity: '100,000', status: 'FCO Given, Pending for Feedback' },
        { no: 9, country: 'Yemen (N Future)', requirement: 'Supply of Diesel Manufacturing Plant', quantity: '12,000 L', status: 'Pending for SPA Signing' },
        { no: 10, country: 'Yemen (Ahqaf)', requirement: 'Supply of Diesel Manufacturing Plant', quantity: '12,000 L', status: 'Pending for SPA Signing' },
        { no: 11, country: 'Zambia', requirement: 'Supply of Diesel Manufacturing Plant', quantity: '24,000 Litres/Day', status: 'Pending for SPA Signing' },
        { no: 12, country: 'Malaysia', requirement: 'Bee King Health Supplement', quantity: '1*20 FCL', status: 'Sourcing in Progress' },
        { no: 13, country: 'Sierra Leone', requirement: 'Supply of Mixed Lubricant Oil', quantity: '1*20 FCL', status: 'Pending for Supplier Quotation' },
        { no: 14, country: 'Sierra Leone', requirement: 'Supply of Home Healthcare Kit', quantity: '1*20 FCL', status: 'Pending for FCO' },
        { no: 15, country: 'Malaysia', requirement: 'Supply of Icumsa 45 Refined Sugar', quantity: '12,500 MT', status: 'Pending for LOI' },
        { no: 16, country: 'Maldives', requirement: 'Supply of Corn Starch or Craft Paper Bowl [450 ML & 750 ML]', quantity: '1 * 20 FCL', status: 'Sourcing in Progress' },
        { no: 17, country: 'Korea', requirement: 'Supply of Aluminium Ingot A7', quantity: '10,000 MT', status: 'Sorting Out Documentation Issue' },
    ];

    const tableBody = document.getElementById('transactionsTable').querySelector('tbody');

    transactions.forEach((transaction, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${transaction.no}</td>
            <td>${transaction.country}</td>
            <td><a href="item-detail${transaction.no}.html">${transaction.requirement}</a></td>
            <td>${transaction.quantity}</td>
            <td>Pending</td> <!-- Assuming "Amount USD" is "Pending" -->
            <td>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progress-${transaction.no}" style="width: 0%;">0%</div>
                </div>
            </td>
        `;
        // Fetch the progress from the backend and update the progress bar
        fetch(`/api/get-progress?transactionId=${transaction.no}`)
            .then(response => response.json())
            .then(data => {
                const progressBar = document.getElementById(`progress-${transaction.no}`);
                progressBar.style.width = `${data.progressPercentage}%`;
                progressBar.textContent = `${data.progressPercentage}%`;
            })
            .catch(error => console.error('Error:', error));
    });
});