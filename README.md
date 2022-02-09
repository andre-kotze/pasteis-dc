<h1 align="center"><b>Optimised Vehicle Routing for Deliveries of Pasteis de Nata</b></h1>


<hr>

<pre>
ASK PROF 9/2:
1. Post from postman json, invalid response
2.
3.


To Doo
1. 
2. running vroom
1. create orders (in Postgres or in Py)
3. cost matrix from pgrouting
4.
  


  Pastelarias
    [OK] Locations extracted from OSM and stored in a DB
    [OK] Generate a python program to randomly select the number of pastelarias and the quantities to be delivered daily.
    [..] Store this selection in a json doc (https://github.com/VROOM-Project/vroom/blob/master/docs/API.md), compatible to VROOM.


ALMOST DONE
- Simulation algorithm to generate orders
- Prepare test data:
  1 warehouse
  40-80 clients
  2 vehicles

-  
Create and populate database

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
BSc (Earth Science)<br>
Postgraduate Diploma (Geotechnical Engineering)<br>
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>
