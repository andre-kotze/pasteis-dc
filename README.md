<h1 align="center"><b>Optimised Vehicle Routing for Deliveries of Pasteis de Nata</b></h1>


<hr>

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

Rules:
· Clients can have zero to multiple orders.
· Orders belong to one and only one client.
· Orders can be distributed in one or more vehicles.
· A vehicle can distribute zero to multple orders.
· A vehicle belons to one and only one warehouse.
· Warehouses can hold one to multiple vehicles.


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

<b>Guillem Ulldemolins</b><br>
BSc (Geography)<br>
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>

<b>Andre Kotze</b><br>
BSc (Earth Science)<br>
Postgraduate Diploma (Geotechnical Engineering)<br>
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>
