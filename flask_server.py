'''
flask server for communicating between Postgres server and users, via Python
To run it, remember to activate api_example environment
'''

# ConfigParser for reading .ini files
from configparser import ConfigParser

# Flask class for creating an instance for the web app  / request for return an object decoded from the request / jsonify for config data to JSON
from flask import Flask, request, jsonify

# SQLAlchemy for SQL toolkit and ORM
from flask_sqlalchemy import SQLAlchemy

# CORS for make cross origin requests
from flask_cors import CORS

# datetime for manipulating dates and times
from datetime import datetime

# json for decoding and encoding
import json

# put ini reader function inside a variable to read the file afterwards
config = ConfigParser()
config.read('flask_config.ini')

# create the dictionary that holds the database structure
DB_CONFIG = {
    "database": config.get('pasteis', 'database'),
    "username": config.get('pasteis', 'username'),
    "password": config.get('pasteis', 'password'),
    "host": config.get('pasteis', 'host'),
    "port": config.get('pasteis', 'port')}

# Notice, normally this is set with environment variables on the server
# machine do avoid exposing the credentials. Something like:
# DB_CONFIG = {}
# DB_CONFIG['database'] = os.environ.get('DATABASE')
# DB_CONFIG['username'] = os.environ.get('USERNAME')
# ...

# create a flask application and run the CORS to enable server connections from the browser
app = Flask(__name__)
CORS(app)

# set the database connection URI in the app configuration
username = DB_CONFIG['username']
password = DB_CONFIG['password']
host = DB_CONFIG['host']
port = DB_CONFIG['port']
database = DB_CONFIG['database']

database_uri = f"postgresql://{username}:{password}@{host}:{port}/{database}"

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

# create object to control SQLAlchemy from the Flask app
db = SQLAlchemy(app)

# create data model objects that match the database

# matches clients table
class clientsJSON(db.Model):
    __tablename__ = "clients"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    client_name = db.Column(db.Text)
    addressline1 = db.Column(db.Text)
    addressline2 = db.Column(db.Text)
    city = db.Column(db.Text)
    postalcode = db.Column(db.Integer)
    country = db.Column(db.Text)
    geom = db.Column(db.Text)

    def __init__ (self, id, client_name, addressline1, addressline2, city, postalcode, country, geom):
      self.id = id
      self.client_name = client_name
      self.addressline1 = addressline1
      self.addressline2 = addressline2
      self.city = city
      self.postalcode = postalcode
      self.country = country
      self.geom = geom


# matches orders table, only clientID and quantity need to be sent for POST
#   maybe later, clients can specify a delivery date
class orderJSON(db.Model):
    __tablename__ = "orders"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    delivery_date = db.Column(db.Integer)
    vehicle = db.Column(db.Integer)

    def __init__ (self, client_id, quantity, delivery_date):
      self.client_id = client_id
      self.quantity = quantity
      self.delivery_date = delivery_date

# matches jobs view. For GET, all fields are required
class jobsJSON(db.Model):
    __tablename__ = "jobs"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    status = db.Column(db.Text)
    geom = db.Column(db.Text)
    delivery_date = db.Column(db.Date)
    address = db.Column(db.Text)
    client_name = db.Column(db.Text)
    vehicle = db.Column(db.Integer)


# matches routes table. For POST from vroom output
class routesJSON(db.Model):
    __tablename__ = "routes"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    vehicle = db.Column(db.Integer)
    stops = db.Column(db.Integer)
    packages = db.Column(db.Integer)
    duration = db.Column(db.Integer)
    distance = db.Column(db.Integer)
    delivery_date = db.Column(db.Date)
    geom = db.Column(db.Text)

    def __init__ (self, vehicle, stops, packages, duration, distance, date, geom):
      self.vehicle = vehicle
      self.stops = stops
      self.packages = packages
      self.duration = duration
      self.distance = distance
      self.delivery_date = date
      self.geom = geom

# matches routes_map view. For GET from frontend
class routesGeoJSON(db.Model):
    __tablename__ = "routes_map"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    vehicle = db.Column(db.Integer)
    capacity = db.Column(db.Integer)
    stops = db.Column(db.Integer)
    packages = db.Column(db.Integer)
    duration = db.Column(db.Integer)
    distance = db.Column(db.Integer)
    delivery_date = db.Column(db.Date)
    geojson = db.Column(db.Text)


# create vehicles_view
class vehiclesJSON(db.Model):
    __tablename__ = "vehicles_view"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    capacity = db.Column(db.Integer)
    location = db.Column(db.Text)

# create a warehouses view
class warehousesJSON(db.Model):
    __tablename__ = "warehouses"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    addressline1 = db.Column(db.Text)
    addressline2 = db.Column(db.Text)
    city = db.Column(db.Text)
    postalcode = db.Column(db.Integer)
    country = db.Column(db.Text)
    geom = db.Column(db.Text)
    stock = db.Column(db.Integer)

# GET method to get all clients id from the clients table
@app.route('/clientids', methods=['GET'])
def get_clientsid():
  clientsid = []
  for client in db.session.query(clientsJSON).all():
    del client.__dict__['_sa_instance_state']
    clientsid.append(client.__dict__['id'])
  return jsonify(clientsid)

# GET method to retrieve all clients
@app.route('/clients', methods =['GET'])
def get_clients():
  clients = []
  # populate list containing clients in a dictionary
  for client in db.session.query(clientsJSON).all():
    del client.__dict__['_sa_instance_state']
    clients.append(client.__dict__)
  return jsonify(clients)

# GET method to retrieve all warehouses
@app.route('/warehouses', methods =['GET'])
def get_warehouses():
  warehouses = []
  # populate list containing clients in a dictionary
  for w in db.session.query(warehousesJSON).all():
    del w.__dict__['_sa_instance_state']
    warehouses.append(w.__dict__)
  return jsonify(warehouses)

# POST method to place orders
@app.route('/orders', methods =['POST'])
def create_order():
  body = request.get_json()
  print(type(body))
  print(body)
  for order in body:
    db.session.add(orderJSON(
      order['client_id'],
      order['quantity'],
      order['delivery_date']))
  db.session.commit()
  count = len(body)
  if count == 1:
    return "Order created"
  else:
    return f"{count} orders created"

# POST method to create clients
@app.route('/clients', methods =['POST'])
def create_client():
  body = request.get_json()
  for client in body:
    db.session.add(clientsJSON(
      client['client_name'], 
      client['addressline1'],
      client['addressline2'],
      client['city'],
      client['postalcode'],
      client['country'],
      client['geom'],
      )) 
  db.session.commit()
  count = len(body)
  if count == 1:
    return "Client created"
  else:
    return f"{count} clients created"

# GET method to retrieve all orders filtered by date
@app.route('/jobs/<date>', methods =['GET'])
def get_days_jobs(date):
  jobs = []
  # wrap in a wrapper, for specifying date
  # date format YYYY-MM-DD
  filter_date = datetime.strptime(date, '%Y-%m-%d')
  print(filter_date)
   # populate list containing date filtered orders in a dictionary
  for job in db.session.query(jobsJSON).filter(jobsJSON.delivery_date == filter_date).all():
    del job.__dict__['_sa_instance_state']
    jobs.append(job.__dict__)
  return jsonify(jobs)

# GET method to retrieve all orders without date filter
@app.route('/jobs', methods =['GET'])
def get_jobs():
  jobs = []
  # populate list containing routes in a dictionary
  for job in db.session.query(jobsJSON).all():
    new_job = {}
    new_job['type'] = 'Feature'
    new_job['properties'] = {'id': job.__dict__['id'], 
                                'client_id': job.__dict__['client_id'],
                                'client_name': job.__dict__['client_name'],
                                'address' : job.__dict__['address'],
                                'status' : job.__dict__['status'],
                                'quantity' : job.__dict__['quantity'],
                                'vehicle' : job.__dict__['vehicle'],
                                'delivery_date' : job.__dict__['delivery_date']}

    new_job['geometry'] = json.loads(job.__dict__['geom'])
    jobs.append(new_job)
    return jsonify(jobs)


# PUT method to edit existing route_orders
@app.route('/route_orders/<id>', methods =['PUT']) 
def assign_orders(id): 
  body = request.get_json() 
  print(body)
  print(type(body))
  db.session.query(orderJSON).filter_by(id=id).update( 
    dict(vehicle=body['vehicle']))
  db.session.commit() 
  return "item updated"

# GET method to retrieve one single order 
@app.route('/orders/<id>', methods =['GET']) 
def get_one_order(id): 
  ord = orderJSON.query.get(id) 
  del ord.__dict__['_sa_instance_state'] 
  return jsonify(ord.__dict__) 
 
# PUT method to edit existing orders 
@app.route('/orders/<id>', methods =['PUT']) 
def edit_orders(id): 
  body = request.get_json()
  db.session.query(orderJSON).filter_by(id=id).update( 
    dict(
      client_id=body['client_id'], 
      quantity=body['quantity'],
      delivery_date=body['delivery_date']
      )) 
  db.session.commit() 
  return "item updated"

# GET method to retreive vehicles
@app.route('/vehicles', methods =['GET'])
def get_vehicles():
  vehicles = []
  for vehicle in db.session.query(vehiclesJSON).all():
    del vehicle.__dict__['_sa_instance_state']
    vehicles.append(vehicle.__dict__)
  return jsonify(vehicles)

# DELETE method to delete vehicles using their id
@app.route('/vehicles/<id>', methods=['DELETE'])
def delete_vehicles(id):
  db.session.query(vehiclesJSON).filter_by(id=id).delete()
  db.session.commit()
  return "vehicle deleted"

# DELETE method to delete jobs (delete the order, as jobs is a view) using their id
@app.route('/orders/<id>', methods=['DELETE'])
def delete_jobs(id):
  db.session.query(orderJSON).filter_by(id=id).delete()
  db.session.commit()
  return "ride deleted"

# DELETE method to delete clients using their id
@app.route('/clients/<id>', methods=['DELETE'])
def delete_clients(id):
  db.session.query(orderJSON).filter_by(id=id).delete()
  db.session.commit()
  return "ride deleted"

# POST method to load routes from vroom into db
@app.route('/routes', methods =['POST'])
def create_route():
  body = request.get_json()
  for route in body['routes']:
    db.session.add(routesJSON(
      route['vehicle'],
      len(route['steps']) - 2, # nr of stops
      route['delivery'][0],
      route['duration'],
      route['distance'],
      route['delivery_date'],
      route['geometry']))
  db.session.commit()
  count = len(body)
  if count == 1:
    return "Route created"
  else:
    return f"{count} routes created"

# GET method to retrieve all routes without date filter
@app.route('/routes', methods =['GET'])
def get_routes():
  routes = []
  # populate list containing routes in a dictionary
  for route in db.session.query(routesGeoJSON).all():
    new_route = {}
    new_route['type'] = 'Feature'
    new_route['properties'] = {'id': route.__dict__['id'], 
                                'vehicle': route.__dict__['vehicle'],
                                'capacity' : route.__dict__['capacity'],
                                'stops' : route.__dict__['stops'],
                                'packages' : route.__dict__['packages'],
                                'duration' : route.__dict__['duration'],
                                'distance' : route.__dict__['distance'],
                                'delivery_date' : route.__dict__['delivery_date']}

    new_route['geometry'] = json.loads(route.__dict__['geojson'])
    routes.append(new_route)
  return jsonify(routes)

# GET method to retrieve all routes filtered by date
@app.route('/routes/<date>', methods =['GET'])
def get_days_routes(date):
  routes = []
  # populate list containing routes in a dictionary
  for route in db.session.query(routesGeoJSON).filter(routesGeoJSON.delivery_date == date).all():
    new_route = {}
    new_route['type'] = 'Feature'
    new_route['properties'] = {'id': route.__dict__['id'], 
                                'vehicle': route.__dict__['vehicle'],
                                'capacity' : route.__dict__['capacity'],
                                'stops' : route.__dict__['stops'],
                                'packages' : route.__dict__['packages'],
                                'duration' : route.__dict__['duration'],
                                'distance' : route.__dict__['distance'],
                                'delivery_date' : route.__dict__['delivery_date']}

    new_route['geometry'] = json.loads(route.__dict__['geojson'])
    routes.append(new_route)
  return jsonify(routes)

# statement to run the app in the specified server
if __name__ == '__main__':
    app.run(port=3080, debug=True)