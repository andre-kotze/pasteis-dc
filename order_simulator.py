# random selection of orders (initial program)
import random
import numpy
import pandas
import json

# will be passed as an argument later
PADARIA_IDS = numpy.arange(80).tolist()

# bounding parameters
PADARIAS_COUNT = len(PADARIA_IDS)
MAX_ORDER_SIZE = 40
MIN_ORDERS, MAX_ORDERS = 10, 40

# create orders for a random distribution of clients (units distributed per order = *missing*)
daily_orders_count = random.randint(MIN_ORDERS, MAX_ORDERS)
print(f'Bomdia. Today will have {daily_orders_count} orders to deliver:')

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