# GENERATE ORDERS RANDOMLY FOR TESTING THE WORKFLOW

# random for selection of orders (initial program)
import random

# json for decoding and encoding
import json

# requests for accessing server info
import requests

# datetime for manipulating dates and times
from datetime import datetime

# put server address into a variable
URL = "http://localhost:3080/"

# function to get list of clients from the database
def get_all(suffix) -> list:
    # Using request with GET method
    """ Get list of clients from the database (hosted in server)

    Args:
        suffix = makes the function flexible (for orders, clients, etc)
    """
    r = requests.get(URL + suffix)
    print('STATUS: ', r.status_code)
    if r.status_code == 200:
        return r.json()

# get list of clients from the database using function
clients = get_all("clientids")
PADARIA_IDS = clients

# bounding parameters
PADARIAS_COUNT = len(PADARIA_IDS)
MAX_ORDER_SIZE = 70
MIN_ORDERS, MAX_ORDERS = 25, 70

# create orders for a random distribution of clients (units distributed per order = *missing*)
daily_orders_count = random.randint(MIN_ORDERS, MAX_ORDERS)
print(f'Bom dia. Today will have {daily_orders_count} orders to deliver:')

# add dictionary with clients IDs as keys and quantity of boxes as value (which also needs to be generated randomly)
# select a subset of padaria client IDs
daily_order = random.sample(PADARIA_IDS, daily_orders_count)

# generate dictionary of padaria_id : order_quantity
ORDERS_DICT = {padaria: random.randint(1, MAX_ORDER_SIZE) for padaria in daily_order}
print(ORDERS_DICT)
print(f'Total packages {sum(ORDERS_DICT.values())}')

# variable containing file with the date and time set for display
filename = 'requests/orders_' + datetime.now().strftime('%Y%m%d%H%M%S') + '.json'

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

# calling the function using orders dictionary and the .json 
save_result(ORDERS_DICT, filename)