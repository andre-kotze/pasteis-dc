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

# Matches orders table. For GET, all fields are required
class ordersJSON(db.Model):
    __tablename__ = "orders"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer)
    client_name = db.Column(db.Text)
    quantity = db.Column(db.Integer)
    status = db.Column(db.Text)
    geom = db.Column(db.Text)
    delivery_date = db.Column(db.Text)

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
  for order in body:
    db.session.add(orderJSON(
      order['client_id'], 
      order['quantity'])) 
  db.session.commit()
  count = len(body)
  if count == 1:
    return "Order created"
  else:
    return f"{count} orders created"

# GET method to retrieve all orders.. Maybe later we can filter by date
@app.route('/orders', methods =['GET'])
def get_orders():
  orders = []
  for order in db.session.query(ordersJSON).all():
    del order.__dict__['_sa_instance_state']
    orders.append(order.__dict__)
  return jsonify(orders)

if __name__ == '__main__':
    app.run(port=3080, debug=True)