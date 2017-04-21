//CRIME DATA LIST
$(document).ready( function () {
    //$('#table_id').DataTable();
} );

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log(JSON.stringify(place));
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}


function loadResults() {
  var html =`
    <div class="filters">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="filtersBox">
            <div class="filterChoices">
              <div class="row row1">
                <div class="col-md-4 col-sm-4">
                  <!-- <button id="btnAmenities">Amenities</button> -->
                  <div class="btn-filter btn-filter-checked btn-filter-med">
                    <span>Amenities</span>
                    <img src="images/checkmark.png">
                  </div>
                </div>
                <div class="col-md-4 col-sm-4">
                  <!-- <button id="btnTransportation">Transportation</button> -->
                  <div class="btn-filter btn-filter-checked btn-filter-med">
                    <span>Transit</span>
                    <img src="images/checkmark.png">
                  </div>
                </div>
                <div class="col-md-4 col-sm-4">
                  <!-- <button id="btnCrime">Crime</button> -->
                  <div class="btn-filter btn-filter-checked btn-filter-med">
                    <span>Crime</span>
                    <img src="images/checkmark.png">
                  </div>
                </div>
              </div>
                <div class="row row2">
                  <div class="col-md-4 col-sm-4">
                    <!-- <button id="btnWeather">Weather</button> -->
                    <div class="btn-filter btn-filter-checked btn-filter-med">
                      <span>Weather</span>
                      <img src="images/checkmark.png">
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4">
                    <!-- <button id="btnBuyProperty">Buy Property</button> -->
                    <div class="btn-filter btn-filter-checked btn-filter-med">
                      <span>Buy Property</span>
                      <img src="images/checkmark.png">
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4">
                    <!-- <button id="btnRentProperty">Rent Property</button> -->
                    <div class="btn-filter btn-filter-unchecked btn-filter-med">
                      <span>Rent Property</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>
    <div class="filtersExtra">
      <div class="filtersExtraBox">
        <div class="filtersExtraBoxChoices">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <div class="btn-filter btn-filter-unchecked btn-filter-med">
                <span class="lblCheck">Check/Uncheck</span>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
            <div class="btn-filter btn-filter-unchecked btn-filter-med">
              <span class="lblAdSearch">Advanced Search</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="weather">
      <h1 id="weatherTitle">WEATHER</h1>
    </div>
    <div class="map">
      <h1 id="mapTitle">MAP</h1>
    </div>
    <div class="crimeList">
      <h1 id="crimeTitle">CRIME</h1>
      <table id="table_id" class="display">
          <thead>
              <tr>
                  <th>Population</th>
                  <th>Year</th>
                  <th>Violent Crime</th>
                  <th>Murder &amp; Nonnegligent Manslaughter</th>
                  <th>Rape</th>
                  <th>Robbery</th>
                  <th>Aggrevated Assault</th>
                  <th>Property Crime</th>
                  <th>Burglary</th>
                  <th>Larcency-Theft</th>
                  <th>Motor Vehicle Theft</th>
                  <th>Arson</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>500,000</td>
                  <td>1980-1990</td>
                  <td>500</td>
                  <td>600</td>
                  <td>700</td>
                  <td>800</td>
                  <td>900</td>
                  <td>1000</td>
                  <td>1100</td>
                  <td>1200</td>
                  <td>1300</td>
                  <td>1400</td>
              </tr>
              <tr>
                  <td>500,000</td>
                  <td>1980-1990</td>
                  <td>500</td>
                  <td>600</td>
                  <td>700</td>
                  <td>800</td>
                  <td>900</td>
                  <td>1000</td>
                  <td>1100</td>
                  <td>1200</td>
                  <td>1300</td>
                  <td>1400</td>
              </tr>
              <tr>
                  <td>500,000</td>
                  <td>1980-1990</td>
                  <td>500</td>
                  <td>600</td>
                  <td>700</td>
                  <td>800</td>
                  <td>900</td>
                  <td>1000</td>
                  <td>1100</td>
                  <td>1200</td>
                  <td>1300</td>
                  <td>1400</td>
              </tr>
              <tr>
                  <td>500,000</td>
                  <td>1980-1990</td>
                  <td>500</td>
                  <td>600</td>
                  <td>700</td>
                  <td>800</td>
                  <td>900</td>
                  <td>1000</td>
                  <td>1100</td>
                  <td>1200</td>
                  <td>1300</td>
                  <td>1400</td>
              </tr>
              <tr>
                  <td>500,000</td>
                  <td>1980-1990</td>
                  <td>500</td>
                  <td>600</td>
                  <td>700</td>
                  <td>800</td>
                  <td>900</td>
                  <td>1000</td>
                  <td>1100</td>
                  <td>1200</td>
                  <td>1300</td>
                  <td>1400</td>
              </tr>
          </tbody>
      </table>
    </div>
  `;


    $('#content').innerHTML = html;
    $('#table_id').DataTable();
}