# random selection of orders (initial program)
import random
# import pandas
import json
import requests

# GET LIST OF CLIENT IDS FROM SERVER ========#
URL = "http://localhost:5000/clientids"

def get_all() -> list:
    # Using request with GET method
    r = requests.get(URL)
    print('STATUS: ', r.status_code)
    if r.status_code == 200:
        #print('CONTENT: ', r.content)
        #print('TEXT: ', r.text)
        #print('JSON: ', r.json())
        return r.json()



# will be passed as an argument later
response = get_all()
PADARIA_IDS = [list(i.values())[0] for i in response]


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
'''
# Import clients DB
clients = SOMEHOW WE WILL CONNECT IT

# Concatenate the clients db with the quantities for the randomly selected padarias
pandas.DataFrame.from_dict(ORDERS_DICT)
ORDERS_DICT.set_index([0])
orders = pandas.concat([clients, ORDERS_DICT], axis=1, join="inner")
'''
# json part

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