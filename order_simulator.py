# GENERATE ORDERS RANDOMLY FOR TESTING THE WORKFLOW

# random for selection of orders (initial program)
import random

# json for decoding and encoding
import json

# requests for accessing server info
import requests

# datetime for manipulating dates and times
from datetime import datetime, timedelta, date

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
MAX_ORDER_SIZE = 40
MIN_ORDERS, MAX_ORDERS = 20, 40

# create orders for a random distribution of clients (units distributed per order = *missing*)
daily_orders_count = random.randint(MIN_ORDERS, MAX_ORDERS)
print(f'Bom dia. Today will have {daily_orders_count} orders to deliver:')

# add dictionary with clients IDs as keys and quantity of boxes as value (which also needs to be generated randomly)
# select a subset of padaria client IDs
daily_order = random.sample(PADARIA_IDS, daily_orders_count)

# YYYY-MM-DD
TOMORROW = (datetime.today() + timedelta(days=4)).strftime("%Y-%m-%d")
#YESTERDAY = (dt.datetime.now().date() - dt.timedelta(days = 1)).strftime("%Y-%m-%d")

# generate list of dictionaries in ordersJSON format
orders_list = []
for padaria in daily_order:
    orders_list.append({"client_id" : padaria,
                    "quantity": random.randint(1, MAX_ORDER_SIZE),
                    "delivery_date" : TOMORROW
                    })

# JSON FORMAT FOR ORDERS POST 
'''
{
  "client_id" : 0,
  "quantity" : 10,
  "delivery_date" : "2022-02-22"
 }
'''

print(f'Total packages {sum(dic["quantity"] for dic in orders_list)}')

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
save_result(orders_list, filename)