<!DOCTYPE html>
<html>
<head>
    <title>Summer Olympics</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
    <script src="js/countries.geo.json"></script>
    <?php include("./data.php"); ?>
    <script src="js/logic.js"></script>
</head>
<body onload=initialise()>
    <header class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <h3>Summer Olympics 1896-2016</h3>
        </div>
    </header>
    <div id="mapid"></div>
    <!--Leaflet JS Map Element is contained here-->
    <section>
        <!--Contains main text components for the website-->
        <br /><br />
        <h4><strong>Welcome to the Summer Olympics LeafletJS Map</strong></h4>
        <h4>Explore data about the host cities for every summer Olympic Games since 1896.</h4><br />
        <!-- Filter Map By Through City Search Box Feature-->
        <h4>Filter Map By Host City</h4>
        <form id="searchbox" class="input-group col-md-8">
            <input id="box" type="search" name="search" autocomplete="on" class="search-query form-control" placeholder="Search" />
            <span class="input-group-btn">
					<button class="btn btn-primary">
						<span class=" glyphicon glyphicon-search"></span>
            </button>
            </span>
        </form>
        <!-- Filter Map By #times City Hosted Olympcics Feature-->
        <h4>Filter Cities by Number of Olympics Hosted :</h4>
        <form class="radio">
            <input id="radio-1" name="times" type="radio" value=1 checked>
            <label for="radio-1" class="radio-label">1</label>
            <input id="radio-2" name="times" type="radio" value=2>
            <label for="radio-2" class="radio-label">2</label>
            <input id="radio-3" name="times" type="radio" value=3>
            <label for="radio-3" class="radio-label">3</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="submit" class="btn btn-primary" value='Submit'>
        </form>
        <h4>More Information</h4>
        <!-- Slider Feature (By Year) Thats Allows For More Info About Olympics Hosts-->
        <div>
            <p>Use the Slider Below to Find Out More About Each Olympics.</p><br/>
            <p id="sliderYear">Year: <span id="slider-value"></span></p><br/>
        </div>
    </section>
    <div class="flat-slider" id="slider"></div>
    <div id="outputContainer">
        <br/>
        <div id="output">
        </div>
    </div>
</body>
</html>