import VROOM_requests as vrm
import argparse


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="PdC Routing and Delivery Optimisation")
    parser.add_argument('--date', required=True, help="Delivery date string, format YYYY-MM-DD e.g 2022-02-22")
    #parser.add_argument('--out_file', required=True, help="The output file (.json)")
    args = parser.parse_args()

    # send request to vroom, with current vehicles and relevant date
    response = vrm.make_request(args.date)
    vrm.add_date_to_vroom_result(response, args.date)
    # 
    vrm.upload_lines(analysis, args.out_file)


    vrm.upload_points(analysis, args.out_file)
