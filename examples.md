# postman order
new:
{"client_id":"6",
"quantity":"20"}

old:
{"client_id":"6",
"quantity":"20",
"delivery_datetime":"2022-02-01 01:01:01",
"geom":"0101000020E6100000AA40D24C9C5522C0096D3997E25C4340"}


# OSRM route
curl "http://127.0.0.1:5000/route/v1/driving/-9.137333,38.716982;-9.151338,38.710760?steps=true"

# VROOM healthcheck
curl -w "%{http_code}" http://localhost:3000/health

# VROOM request
curl --header "Content-Type:application/json" --data '{"vehicles":[{"id":0,"start":[-9.1513,38.7107],"end":[-9.1513,38.7107]}],"jobs":[{"id":0,"location":[-9.1373,38.7169]},{"id":1,"location":[-9.1462,38.7254]}],"options":{"g":true}}' http://localhost:3000
