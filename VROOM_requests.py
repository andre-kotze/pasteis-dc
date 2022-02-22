# GENERATE AND SEND VROOM COMPATIBLE ORDERS
#   ADD THE DATE TO THE ROUTES IN DB

# json for decoding and encoding
import json

# requests for accessing server info
import requests

# datetime for manipulating dates and times
from datetime import datetime

# put server addresses into variables
FLASK_URL = "http://localhost:3080/" # address of flask to DB
VROOM_URL = "http://localhost:3000/" # address of local vroom server

# function to send requests
def get_all(url, suffix='') -> list:
    """ Submit requests to via Flask or to vroom

    Args:
        url = server address
        suffix = makes the function flexible (for orders, clients, etc)
    """
    r = requests.get(url + suffix)
    print('STATUS: ', r.status_code)
    if r.status_code == 200:
        return r.json()

def make_request(date):
    # get jobs from database using function
    jobs = get_all(FLASK_URL, 'jobs/' + date)

    # get vehicles from database using function
    vehicles = get_all(FLASK_URL, 'vehicles')

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
    return {'vehicles': vehicles_list, 'jobs': jobs_list, 'options': options}

def send_to_vroom(request):
    payload = json.dumps(request)
    headers = {'Content-Type': 'application/json'}
    #response = get_all(VROOM_URL)

    response = requests.request("POST", VROOM_URL + '?Content-Type=application/json', headers=headers, data=payload)
    #print(response.text)

    return response

def add_date_to_vroom_result(result, delivery_date):
    routes = []
    for route in result['routes']:
        thing = route.copy()
        thing['delivery_date'] = delivery_date
        for step in route['steps']:
            step['delivery_date'] = delivery_date
        routes.append(thing)
    result['routes'] = routes

    return result

def upload_lines():
    
    return

def upload_points():
    
    return



'''
# file maker for testing purposes
# variable for setting the display name of the file
#filename = 'requests/vroom' + datetime.now().strftime('%Y%m%d%H%M%S') + '.json'

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
#save_result(vroom, filename)
# '''
