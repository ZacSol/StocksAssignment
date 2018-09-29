let stocks = ['FB', 'AAPL', 'TSLA', 'GOOG'];

const displaystockInfo = function () {

    const stock = $(this).attr('data-name');
    const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,logo,news&range=1m&last=10`;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (res) {
        console.log(res);
        $("#stocks-view").html(`

        <div class="row"><div class="col"><img src="${res.logo.url}" alt="${res.quote.companyName} Logo"></div><div class="col"><div class="row"><h2>${res.quote.companyName}</h2></div><div class="row"><h5>Price: ${res.quote.latestPrice}</h5></div></div></div>
                
        `);

        
    });

}

const render = function () {

  $('#buttons-view').empty();
  for (let i = 0; i < stocks.length; i++) {

    let newButton = $('<button>');
    newButton.addClass('stock btn btn-secondary');
    newButton.attr('data-name', stocks[i]);
    newButton.text(stocks[i]);
    $('#buttons-view').append(newButton);
  }
}

const addButton = function (event) {
    event.preventDefault();
    $.ajax({
        url: "https://api.iextrading.com/1.0/ref-data/symbols",
        method: "GET"
    }).then(function (res) {
        //Check if the symbol is in the array
        // console.log(res);
        // console.log(res[0].symbol);
        let stock = $('#stock-input').val().trim();
        stock = stock.toUpperCase();
        let available = false;
        if (!stocks.includes(stock)) {
            for (let i = 0; i < res.length; i++) {
                if (stock === res[i].symbol) {
                    available = true;
                    stocks.push(stock);
                    $('#stock-input').val('');
                    render();
                    break;
                }
            } if (available === false) {
                alert(`${stock} is not an available stock.`);
            }
        }else{
            alert("That stock already exists.");
            $('#stock-input').val('');
        }
    })
}

$('#add-stock').on('click', addButton);

$('#buttons-view').on('click', '.stock', displaystockInfo);

render();
