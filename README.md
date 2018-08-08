# ondeAndas

# CENTOS firewall
```
firewall-cmd --get-active-zones
firewall-cmd --zone=public --add-port=20488/tcp --permanent
firewall-cmd --zone=public --add-port=20281/tcp --permanent
firewall-cmd --reload
firewall-cmd --zone=dmz --add-port=20488/tcp --permanent
```
https://developers.google.com/maps/solutions/transport-tracker/

MAPS:
https://www.mapbox.com/maps/ |
https://leafletjs.com/reference-1.3.2.html | 
http://geojson.io

Other MAPS
http://openlayers.org/ |
https://developer.tomtom.com/tomtom-maps-apis-developers |
http://polymaps.org/

TK110
````
begin123456
  adminip123456 193.193.165.167 20488
adminip123456 193.193.165.165 20488
APN123456 myconnection // NOS
GPRS123456
t030s***n123456
check123456
````

GT06
````
#begin#123456#
#apn#123456#net2.vodafone.pt#vodafone#vodafone#
  #IP#123456#193.193.165.167#20281#
#IP#123456#193.193.165.166#20281#
#adminip#123456#193.193.165.166#20281#
TCP
#at#30#sum#0#
#smslink#123456#
````
