-- ADD DEFAULT DELIVERY DATE / TIME TO THE ORDERS DB
UPDATE pasteis.orders 
WHERE pasteis.orders.delivery_datetime IS NULL
SET delivery_datetime = GETDATE();
    -- It would be cooler to add something like the next day at 7:00 but idk

--MERGE THE ORDER SIMULATOR RESULTS WITH THE EXISTING CLIENTS DATA IN THE DATABASE
CREATE VIEW pasteis.orders AS
SELECT pasteis.orders.id, pasteis.clients.id, pasteis.clients.client_name, pasteis.clients.addressline1, pasteis.clients.addressline2, pasteis.clients.postalcode, pasteis.clients.geom, pasteis.orders.delivery_datetime, pasteis.orders.quantity, pasteis.orders.status
FROM pasteis.orders
INNER JOIN pasteis.clients ON pasteis.orders.client_id = pasteis.orders.id;
