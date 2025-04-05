BLOG_ID="67f1b727f1417dae8298a2ba"

#!/bin/bash

# GET all blogs
echo "➡️  GET all blogs"
http GET :3001/api/blogs
echo -e "\n----------------------------------\n"

# GET a blog by ID
echo "➡️  GET blog by ID"
http GET :3001/api/blogs/$BLOG_ID
echo -e "\n----------------------------------\n"

# POST create a new blog
echo "➡️  POST create a new blog"
http POST :3001/api/blogs \
  title="Nuevo blog desde WebStorm" \
  author="Daniel" \
  url="https://dpenedo.com" \
  likes:=7
echo -e "\n----------------------------------\n"

# DELETE a blog by ID
echo "➡️  DELETE blog by ID"
http DELETE :3001/api/blogs/$BLOG_ID
echo -e "\n----------------------------------\n"

# PUT update a blog by ID
echo "➡️  PUT update blog by ID"
http PUT :3001/api/blogs/$BLOG_ID \
  title="Blog actualizado" \
  author="Daniel P." \
  url="https://dpenedo.com/actualizado" \
  likes:=10
echo -e "\n✅ Todos los requests ejecutados.\n"
