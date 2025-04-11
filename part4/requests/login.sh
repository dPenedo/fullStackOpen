#!/bin/bash

echo "➡️  login a user"

http POST :3001/api/login \
  Content-Type:application/json \
  username="hola" \
  password="okok"
echo -e "\n----------------------------------\n"
