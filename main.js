/* global $ */

$(document).ready(function () {
  // get data from api
  var DATA = [];
  getData();

  $('form').submit(function (ev) {
    ev.preventDefault();
    // console.log(ev.target[0].value);
    var selected = $('select option:selected').val();
    var filteredData = DATA.filter(filterByLocation);

    function filterByLocation (obj) {
      if (obj.Area === selected) {
        return true;
      } else {
        return false;
      }
    }
    pushToDOM(filteredData, true);
  });

  // create a card div with col-sm-3
  // attach data into each of them
  // push to DOM by appending

  function pushToDOM (incomingData, filter) {
    if (filter) {
      $('#card-stage').empty();

      for (var i = 0; i < incomingData.length; i++) {
        var card = $('<div>');
        card.addClass('col-sm-3 border');
        var data = incomingData[i];

        var p1 = $('<p>');
        p1.text(data.Area);

        var h4 = $('<h4>');
        h4.text(data.Development);

        var p3 = $('<p>');
        p3.text('Lots available: ' + data.Lots);

        card.append(p1, h4, p3);
        $('#card-stage').append(card);
      }
    } else {
      var inList = [];
      for (var i = 0; i < incomingData.length; i++) {
        var card = $('<div>');
        card.addClass('col-sm-3 border');
        var data = incomingData[i];

        // add to dropdown in HTML
        if (inList.includes(data.Area) === false) {
          var option = $('<option>');
          option.attr('value', data.Area);
          option.text(data.Area);
          $('#Location').append(option);
          inList.push(data.Area);
        }

        var p1 = $('<p>');
        p1.text(data.Area);

        var h4 = $('<h4>');
        h4.text(data.Development);

        var p3 = $('<p>');
        p3.text('Lots available: ' + data.Lots);

        card.append(p1, h4, p3);
        $('#card-stage').append(card);
      }
    }
  }

  function getData () {
    $('#card-stage').text('fetching data...');
    $.get('http://carparks-sg.herokuapp.com/api', function (incomingData) {
      DATA = incomingData;
      $('#card-stage').empty();
      pushToDOM(incomingData); // callback when data obtained from api
    });
  }
});
