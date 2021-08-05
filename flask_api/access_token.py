from flask import Flask
from flask import request as flask_request
import requests, json
from arcgis.geometry import Geometry
from arcgis.gis import GIS
from arcgis.geocoding import reverse_geocode
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/getaddress')
def getaddress():
    phonenumber = flask_request.args.get('phone')
    print(phonenumber)
    access_token_url = "https://alb.dev.arcgis.wellingtonwater.cloud/portal/sharing/rest/generateToken"
    payload={'username': 'sakthi.nallathambi',
    'password': 'ADMIN_p@SSW0RD01',
    'ip': '',
    'expiration': '1',
    'client': 'requestip',
    'f': 'pjson'}
    files=[]
    headers = {}
    response = requests.request("POST", access_token_url, headers=headers, data=payload, files=files)
    response = json.loads(response.text)
    token_access = response["token"]

    sms_url = "https://alb.dev.arcgis.wellingtonwater.cloud/server/rest/services/Hosted/sms_location_form/FeatureServer/1/query?geometryType=esriGeometryEnvelope&outFields=*&returnGeometry=true&returnCountOnly=false&f=pjson&token="+token_access+"&where=survey_phone='"+str(phonenumber)+"'"
    payload={}
    headers = {}
    response = requests.request("GET", sms_url, headers=headers, data=payload)
    response1 = json.loads(response.text)

    globalIds ="" 

    for feature in response1["features"]:
        feature = json.dumps(feature)
        feature = json.loads(feature)
        globalId = feature["attributes"]["globalid"]
        if globalId != "":
            if globalIds == "":
                globalIds = globalIds+"'"+str(globalId)+"'"
            else:    
                globalIds = globalIds+" or parentglobalid="+"'"+str(globalId)+"'"

    location_repeat_url = "https://alb.dev.arcgis.wellingtonwater.cloud/server/rest/services/Hosted/sms_location_form/FeatureServer/0/query?geometryType=esriGeometryEnvelope&outFields=*&f=pjson&token="+token_access+"&where=parentglobalid="+globalIds
    payload={}
    headers = {}
    response = requests.request("GET", location_repeat_url, headers=headers, data=payload)
    response2 = json.loads(response.text)
    addresses = []
    avc= {}
    for feature in response2["features"]:
        feature = json.dumps(feature)
        feature = json.loads(feature)
        gis = GIS("https://alb.dev.arcgis.wellingtonwater.cloud/portal/", "sakthi.nallathambi", "ADMIN_p@SSW0RD01")
        pt = Geometry({
            "x": feature["geometry"]["x"],
            "y": feature["geometry"]["y"],
            "spatialReference": {
                "wkid": 3857
            }
        })
        rev_geocoded_raw = reverse_geocode(pt)
        rev_geocoded = json.dumps(rev_geocoded_raw)
        rev_geocoded = json.loads(rev_geocoded)
        full_address = rev_geocoded["address"]["LongLabel"]
        objectid = feature["attributes"]["objectid"]
        data = {'id':objectid,'address':full_address}
    
        addresses.append((data))

    return json.dumps(addresses)


# @app.route('/post', methods=["POST"])
# def testpost():
#      input_json = request.get_json(force=True) 
#      dictToReturn = {'text':input_json['text']}
#      return jsonify(dictToReturn)
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)