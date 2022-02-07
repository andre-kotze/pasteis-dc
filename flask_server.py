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
config.read('config.ini')
last_used = config.get('last_used', 'concession')
            config.set('last_used', 'dp', self.last_dp)
            with open('config.ini', 'w') as f:
                config.write(f)








from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
# import os

DB_CONFIG = {
    "database": "taxidb",
    "username": "postgres",
    "password": "postgres",
    "host": "localhost",
    "port": "5432"}

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
# Matches rides_geojson view 

class RidesGeoJSON(db.Model):
    __tablename__ = "rides_geojson"
    __table_args__ = {"schema": "pa"}
    id = db.Column(db.Integer, primary_key=True)
    pickup_datetime = db.Column(db.DateTime())
    dropoff_datetime = db.Column(db.DateTime())
    passenger_count = db.Column(db.Integer)
    geojson = db.Column(db.Text)

# Matches sa.rides table 
class SaRides(db.Model):
    __tablename__ = "rides"
    __table_args__ = {"schema": "sa"}
    id = db.Column(db.Integer, primary_key=True)
    pickup_datetime = db.Column(db.DateTime())
    dropoff_datetime = db.Column(db.DateTime())
    pickup_latitude = db.Column(db.Float())
    pickup_longitude = db.Column(db.Float())
    dropoff_latitude = db.Column(db.Float())
    dropoff_longitude = db.Column(db.Float())
    passenger_count = db.Column(db.Integer)
    rate_code = db.Column(db.Integer)
    payment_type = db.Column(db.Integer)
    tip_amount = db.Column(db.Float())
    total_amount = db.Column(db.Float())

    # Because we want to use this object to insert data into the database
    # We need to be able to create an object from the POST request body
    def __init__(self, pickup_datetime, dropoff_datetime, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude, passenger_count, rate_code, payment_type, tip_amount, total_amount):
        self.pickup_datetime = pickup_datetime
        self.dropoff_datetime = dropoff_datetime
        self.pickup_latitude = pickup_latitude
        self.pickup_longitude = pickup_longitude
        self.dropoff_latitude = dropoff_latitude
        self.dropoff_longitude = dropoff_longitude
        self.passenger_count = passenger_count
        self.rate_code = rate_code
        self.payment_type = payment_type
        self.tip_amount = tip_amount
        self.total_amount = total_amount

## If the tables are not created yet, we can use the create_all() method from SQLAlchemy to
## Magically create them for us using the object created above
# db.create_all()

# Create the REST/CRUD endpoints
# GET method to get a single ride using it's id from the rides_geojson view
@app.route('/rides/<id>', methods=['GET'])
def get_ride(id):
    ride = RidesGeoJSON.query.get(id)
    del ride.__dict__['_sa_instance_state']
    return jsonify(ride.__dict__)

# GET method to get all rides from the rides_geojson view
@app.route('/rides', methods=['GET'])
def get_rides():
  rides = []
  for ride in db.session.query(RidesGeoJSON).all():
    del ride.__dict__['_sa_instance_state']
    rides.append(ride.__dict__)
  return jsonify(rides)

# POST method to insert new rides in sa.rides
@app.route('/rides', methods=['POST'])
def create_ride():
  body = request.get_json()
  db.session.add(SaRides(
      body['pickup_datetime'],
      body['dropoff_datetime'],
      body['pickup_latitude'],
      body['pickup_longitude'],
      body['dropoff_latitude'],
      body['dropoff_longitude'],
      body['passenger_count'],
      body['payment_type'],
      body['rate_code'],
      body['tip_amount'],
      body['total_amount'],
      ))
  db.session.commit()
  return "ride created"

# PUT method to update a ride in sa.rides using its id
@app.route('/rides/<id>', methods=['PUT'])
def update_ride(id):
  body = request.get_json()
  db.session.query(SaRides).filter_by(id=id).update(dict(
      pickup_datetime = body['pickup_datetime'],
      dropoff_datetime = body['dropoff_datetime'],
      pickup_latitude = body['pickup_latitude'],
      pickup_longitude = body['pickup_longitude'],
      dropoff_latitude = body['dropoff_latitude'],
      dropoff_longitude = body['dropoff_longitude'],
      passenger_count = body['passenger_count'],
      payment_type = body['payment_type'],
      rate_code = body['rate_code'],
      tip_amount = body['tip_amount'],
      total_amount = body['total_amount']
      ))
  db.session.commit()
  return "ride updated"

# DELETE method to delete a rides from sa.rides using its id
@app.route('/rides/<id>', methods=['DELETE'])
def delete_ride(id):
  db.session.query(SaRides).filter_by(id=id).delete()
  db.session.commit()
  return "ride deleted"

if __name__ == '__main__':
    
    app.run(debug=True)