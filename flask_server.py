'''
flask main.py from API_example.
We will have to modify it for our thing

To run it, remember to activate api_example environment


ToDO:
- create config file with our server settings
- update the methods for our requirements

'''

from configparser import ConfigParser

config = ConfigParser()
config.read('flask_config.ini')



'''config.set('pasteis', 'dp', self.last_dp)
            with open('config.ini', 'w') as f:
                config.write(f)'''
            



from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
# import os

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

# Create a flask application
app = Flask(__name__)

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



# Create a data model object that matches our database
# Matches clients_geojson view 

class clientsJSON(db.Model):
    __tablename__ = "clients"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)

class ordersJSON(db.Model):
    __tablename__ = "orders"
    __table_args__ = {"schema": "pasteis"}
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    #delivery_datetime = db.Column(db.Integer)
    geometry = db.Column(db.Text)

    def __init__ (self, client_id, quantity, delivery_datetime, geometry):
      self.client_id = client_id
      self.quantity = quantity
      #self.delivery_datetime = delivery_datetime
      self.geometry = geometry




## If the tables are not created yet, we can use the create_all() method from SQLAlchemy to
## Magically create them for us using the object created above
# db.create_all()


# GET method to get all clients from the clients_geojson view
@app.route('/clientids', methods=['GET'])
def get_clients():
  clients = []
  for client in db.session.query(clientsJSON).all():
    del client.__dict__['_sa_instance_state']
    clients.append(client.__dict__)
  return jsonify(clients)

@app.route('/orders', methods =['POST'])
def create_order():
  body = request.get_json()
  db.session.add(ordersJSON(
    body['client_id'], 
    body['quantity'], 
    #body['delivery_datetime'], 
    body['geometry']))
  db.session.commit()
  return "Order created"



if __name__ == '__main__':
    
    app.run(port=3080, debug=True)