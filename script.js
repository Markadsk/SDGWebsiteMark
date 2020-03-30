console.log(1);

const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", searchCountry);

function searchCountry(e) {
  e.preventDefault();
  console.log("Inside the search country function");

  // get country name from the search bar
  const countryName = document.querySelector("#tName").value;
  console.log(countryName);

  // get search reulst <ul> html element
  const searchResults = document.querySelector("#search-results");

  // reset the prev search results
  searchResults.innerHTML = "";

  // use CountryName to search for the country inside the json file
  fetch("./csvjson.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      var found = false;
      data.forEach(element => {
        if (element.GeoAreaName === countryName) {
          found = true;
          console.log("Found");

          // create <li> html element
          const result = document.createElement("li");
          const searchResultText = document.createTextNode(
            `${element.GeoAreaName} - ${element.TimePeriod} - ${element.Value}`
          );
          result.appendChild(searchResultText);

          searchResults.appendChild(result);
        }
      });
      if (found === false) {
        const result = document.createElement("h1");
        const searchResultText = document.createTextNode("Nothing was found!");
        result.appendChild(searchResultText);
        searchResults.appendChild(result);
      }
    });
}
