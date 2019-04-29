"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2
   Author: Chad Williams
   Date: 4.19.19  
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

window.addEventListener('load', function () {
      // changingCells = input elements with class sum with the id travelExp
      var changingCells = document.querySelectorAll('table#travelExp input.sum');
      // runs the calcExp function when changed
      for (var i = 0; i < changingCells.length; i++) {
            changingCells[i].addEventListener('change', calcExp);
      }
      // Run validateSummary function when element with the id submitButton is changed
      document.getElementById('submitButton').onclick = function () {
            validateSummary();
      }
});

function validateSummary() {
      // gets summary
      var summary = document.getElementById('summary');
      // Displays message if field value is missing otherwise set to an empty text string
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report");
      } else {
            summary.setCustomValidity("");
      }
}


function calcClass(sumClass) {
      // sumFields containing an object collection of elements to the class sumClass 
      var sumFields = document.getElementsByClassName(sumClass);
      // keeps a  total of the values in the sumFields object collection
      var sumTotal = 0;

      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            if (isNaN(itemValue) === false) {
                  sumTotal += itemValue;
            }
      }
      return sumTotal;
}

function calcExp() {
      // expTable referencing all the tr elements within the table body of the travelExp table
      var expTable = document.querySelectorAll('table#travelExp tbody tr');

      // sets the value of input value with the id subtotalIndex from the returned value of the calcClass function with the parameter dateIndex
      for (var i = 0; i < expTable.length; i++) {
            document.getElementById(`subtotal${i}`).value = formatNumber(calcClass(`date${i}`), 2);
      }

      // sets values for cost
      document.getElementById('transTotal').value = formatNumber(calcClass("trans"), 2);
      document.getElementById('lodgeTotal').value = formatNumber(calcClass("lodge"), 2);
      document.getElementById('mealTotal').value = formatNumber(calcClass("meal"), 2);
      document.getElementById('otherTotal').value = formatNumber(calcClass("other"), 2);

      document.getElementById('expTotal') = formatUSCurrency(calcClass('sum'));
}


function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}