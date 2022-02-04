/*
	This is a multi-line comment.
	As you can see, SQL is not case sensitve.
	That is, This is the same of this and the same as tHis.
*/
CREATE TABLE warehouses (
	id INTEGER PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	addressline1 VARCHAR(50) NOT NULL,
	addressline2 VARCHAR(50) DEFAULT NULL,
	city VARCHAR(50) DEFAULT 'Lisboa',
	country VARCHAR(50) DEFAULT 'Portugal',
	postalcode VARCHAR(15) NOT NULL
);

CREATE TABLE vehicles (
	id INTEGER PRIMARY KEY,
	type VARCHAR(50) NOT NULL,
    location INTEGER REFERENCES warehouses(id),--foreign key to warehouses
	capacity INTEGER NOT NULL,
	occupation INTEGER NOT NULL,
	cost_per_time REAL NOT NULL,
	cost_per_delivery REAL NOT NULL,
	avg_velocity REAL NOT NULL,
);

CREATE TABLE orders (
	order_id INTEGER PRIMARY KEY,
    customername VARCHAR(50) NOT NULL,
    addressline1 VARCHAR(50) NOT NULL,
    addressline2 VARCHAR(50) DEFAULT NULL,
    city VARCHAR(50) NOT NULL,
    postalcode VARCHAR(15) DEFAULT NULL,
    country VARCHAR(50) DEFAULT 'Portugal',
    nif INTEGER,
    quantity INTEGER NOT NULL,
    status VARCHAR(20)
);

CREATE TABLE streets (
	fid INTEGER NOT NULL,
	streetname VARCHAR(50),
	direction VARCHAR(3),
	length REAL NOT NULL,
	avg_velocity REAL NOT NULL
);

CREATE TABLE delivered (
	order_id INTEGER PRIMARY KEY,
	orderdate VARCHAR(10) NOT NULL, --date format
	deliverydate VARCHAR(10) NOT NULL, --date format
	vehicle_id INTEGER NOT NULL
);

CREATE TABLE failed (
	order_id INTEGER PRIMARY KEY,
	orderdate VARCHAR(10) NOT NULL, --date format
	faildate VARCHAR(10) NOT NULL, --date format
	vehicle_id INTEGER NOT NULL
);

CREATE TABLE pending (
	order_id INTEGER PRIMARY KEY,
	orderdate VARCHAR(10) NOT NULL, --date format
	faildate VARCHAR(10) NOT NULL, --date format
	vehicle_id INTEGER NOT NULL
);