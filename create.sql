/*
	To create the db anew
*/
CREATE TABLE pasteis.warehouses (
	id INTEGER PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	addressline1 VARCHAR(50) NOT NULL,
	addressline2 VARCHAR(50) DEFAULT NULL,
	city VARCHAR(50) DEFAULT 'Lisboa',
	country VARCHAR(50) DEFAULT 'Portugal',
	postalcode VARCHAR(8) NOT NULL,
	geom geometry(POINT,4326),
	stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE pasteis.vehicles (
	id INTEGER PRIMARY KEY,
	type VARCHAR(50) NOT NULL,
    location INTEGER REFERENCES pasteis.warehouses(id),--foreign key to warehouses
	capacity INTEGER NOT NULL,
	avg_velocity REAL NOT NULL
);

CREATE TABLE pasteis.clients (
	id INTEGER PRIMARY KEY,
	client_name VARCHAR(50) NOT NULL,
    addressline1 VARCHAR(50) NOT NULL,
    addressline2 VARCHAR(50) DEFAULT NULL,
    city VARCHAR(50) NOT NULL DEFAULT 'Lisboa',
    postalcode VARCHAR(20) DEFAULT NULL,
    country VARCHAR(50) DEFAULT 'Portugal',
    geom geometry(POINT,4326)
);

CREATE TABLE pasteis.orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES pasteis.clients(id),
    quantity INTEGER NOT NULL,
	delivery_date DATE DEFAULT CURRENT_DATE + 1, 
	status VARCHAR(50) CHECK (status IN ('To deliver','Delivered','Canceled','Delivery failed','To pick up','To return')) DEFAULT 'To deliver'
);

CREATE TABLE pasteis.streets ( --NOT BEING USED AGORA.....
	fid INTEGER NOT NULL,
	streetname VARCHAR(50),
	direction VARCHAR(3), -- maybe necessary, maybe not
	length REAL NOT NULL,
	avg_velocity REAL DEFAULT 30,
	wkb_geometry geometry(LINESTRING,4326)
);


CREATE TABLE pasteis.routes ( --NOT BEING USED AGORA.....
	id SERIAL PRIMARY KEY,
	stops INTEGER,
	packages INTEGER,
	delivery_date DATE,
    vehicle INTEGER REFERENCES pasteis.vehicles(id),--foreign key to vehicles
    geom geometry(MULTILINESTRING,4326)
	-- add a thing for get the date
);

create view pasteis.jobs as
select o.*, 
c.client_name,
    c.addressline1,
    c.addressline2,
    c.city,
    c.postalcode,
    c.country,
    c.geom
from pasteis.orders as o join pasteis.clients as c on (c.id = o.client_id);

create view pasteis.routes_map as
select r.id,
	r.stops,
	r.packages,
	r.delivery_date,
	st_linefromencodedpolyline(r.geom) as geom,
    v.capacity
from pasteis.routes as r join pasteis.vehicles as v on (v.id = r.vehicle);