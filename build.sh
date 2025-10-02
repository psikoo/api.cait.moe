git pull
chmod +x ./build.sh
docker build -t api-nest:1 .
docker compose down
docker compose up -d