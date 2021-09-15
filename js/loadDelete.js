// //on click function added to search button
// $("#search-button").on("click", function(event) {
//     let searchValue = $("#search-value").val().trim()
//     addHistory(searchValue)
//     storeHistory()

//     // Build the query URL for the ajax request to the API
//     let queryURL = displayCurrentWeather(searchValue)
//     // Make the AJAX request to the API - GETs the JSON data at the queryURL.
//     // The data then gets passed as an argument to the updatePage function
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(displayCurrentWeather)
// })


// // Clear history with button
// $("#clearHistory").on("click", function (event) {
//     localStorage.removeItem(historyKey)
//     $("#history").empty()
// })

// // Load history
// loadHistory()
// function loadHistory() {
//     let history = localStorage.getItem(historyKey)
//     if (history) {
//         let storedNames = JSON.parse(history)
// console.log(storedNames)
//         for (let i = storedNames.length; i > 0; i--) {
//             let history = storedNames[i - 1]
//             if (history != '') {
//                 addHistory(history)
//                 console.log(`${i} ${history}`)
//             }
//         }
//     }
// }



 

// function storeHistory() {
//     let histories = []
//     $('.history').each(function () {
//         histories.push($(this).text())
//     })
//     localStorage.setItem(historyKey, JSON.stringify(histories))
// }


// //delete history??
//     $("#clear-history").on("click", function () {
//         localStorage.removeItem(historyKey)
//         $("#history").empty()
    
//     })






// // // function addNumbers(a, b){
// // //     return a + b;
// // // }
// // // console.log(addNumbers(5, parseInt("9")))