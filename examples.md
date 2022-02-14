# postman order
new:
{"client_id":"6",
"quantity":"20"}

old:
{"client_id":"6",
"quantity":"20",
"delivery_datetime":"2022-02-01 01:01:01",
"geom":"0101000020E6100000AA40D24C9C5522C0096D3997E25C4340"}


# OSRM route
curl "http://127.0.0.1:5000/route/v1/driving/-9.137333,38.716982;-9.151338,38.710760?steps=true"

# VROOM healthcheck
curl -w "%{http_code}" http://localhost:3000/health

# VROOM request
curl --header "Content-Type:application/json" --data '{"vehicles":[{"id":0,"start":[-9.1513,38.7107],"end":[-9.1513,38.7107]}],"jobs":[{"id":0,"location":[-9.1373,38.7169]},{"id":1,"location":[-9.1462,38.7254]}],"options":{"g":true}}' http://localhost:3000

curl --header "Content-Type:application/json" --data '{"vehicles":[{"id":0,"start":[-9.15138,38.73365],"end":[-9.15138,38.73365]}],"jobs":[{"id":0,"location":[-9.12878,38.71206]},{"id":1,"location":[-9.12975,38.71814]}],"options":{"g":true}}' http://localhost:3000



# output encoded polylines
gugkFvjzv@@PD^@R?HCPCPQb@EJOPGDCBKFEFKf@ENq@nBc@jAyAsBOGGCOGEAGAEAG?IBgAXo@Nk@Ra@HI@aB^MDaAb@aDtBMHWPCBWNi@^OHs@^IBKB[DaAPcAPI@QFcB`@aB`@}@TK@y@BaCHW?[BKSGUAKOs@CQAKIs@K}@ISGQOa@[[EIQa@EKy@kBi@oA[u@i@kAQc@g@kAu@cBO_@Qa@u@cBIQO_@_@{@Q_@IUMe@m@sAIQQc@Qc@Sc@Sc@GOo@wAEMGMk@qAEKO]o@uAEGYEOCg@AkACW?G?g@ASCSIIGOSkAaBIMRSxCmCJI~@w@f@a@zAqAHIxBiBfB_BDINY@C`@{@P[\\o@N[R_@L_@Ji@DYBS@c@@UVCdAMlC`@VBj@SnAc@FODIBWGYKWAK?IBGn@w@X]FIBK?E?ICQGQ^QRMvAu@RMhCyAPKDAF@ZrADDB?`DgAf@Ov@[DGBMAQIa@Kg@FCNANBT?EWCWoAoCBCB?D@D@VPZN@@b@RD@TJb@Pr@XTJNFPFHD\\Lz@ZPNLHPRNLTLH@F@J?JAHAPEj@M@?B?@?@@FB@@B?@?VV@?@?@?x@WDAB?D?B?@@B@@@BB@@@B?BJp@@HBH@B?BBB@DBD^p@?@@@?@Lv@?B?B?D?BADADABCBABCBEBG@MDi@N{@VIBgAZc@PC@A@EDCF?DAF?F@HBNHZBD@BBB@@@B@?@@@@@?B?LB\\Kb@OTIJC|Ag@FA\\CH?HAJADAjCw@~Bq@HCjCu@|@WjA]~Bq@JC@HPfAL`ABRBLDNBLDJDHFLFHFFFHLLHHHFFDJFNFHDNDLDF@B@B@@@BBBDBB@@D@F@F@DB@@BB@BBF?@?D@D?DAH?T?HAP@RB~AAj@?t@@r@@\\?LG?U?UAMAk@AaBGW?uBJ_@?M?qAFABCBABABADA@ADEXCFGTAHEdAGJCFC@ABGJMNCH?F@ZDf@@Z@F?BB`@HvA@`@?VATE`@AJGp@AFGz@Eh@CZAFEj@CRK~ACh@AXCfAA`@ANC`BGlBAR?FJ|AB^@XBf@FjA?NB^@V@RBNRpADT

# an example from PostGIS, with polyline encoded from geojson:
}{hkFfswv@Ke@|@AIo@kAsCxJ`EvAhArBSr@^`AYTDZzAj@dALjAU^wFdBIl@b@bA~GyAvToGh@tD^`A~@`AfClAHlKgFMuFRa@tAGnAk@~@ZfH}@fL[hLd@fJ\zB
