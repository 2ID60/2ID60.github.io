var retry = false;
var danger;
var danwarn;
var warning;
var good;

function checkAlchoholLevel(){
  if (retry) {
    retry = false;
    location.reload();
  } else {
    retry = true;

    var a = parseFloat(document.getElementById('glasses').value);
    var w = parseFloat(document.getElementById('weight').value);
    var g = document.getElementById('gender').value;
    var h = parseFloat(document.getElementById('hours').value);
    var r;

    if (h === 0) {
      h = 1;
    }

    if (g === "Male") {
      r = parseFloat(0.7);
    } else {
      r = parseFloat(0.5);
    }

    var bag = ((a * 10) / (w * r) - (h - 0.5) * (w * 0.002)).toFixed(2);

    if (bag === "NaN") {
      alert("Please make sure all values are just numbers.");
      retry = false;
    }

    changePage(bag);
  }
};

function changePage(promi){
  var element = document.getElementById("questionSection");
  if (promi < 0.05) {
    element.innerHTML = good;
  } else if (promi < 0.2) {
    warning = warning.replace("(NUMBER)", String(promi));
    warning = warning.replace("(NUMBER)", String(promi));
    element.innerHTML = warning;
  } else if (promi < 0.5) {
    danwarn = danwarn.replace("(NUMBER)", String(promi));
    danwarn = danwarn.replace("(NUMBER)", String(promi));
    element.innerHTML = danwarn;
  } else if (promi > 0.5) {
    danger = danger.replace("(NUMBER)", String(promi));
    danger = danger.replace("(NUMBER)", String(promi));
    element.innerHTML = danger;
  }
};

$(document).on("change", "#gender", function () {
  var x = document.getElementById('gender').value;

  if (x === "Male") {
    document.getElementById("dropdown").className = "fa fa-male";
  } else {
    document.getElementById("dropdown").className = "fa fa-female";
  }
});

jQuery.get('danger.txt', function(data) {
    danger = String(data);
});

jQuery.get('warning.txt', function(data) {
    warning = String(data);
});

jQuery.get('good.txt', function(data) {
    good = String(data);
});

jQuery.get('danwarn.txt', function(data) {
    danwarn = String(data);
});
