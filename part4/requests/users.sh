#!/bin/bash

# GET all blogs
echo "➡️  GET all users"
http GET :3001/api/users
echo -e "\n----------------------------------\n"


echo "➡️  POST a user"
http POST :3001/api/users \
  Content-Type:application/json \
  username="elUser" \
  name="Nombre Test" \
  password="okok"
echo -e "\n----------------------------------\n"
