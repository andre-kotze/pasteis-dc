<h1 align="center"><b>Pasteis D.C. Lda: Optimised Pastel de Nata Distribution Company</b></h1>

<p align="center"> 
  <img src = "./img/banner.jpg" alt = "Pasteis DC" width = "100%">
</p>

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
This project enatails routing optimisation for a fleet of vehicles with varying capacities, to fulfil orders of Pasteis de Nata. The clients are a finite set of pastelarias, and the idea is that  different combinations of clients and different order sizes will be encountered daily. Initially the Pasteis will be delivered from a single warehouse. The program will have to generate the best possible delivery route every day, taking into account the locations, order sizes, vehicle capacities and vehicle availability. 
The data will consist of streets and pastelarias (from OSM), the  vehicles comprising the fleet, and randomly generated orders. We plan to use or reimplement VROOM (Vehicle Routing Open-source Optimization Machine
), written in C++ and hosted at https://github.com/VROOM-Project/vroom.
Once we have a minimal working example we plan to attempt more complex problems, involving several warehouses and failed deliveries that have to be carried over to the next day.

<hr>

<!-- STRUCTURE -->
<h2 id = "structure">2. Structure</h2>

![alt text](https://github.com/andre-kotze/pasteis-dc/blob/main/img/DB-Workflow-V1.PNG)


<hr>

<!-- DATABASE -->
<h2 id = "database">3. Database</h2>

Rules:<br>
· Clients can have zero to multiple orders.<br>
· Orders belong to one and only one client.<br>
· Orders can be distributed in one or more vehicles.<br>
· A vehicle can distribute zero to multple orders.<br>
· A vehicle belongs to one and only one warehouse.<br>
· Warehouses can hold one to multiple vehicles.<br>


<hr>

<!-- API -->
<h2 id = "api">4. API</h2>

The API is an essential tool as it allows us to the CRUD operations. It covers the management side with the operations undertaken in clients, orders, vehicles or warehouses databases but also the delivery side, with a visualization of the daily routes and the distribution points.

<hr>

<!-- AUTHORS -->
<h2 id = "authors">5. Authors</h2>

<b>Lucas Casuccio</b><br>
BSc (Agronomy)<br>
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>

<b>Guillem Ulldemolins Jornet</b><br>
BSc (Geography) at <a href ="https://www.ub.edu/" target = "_blank">Universitat de Barcelona</a><br> 
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>

<b>Andre Kotze</b><br>
BSc (Earth Science) at <a href="https://www.sun.ac.za/" target="_blank">Stellenbosch University</a><br>
Postgraduate Diploma (Geotechnical Engineering) at <a href="https://www.sun.ac.za/" target="_blank">Stellenbosch University</a><br>
Master's degree in Geospatial Technologies at <a href ="https://www.novaims.unl.pt/" target = "_blank">NOVA University of Lisbon</a>, <a href ="https://www.uni-muenster.de/en/" target = "_blank">WWU Münster</a> and <a href ="https://www.uji.es/" target = "_blank">UJI</a><br>
</p>
