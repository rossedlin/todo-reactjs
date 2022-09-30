
docker compose run web node -v;
docker compose run web npm -v;
docker compose run web yarn -v;
docker compose run web firebase --version;

docker compose run web yarn install;
docker compose up;
