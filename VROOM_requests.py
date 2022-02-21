# GENERATE VROOM COMPATIBLE ORDERS

# json for decoding and encoding
import json

# requests for accessing server info
import requests

# datetime for manipulating dates and times
from datetime import datetime

# put server address into a variable
URL = "http://localhost:3080/"

# function get list of clients IDs from the database
def get_all(suffix) -> list:
    """ Get list of clients from the database (hosted in server)

    Args:
        suffix = makes the function flexible (for orders, clients, etc)
    """
    r = requests.get(URL + suffix)
    print('STATUS: ', r.status_code)
    if r.status_code == 200:
        return r.json()

# get jobs from database using function
jobs = get_all('jobs/2022-02-22')

# get vehicles from database using function
vehicles = get_all('vehicles')

# generate list of vehicles
vehicles_list = []
# populate list with dictionary containing the features to take from the database
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
# populate list with dictionary containing the features to take from the database
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

# make vroom dictionary request format using the previoulsy populated lists and the options variable that contains the geometry
options = {"g":  True}
vroom = {'vehicles': vehicles_list, 'jobs': jobs_list, 'options': options}

# variable for setting the display name of the file
filename = 'requests/vroom' + datetime.now().strftime('%Y%m%d%H%M%S') + '.json'

# function to save dictionary in JSON file
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

# calling the function using vroom dictionary and the filename variable for naming the outcome
save_result(vroom, filename)