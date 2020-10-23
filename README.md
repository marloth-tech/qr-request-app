# qr-request-app

This APP is used to interact with APIs via a physical QR-Code. 

The url and authentication for the request are saved in the app. You also have to enter a json-template, of what you expect the request to look like. 

The QR-Code is then only used to change values from that template. 



e.g. to create a **material request in ERPnext** you would enter: 

url: `https://<yourerpnext.com>/api/resource/Material%20Request`
token: `xxxxxxxxxxx:yyyyyyyyyyyyyy`

```json-template: 
{
  "data": {
  "naming_series": "MAT-MR-.YYYY.-",
  "material_request_type": "Purchase",
  "status": "Pending",
  "items":[{
    "item_code": "STO-ITEM-2020-00001",
    "schedule_date": "2020-12-10",
    "qty": 1}]
  }
}
```


The QR-codes are then only used to change the item_code and quantity. They might look like: 

 `{"data": {"item_code": "STO-ITEM-2020-00002", "qty" : 100}}`
 
 
![example qr](https://api.qrserver.com/v1/create-qr-code/?data=+%7B%22data%22%3A+%7B%22item_code%22%3A+%22STO-ITEM-2020-00002%22%2C+%22qty%22+%3A+100%7D%7D&size=220x220&margin=0)

##  variables in the template function 

`{{ today }}`
will be replaced with todays date in the format YYYY-MM-DD
