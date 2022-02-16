# random selection of orders (initial program)
import random
import json
import requests

# GET LIST OF CLIENT IDS FROM SERVER ========#
URL = "http://localhost:3080/"

def get_all(suffix) -> list:
    # Using request with GET method
    r = requests.get(URL + suffix)
    print('STATUS: ', r.status_code)
    if r.status_code == 200:
        return r.json()

# get list of clients
clients = get_all("clientids")
#PADARIA_IDS = [i['id'] for i in clients]
PADARIA_IDS = clients

# bounding parameters
PADARIAS_COUNT = len(PADARIA_IDS)
MAX_ORDER_SIZE = 40
MIN_ORDERS, MAX_ORDERS = 10, 40

# create orders for a random distribution of clients (units distributed per order = *missing*)
daily_orders_count = random.randint(MIN_ORDERS, MAX_ORDERS)
print(f'Bom dia. Today will have {daily_orders_count} orders to deliver:')

# ADD dictionary with clients IDs as keys and quantity of boxes as value (which also needs to be generated randomly)
# select a subset of padaria client IDs
daily_order = random.sample(PADARIA_IDS, daily_orders_count)

# generate dict of padaria_id : order_quantity
ORDERS_DICT = {padaria: random.randint(1, MAX_ORDER_SIZE) for padaria in daily_order}
print(ORDERS_DICT)
print(f'Total packages {sum(ORDERS_DICT.values())}')

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

save_result(ORDERS_DICT, 'ordersLX.json')