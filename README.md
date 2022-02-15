<h1 align="center"><b>Optimised Vehicle Routing for Deliveries of Pasteis de Nata</b></h1>

<p align="center"> 
  <img src = "caralho.jpg" alt = "Pasteis do Ceu" width = "100%">
</p>


<hr>

<pre>
ASK PROF valentino:
1. postgres trigger
2. 
3.


To Doo
1. parse argument FORMAT=GEOJSON to vroom
2. incorporate Leaflet into website
<<<<<<< HEAD
3. 
=======
3. separate Orders and Jobs (for POST and GET)
3.1 create VIEW called Jobs
3.2 create trigger to update Jobs view
>>>>>>> c522ea9d3ef9684bdb1a4db1776830adfc48bd87



3. .....cost matrix from pgrouting? No...
4. Store this selection in a json doc (https://github.com/VROOM-Project/vroom/blob/master/docs/API.md), compatible to VROOM.
  
Start looking at
1. PG Routing vehicle routing optimization options
2. Possible issues with the capacities, number of vehicles...
3. Html, Leaflet and API
4. Interface for clients to log in w/ pass (after that, ID will be automatically assigned to the order) and select date and quantity.
After confirmation, generate an order ID to save to our control and the client's (exportable as pdf).


 ==== API STRUCTURE ====
 
 Is hard to create separated user sessions as it has to be in PHP and connected to the servers...
 Maybe the API can be just for the management. Then the structure would be:
 
HOMEPAGE
  Different buttons to access all the tables in the database.
  
Tables page
  Show all the entries to the page.
  Filter by attributes, including a nice calendar filter by date

Orders and Clients Map Pages
  Map display with all the clients, when selecting one in the map: display the possibility to edit it on telft handside.
  Map display with all the orders, 

 ==== DONE THINGS ====
[DONE] Locations extracted from OSM and stored in a DB
[DONE] Generate a python program to randomly select the number of pastelarias and the quantities to be delivered daily.
[DONE] Simulation algorithm to generate orders
[DONE] Prepare test data
[DONE] Create and populate database
[DONE] fix PadariasLX.sql
[DONE] test postman for posting Orders
[DONE] running vroom
[DONE] let flask post multiple orders
[DONE] separate Orders and Jobs (for POST and GET)
  
 ==== REFERENCE ====
PORTS
127.0.0.1:3000  Vroom
127.0.0.1:3080  Flask
127.0.0.1:5000  OSRM

 ==== VROOM SERVER ====
vroom-docker = vroom-express on top of vroom on top of orsm-backend

### start osrm server, passing the ROI data as an argument: 
      docker run -t -i -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/berlin-latest.osrm
    #requests can now be sent to OSRM
    
### start vroom server:
      docker start -a vroom

 ==== OSRM SERVER ====
 docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-extract -p /opt/car.lua /data/portugal-latest.osm.pbf
 docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-partition /data/portugal-latest.osrm
 docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-customize /data/portugal-latest.osrm
 docker run -t -i -p 5000:5000 -v "${PWD}:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/portugal-latest.osrm
 
 ==== NOMES ALTERNATIVES ====
  Palácio dos Pastéis
  Pastéis que sim senhor
  Trinidad Pastéis
  Paraíso Pasteleiro
  Marquês dos Pastéis
  Pastéis Pecaminosos; ou, Pastéis de Pecado
  Pastéis de Sade
  Natéis Inc.
  O Pastel Alarife
  Planeta Pasteleiro
  <del>Pastéis Macios Redondos e Grandes</del>
 
</pre>

<!-- CONTENTS -->
<h2 id = "contents">Contents</h2>

<details open = "open">
  <summary>Contents</summary>
  <ol>
    <li><a href = "#introduction">Introduction</a></li>
    <li><a href = "#structure">Structure</a></li>
    <li><a href = "#database">Database</a></li>
    <li><a href = "#api">API</a></li>
    <li><a href = "#authors">Authors</a></li>
  </ol>
</details>

<hr>

<!-- ABOUT THE PROJECT -->
<h2 id = "introduction">1. Introduction</h2>

Our proposal is routing optimisation for a fleet of vehicles with varying capacities, to fulfill orders of Pasteis de Nata. The clients are a finite set of pastelarias, and the idea is that  different combinations of clients and different order sizes will be encountered daily. Initially the Pasteis will be delivered from a single warehouse. The program will have to generate the best possible delivery route every day, taking into account the locations, order sizes, vehicle capacities and vehicle availability. 
The data will consist of streets and pastelarias (from OSM), the  vehicles comprising the fleet, and randomly generated orders. We plan to use or reimplement VROOM (Vehicle Routing Open-source Optimization Machine
), written in C++ and hosted at https://github.com/VROOM-Project/vroom.
Once we have a minimal working example we plan to attempt more complex problems, involving several warehouses and failed deliveries that have to be carried over to the next day.

<hr>

<!-- STRUCTURE -->
<h2 id = "structure">2. Structure</h2>

Structure


<hr>

<!-- DATABASE -->
<h2 id = "database">3. Database</h2>

Rules:<br>
· Clients can have zero to multiple orders.<br>
· Orders belong to one and only one client.<br>
· Orders can be distributed in one or more vehicles.<br>
· A vehicle can distribute zero to multple orders.<br>
· A vehicle belons to one and only one warehouse.<br>
· Warehouses can hold one to multiple vehicles.<br>


<hr>

<!-- API -->
<h2 id = "api">4. API</h2>

API bs

<hr>

<!-- AUTHORS -->
<h2 id = "authors">5. Authors</h2>

<b>Lucas Casuccio</b><br>
BSc (Agronomy)<br>
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>

<b>Guillem Ulldemolins Jornet</b><br>
BSc (Geography)<br>
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>

<b>Andre Kotze</b><br>
BSc (Earth Science) at <a href="https://www.sun.ac.za/" target="_blank">Stellenbosch University</a><br>
Postgraduate Diploma (Geotechnical Engineering) at <a href="https://www.sun.ac.za/" target="_blank">Stellenbosch University</a><br>
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>
