/*
	To create the db anew
*/
CREATE TABLE warehouses (
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

CREATE TABLE vehicles (
	id INTEGER PRIMARY KEY,
	type VARCHAR(50) NOT NULL,
    	location INTEGER REFERENCES warehouses(id),--foreign key to warehouses
	capacity INTEGER NOT NULL,
	occupation INTEGER NOT NULL,
	cost_per_time REAL NOT NULL,
	cost_per_delivery REAL NOT NULL,
	avg_velocity REAL NOT NULL
);

CREATE TABLE clients (
	id INTEGER PRIMARY KEY,
	osm_node VARCHAR(50) NOT NULL,
	customer_name VARCHAR(50) NOT NULL,
    addressline1 VARCHAR(50) NOT NULL,
    addressline2 VARCHAR(50) DEFAULT NULL,
    city VARCHAR(50) NOT NULL DEFAULT 'Lisboa',
    postalcode VARCHAR(8) DEFAULT NULL,
    country VARCHAR(50) DEFAULT 'Portugal',
    nif INTEGER,
    geom geometry(POINT,4326)
);

CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    quantity INTEGER NOT NULL,
    status VARCHAR(20)
);

CREATE TABLE streets (
	fid INTEGER NOT NULL,
	streetname VARCHAR(50),
	direction VARCHAR(3),
	length REAL NOT NULL,
	avg_velocity REAL NOT NULL,
	wkb_geometry geometry(LINESTRING,4326)
);
