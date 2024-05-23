## Run BE

them serviceAccount.json vao folder be

Chay docker

docker compose up

=> PORT 4000

run FE

cd fe
npm install
npm run dev

vao fe => http://localhost:5173

API

BASEURL = http://localhost:4000/api
#POST

# Routes to get userId from raspberry

url: BASEURL + "/user"
body: {userId}

# Cham cong

url: BASEURL + "/time/:userId"

API nay dung de cham cong => Viec cham cong dua vao data
