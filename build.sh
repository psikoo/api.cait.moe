git pull
chmod +x ./build.sh
docker build -t nest-caitmoe:1 .
docker compose down
docker compose up -d