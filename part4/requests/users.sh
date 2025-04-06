#!/bin/bash

# GET all blogs
echo "➡️  GET all users"
http GET :3001/api/users
echo -e "\n----------------------------------\n"


echo "➡️  POST a user"
http POST :3001/api/users \
  Content-Type:application/json \
  username="uelalal" \
  name="Nombre Test" \
  password="laguagua"
echo -e "\n----------------------------------\n"
