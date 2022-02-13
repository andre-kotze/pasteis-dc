update pasteis.orders
set geom = clients.geom
from pasteis.clients --, pasteis.orders
where pasteis.clients.id = pasteis.orders.client_id;