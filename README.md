# Offline Bible App - UI
Offline Bible App - UI in text and get back a translation

## Setup

1. Clone repo
2. Run `docker-compose build`
3. Run `docker-compose run app npm run build-bwr`
4. Run `docker-compose up`

## Docker Compose
Fully dockerized and ready to run on your dev server. See the [docker-compose.yml](/docker-compose.yml) file.

Run this command to start up the docker container
```
docker-compose up
```

## Gulp

### Bower
To compile bower files run the following command. **NOTE**: You only need to run this after you clone the repo.
```
docker-compose run app npm run build-bwr
```

### Tests
```
docker-compose run app gulp mocha
```
