# Video on Demand Example on Kubernetes
arch1
```
1. build & run movie-db-api server on kubernetes
   $ cd db/movies
   $ docker build -t movie-db-api:v1 .
   $ kubectl apply -f movie-db-api.yaml

2. build & run user-db-api server on kubernetes
  $ cd db/users
  $ docker build -t user-db-api:v1 .
  $ kubectl apply -f user-db-api.yaml

3. kubectl apply -f https://getambassador.io/yaml/ambassador/ambassador-rbac.yaml

    waiting for creating ambassador pods 5m~20m

4. kubectl apply -f ambassador-service.yaml


5-1. build & run vod-frontend-ranking server on kubernetes
   $ cd frontend-ranking
   $ docker build -t vod-frontend-ranking:v1 .
   $ kubectl apply -f vod-frontend-ranking.yaml

5-2. build & run vod-frontend-ranking server on kubernetes
   $ cd frontend-ranking-movie
   $ docker build -t vod-frontend-movie:v1 .
   $ kubectl apply -f vod-frontend-movie.yaml   
```
