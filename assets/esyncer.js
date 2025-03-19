document.addEventListener("DOMContentLoaded", function(event) {
    // Check if an element with the class "esyncer_4over_select_boxes" exists
  var fourover_element = document.querySelector(".esyncer_4over_select_boxes");

  // If the element exists, trigger your action
  if (fourover_element) {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", "https://app.esyncer.com/js/fo.js?v=" + Math.floor(Math.random() * 100000000));
    document.body.appendChild(scriptEle);
  } else {
    console.log("Element with class 'esyncer_4over_select_boxes' not found.");
  }
});



