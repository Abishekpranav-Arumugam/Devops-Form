    function calculate() {
      var itemName = document.getElementById('itemName').value;
      var quantity = parseInt(document.getElementById('quantity').value);
      var price = parseFloat(document.getElementById('price').value);
      var totalCost = quantity * price;

      var newRow = '<tr>' +
        '<td>' + itemName + '</td>' +
        '<td>' + quantity + '</td>' +
        '<td>' + price.toFixed(2) + '</td>' +
        '<td>' + totalCost.toFixed(2) + '</td>' +
        '<td><button onclick="removeItem(this)">Remove</button></td>' +
        '</tr>';

      document.getElementById('billItems').innerHTML += newRow;

      updateTotalCost();
    }

    function removeItem(button) {
      button.parentNode.parentNode.remove();
      updateTotalCost();
    }

    function updateTotalCost() {
      var totalCost = 0;
      var rows = document.querySelectorAll('#billItems tr');
      rows.forEach(function(row) {
        var rowTotalCost = parseFloat(row.querySelectorAll('td')[3].innerText);
        totalCost += isNaN(rowTotalCost) ? 0 : rowTotalCost;
      });

      document.getElementById('totalCost').innerText = totalCost.toFixed(2);
    }