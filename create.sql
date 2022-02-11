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
	type VARCHAR(50),
    location INTEGER REFERENCES pasteis.warehouses(id),--foreign key to warehouses
	capacity INTEGER NOT NULL,
	occupation INTEGER default 0,
	--cost_per_time REAL NOT NULL,
	--cost_per_delivery REAL NOT NULL,
	avg_velocity REAL default 30
);

CREATE TABLE pasteis.clients (
	id INTEGER PRIMARY KEY,
	client_name VARCHAR(50),
    addressline1 VARCHAR(50),
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
	delivery_datetime VARCHAR(50), 
	status VARCHAR(50) CHECK (status IN ('To deliver','Delivered','Canceled','Delivery failed','To pick up','To return')) DEFAULT 'To deliver',
    geom geometry(POINT,4326)
);
/*
CREATE TABLE pasteis.streets (
	fid INTEGER NOT NULL,
	streetname VARCHAR(50),
	direction VARCHAR(3), -- maybe necessary, maybe not
	length REAL NOT NULL,
	avg_velocity REAL DEFAULT 30,
	wkb_geometry geometry(LINESTRING,4326)
);
*/

CREATE TABLE pasteis.routes (
	id INTEGER PRIMARY KEY
    vehicle INTEGER REFERENCES pasteis.vehicles(id),--foreign key to vehicles
    geom varchar(256)
);
