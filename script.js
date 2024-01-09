let productsData = [];

  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const result = JSON.parse(e.target.result);
        productsData = Object.values(result.products); // Convert products object to array
        displayFields(); // Initial display with all fields
      };
      reader.readAsText(file);
    }
  });

  function displayFields() {
    const displayFields = document.getElementById('displayFields');
    displayFields.innerHTML = ''; // Clear current fields
    const fields = ['title', 'price', 'popularity']; // Default fields to display
    fields.forEach(field => {
      const option = document.createElement('option');
      option.value = field;
      option.text = field.charAt(0).toUpperCase() + field.slice(1);
      option.selected = true;
      displayFields.appendChild(option);
    });
  }

  function moveToDisplay() {
    const availableFields = document.getElementById('availableFields');
    const displayFields = document.getElementById('displayFields');
    Array.from(availableFields.selectedOptions).forEach(option => {
      displayFields.appendChild(option);
    });
  }

  function moveToAvailable() {
    const availableFields = document.getElementById('availableFields');
    const displayFields = document.getElementById('displayFields');
    Array.from(displayFields.selectedOptions).forEach(option => {
      availableFields.appendChild(option);
    });
  }

  function importAndDisplay() {
    // Sort data by popularity
    productsData.sort((a, b) => b.popularity - a.popularity);

    // Get selected fields
    const selectedFields = Array.from(document.getElementById('displayFields').options).map(opt => opt.value);

    // Generate table
    const table = document.getElementById('dataTable');
    table.innerHTML = ''; // Clear existing table data

    // Create table header
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    selectedFields.forEach(field => {
      const th = document.createElement('th');
      th.textContent = field.charAt(0).toUpperCase() + field.slice(1);
      headerRow.appendChild(th);
    });

    // Create table body
    const tbody = table.createTBody();
    productsData.forEach(product => {
      const row = tbody.insertRow();
      selectedFields.forEach(field => {
        const cell = row.insertCell();
        cell.textContent = product[field];
      });
    });
  }

  function resetForm() {
    // Function to reset the form and clear the table
    document.getElementById('dataTable').innerHTML = '';
    document.getElementById('fileInput').value = '';
    displayFields(); // Reset display fields to default
  }