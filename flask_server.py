'''
flask server for communicating between Postgres server and users, via Python
To run it, remember to activate api_example environment
'''

from configparser import ConfigParser
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

config = ConfigParser()
config.read('flask_config.ini')

DB_CONFIG = {
    "database": config.get('pasteis', 'database'),
    "username": config.get('pasteis', 'username'),
    "password": config.get('pasteis', 'password'),
    "host": config.get('pasteis', 'host'),
    "port": config.get('pasteis', 'port')}

# Notice, normally this is set with environment variables on the server
# machine do avoid exposing the credentials. Something like
# DB_CONFIG = {}
# DB_CONFIG['database'] = os.environ.get('DATABASE')
# DB_CONFIG['username'] = os.environ.get('USERNAME')
# ...

# Create a flask application. Run the CORS to enable server connections from the browser
app = Flask(__name__)
CORS(app)

# Set the database connection URI in the app configuration
username = DB_CONFIG['username']
password = DB_CONFIG['password']
host = DB_CONFIG['host']
port = DB_CONFIG['port']
database = DB_CONFIG['database']

database_uri = f"postgresql://{username}:{password}@{host}:{port}/{database}"

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

# Create object to control SQLAlchemy from the Flask app
db = SQLAlchemy(app)

# Create data model objects that match the database

# Matches clients table, only IDs need to be retrieved
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


# Matches orders table, only clientID and quantity need to be sent for POST
#   maybe later, clients can specify a delivery date
class orderJSON(db.Model):
    __tablename__ = "orders"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)

    def __init__ (self, client_id, quantity):
      self.client_id = client_id
      self.quantity = quantity

# Matches jobs view. For GET, all fields are required
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

# vehicles_view
class vehiclesJSON(db.Model):
    __tablename__ = "vehicles_view"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    capacity = db.Column(db.Integer)
    location = db.Column(db.Text)


# GET method to get all clients from the clients table
@app.route('/clientids', methods=['GET'])
def get_clients():
  clients = []
  for client in db.session.query(clientsJSON).all():
    del client.__dict__['_sa_instance_state']
    clients.append(client.__dict__)
  return jsonify(clients)

# POST method to place orders
@app.route('/orders', methods =['POST'])
def create_order():
  body = request.get_json()
  print(type(body))
  for order in list(body.keys()):
    db.session.add(orderJSON(
      order,
      body[order]))
      #order.value)) 
#      order['client_id'], 
#      order['quantity'])) 
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
      client['id'],
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

# GET method to retrieve all orders.. Maybe later we can filter by date
@app.route('/jobs', methods =['GET'])
def get_jobs():
  jobs = []
  for job in db.session.query(jobsJSON).all():
    del job.__dict__['_sa_instance_state']
    jobs.append(job.__dict__)
  return jsonify(jobs)

# GET method to retreive vehicles
@app.route('/vehicles', methods =['GET'])
def get_vehicles():
  vehicles = []
  for vehicle in db.session.query(vehiclesJSON).all():
    del vehicle.__dict__['_sa_instance_state']
    vehicles.append(vehicle.__dict__)
  return jsonify(vehicles)

if __name__ == '__main__':
    app.run(port=3080, debug=True)