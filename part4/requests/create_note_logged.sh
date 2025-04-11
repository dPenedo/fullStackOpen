echo "POST create a new blog logged by Token"

http POST :3001/api/blogs \
  Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhvbGEiLCJpZCI6IjY3Zjk3ZDFlMzA3N2YwNzY2NzljNGI1ZCIsImlhdCI6MTc0NDQwMzc3OH0.JbDu1pSOeBYzktWth3oYCfHxDYWanRB8dQUmlc134tc" \
  title="Otro blog loggeado" \
  author="Daniel" \
  url="https://dpenedo.com" \
  likes:=7

echo -e "\n----------------------------------\n"
