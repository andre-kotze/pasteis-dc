/*
    The purpose of the trigger is to insert into the pa.rides every time a new record is inserted
    in sa.rides. Plus, the longitude and latitude are converted into PostGIS datatypes.
*/
CREATE FUNCTION sa.insert_ride_in_pa()
RETURNS TRIGGER AS
$$
BEGIN


	new.geom = (SELECT geom from clients as c where c.client_id = new.client_id)


END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insert_rides_in_pa
BEFORE INSERT ON sa.rides
FOR EACH ROW
EXECUTE PROCEDURE sa.insert_ride_in_pa();

create view order_geom as
select o.*, c.geom as geom
from order as o join clients as c on (c.client_id = o.client_id)
