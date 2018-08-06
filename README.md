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
