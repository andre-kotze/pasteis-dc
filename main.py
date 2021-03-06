import VROOM_requests as vrm
import argparse


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="PdC Routing and Delivery Optimisation")
    parser.add_argument('--date', required=True, help="Delivery date string, format YYYY-MM-DD e.g 2022-02-22")
    #parser.add_argument('--out_file', required=True, help="The output file (.json)")
    args = parser.parse_args()

    # send request to vroom, with current vehicles and relevant date
    response = vrm.make_request(args.date)
    result = vrm.send_to_vroom(response)
    result_date = vrm.add_date_to_vroom_result(result.json(), args.date)
    
    # upload the routes to the DB
    vrm.upload_lines(result_date)
