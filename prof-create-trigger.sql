/*
    The purpose of the trigger is to insert into the pa.rides every time a new record is inserted
    in sa.rides. Plus, the longitude and latitude are converted into PostGIS datatypes.
*/
CREATE FUNCTION pasteis.update_orders()
RETURNS TRIGGER AS
$$
BEGIN


	new.geom = (SELECT geom from clients as c where c.client_id = new.client_id)
    new.client = (SELECT client_name from clients as c where c.client_id = new.client_id)


END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insert_rides_in_pa
BEFORE INSERT ON pasteis.orders
FOR EACH ROW
EXECUTE PROCEDURE pasteis.update_orders();


/* THIS IS THE SECOND OPTION MAYBE FOR IMPLEMENTING LATER......
create view order_geom as
select o.*, c.geom as geom
from order as o join clients as c on (c.client_id = o.client_id)
*/