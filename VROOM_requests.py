# GENERATE VROOM COMPATIBLE ORDERS
import json
from sqlite3 import Timestamp
import requests
from datetime import datetime

# GET LIST OF CLIENT IDS FROM SERVER ========#
URL = "http://localhost:3080/"

def get_all(suffix) -> list:
    # Using request with GET method
    r = requests.get(URL + suffix)
    print('STATUS: ', r.status_code)
    if r.status_code == 200:
        #print('CONTENT: ', r.content)
        #print('TEXT: ', r.text)
        #print('JSON: ', r.json())
        return r.json()

# get jobs from db
jobs = get_all('jobs')

# get vehicles from db
vehicles = get_all('vehicles')

# generate list of vehicles
vehicles_list = []
for vehicle in vehicles:
    location = json.loads(vehicle['location'])['coordinates']
    vehicles_dict = {}
    vehicles_dict['id'] = vehicle['id']
    vehicles_dict['capacity'] = [vehicle['capacity']]
    vehicles_dict['start'] = location
    vehicles_dict['end'] = location
    vehicles_list.append(vehicles_dict)

# generate list of jobs
jobs_list = []
for job in jobs:
    jobs_dict = {}
    jobs_dict['id'] = job['id']
    jobs_dict['client_id'] = job['client_id']
    jobs_dict['address'] = job['address']
    jobs_dict['delivery_date'] = job['delivery_date']
    jobs_dict['delivery'] = [job['quantity']]
    jobs_dict['status'] = job['status']
    jobs_dict['location'] = json.loads(job['geom'])['coordinates']
    jobs_list.append(jobs_dict)

# vroom request
options = {"g":  True}
vroom = {'vehicles': vehicles_list, 'jobs': jobs_list, 'options': options}

filename = 'requests/vroom' + datetime.now().strftime('%Y%m%d%H%M%S') + '.json'
## json part

def save_result(data , outfile) -> None:
    """ Saves a dictionary in JSON file

    Args:
        data (dict): the data to save
        outfile (str): the name of the file (.json)
    """
    try:
        with open(outfile, 'w') as fp:
            json.dump(data, fp, indent=2)
    except Exception as e:
        print(e)

save_result(vroom, filename)