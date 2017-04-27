function initialise() {

    // creating the map object
    myMap = new L.Map('mapid', {
        zoomSnap: 0.1
    });

    // create the tile layer with correct attribution
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 1.5,
        maxZoom: 12,
        attribution: osmAttrib
    });

    // set the starting location
    myMap.setView(new L.LatLng(34.9806, 3.7578), 2.4);
    myMap.addLayer(osm);

    // iterating through SQL data to create some markers of the cities
    // the myData array has been imported in a separate <script> include
    for (item in myData) {
        var marker = L.marker([myData[item].lat, myData[item].lan]).bindPopup('<h6>' + myData[item].city + '</h6>').addTo(myMap);
    }

    // adding the Countries Polygon Geojson layer (limited to the nations that hosted olympics)
    var polygonStyle = {
        "color": "#0000ff",
        "weight": 3,
        "opacity": 0.3
    };

    //------Calculating number of occasions a nation hosted the olympics------//
    var hostOccurences = {};
    for (var i = 0; i < myData2.length; i++) {
        if (typeof hostOccurences[myData2[i].host_nation] == "undefined") {
            hostOccurences[myData2[i].host_nation] = 1;
        } else {
            hostOccurences[myData2[i].host_nation]++;
        }
    }

    //------Assigning colours to the countries Geojson layer based on number of times they hosted the Olympics------//
    var geojson;

    function getColor(d) {
        for (var key in hostOccurences) {
            if (key == d) {
                var x = hostOccurences[d];
            }
        }
        return x > 3 ? '#E31A1C' :
            x > 2 ? '#FC4E2A' :
            x > 1 ? '#FD8D3C' :
            x > 0 ? '#FEB24C' :
            '#FFEDA0';
    }

    function style(countriesGeojson) // countriesGeojson file contains geographical polygan border data for nations that hosted the olympics.
    {
        return {
            fillColor: getColor(countriesGeojson.properties.name),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
            weight: 2,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    function zoomToFeature(e) {
        myMap.fitBounds(e.target.getBounds());
    }


    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    geojson = L.geoJson(countriesGeojson, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(myMap);

    //------ Adding Olympics Watermark to Map  ------//

    L.Control.Watermark = L.Control.extend({
        onAdd: function(myMap) {
            var img = L.DomUtil.create('img');
            img.src = './Olympics.png';
            img.style.width = '120px';
            return img;
        },
    });

    L.control.watermark = function(opts) {
        return new L.Control.Watermark(opts);
    }

    L.control.watermark({
        position: 'bottomleft'
    }).addTo(myMap);


    /* Using JQuery to implement an autocomplete suggestions feature 
    for the filter map by host city search box */

    $(function() {
        var availableCities = [
            "Amsterdam",
            "Antwerp",
            "Athens",
            "Atlanta",
            "Barcelona",
            "Beijing",
            "Berlin",
            "Helsinki",
            "London",
            "Los Angeles",
            "Melbourne",
            "Mexico City",
            "Montreal",
            "Moscow",
            "Munich",
            "Paris",
            "Rio de Janeiro",
            "Rome",
            "Seoul",
            "St Louis",
            "Stockholm",
            "Sydney",
            "Tokyo"
        ];
        $("#box").autocomplete({
            source: availableCities
        });
    });

    // ------ Creating Map Control Legend feature ------ //
    var legend = L.control({
        position: 'topright'
    });

    legend.onAdd = function(myMap) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [1, 2, 3, 4],
            labels = ['#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C'];

		div.innerHTML = "<h5><strong>Number Hosted</strong></h5>"
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + labels[i] + '"></i> ' +
                '<strong>' + grades[i] + '</strong>' + '- Olympics' + '<br>';
        }

        return div;
    };

    legend.addTo(myMap);

    // ------ Creating Slider by Year Feature (Using JQuery) That Outputs Relevent Info Based on The Selected Year ------ //

    document.getElementById('output').innerHTML = // default info on loading of page based on first year of olympics 1896
        "<img src=" + "./flags/Greece.png" + ">" +
        "<h4><strong>Year:</strong> 1896</h4>" +
        "<h4><strong>Host City:</strong> Athens</h4>" +
        "<h4><strong>Host Nation:</strong> Greece</h4>" + "<h4><strong>Medals Won By Host Nation:</strong> 46</h4>" +
        "<h4><strong>Medals Won By All Nations:</strong> 122</h4>" +
        "<h4><strong>Number of Nations Participating:</strong> 14</h4>";

    function updateOutput(date) {
        for (item in myData2) {
            if (date == myData2[item].year) {
                document.getElementById('output').innerHTML =
                    "<img src=" + "./flags/" + myData2[item].host_nation + ".png" + ">" +
                    "<h4><strong>Year:</strong> " + myData2[item].year + "</h4>" +
                    "<h4><strong>Host City:</strong> " + myData2[item].city + "</h4>" +
                    "<h4><strong>Host Nation:</strong> " + myData2[item].host_nation + "</h4>" +
                    "<h4><strong>Medals Won By Host Nation:</strong> " + myData2[item].host_nation_medals + "</h4>" +
                    "<h4><strong>Medals Won By All Nations:</strong> " + myData2[item].total_medals + "</h4>" +
                    "<h4><strong>Number of Nations Participating:</strong> " + myData2[item].number_nations_participating + "</h4>";
            } else if ((date == 1916) || (date == 1940) || (date == 1944)) {
                document.getElementById('output').innerHTML = "<h3>No Olympics Were Hosted This Year Due To The World War</h3>";
            }
        }
    }

    $("#slider").slider({
        value: 100,
        min: 1896,
        max: 2016,
        step: 4,
        change: function(event, ui) {
            $("#slider-value").html(ui.value);
            var date = document.getElementById('slider-value').innerHTML;
            updateOutput(date);
        }
    });

    $("#slider-value").html($('#slider').slider('value'));

    $("#slider-value").on("slidechange", function(event, ui) {
        $("#slider-value").html(ui.value);
        var date = document.getElementById('slider-value').innerHTML;
        updateOutput(date);
    });

}