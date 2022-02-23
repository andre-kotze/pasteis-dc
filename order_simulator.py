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

# YYYY-MM-DD
TOMORROW = (datetime.today() + timedelta(days=2)).strftime("%Y-%m-%d")

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

def create_scenario(date):
# get list of clients from the database using function
    PADARIA_IDS = get_all("clientids")

    # bounding parameters
    MAX_ORDER_SIZE = 30
    MIN_ORDERS, MAX_ORDERS = 20, 40

    # create orders for a random distribution of clients (units distributed per order = *missing*)
    daily_orders_count = random.randint(MIN_ORDERS, MAX_ORDERS)
    print(f'Bom dia. Today will have {daily_orders_count} orders to deliver:')

    # select a subset of padaria client IDs
    daily_order = random.sample(PADARIA_IDS, daily_orders_count)

    # generate list of dictionaries in ordersJSON format
    orders_list = []
    for padaria in daily_order:
        orders_list.append({"client_id" : padaria,
                        "quantity": random.randint(1, MAX_ORDER_SIZE),
                        "delivery_date" : date
                        })
    print(f'Total packages {sum(dic["quantity"] for dic in orders_list)}')
    return orders_list

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
# save_result(orders_list, filename)

def upload_orders(orders):
    url = "http://localhost:3080/orders?Content-Type=application/json"
    payload = json.dumps(orders)
    headers = {
    'Authorization': '5b3ce3597851110001cf624827861a30001c4ea7ac1a9dabbe858ce2',
    'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)


new_orders = create_scenario(TOMORROW)

upload_orders(new_orders)