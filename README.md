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

2. build & run vod-frontend server on kubernetes
   $ cd frontend
   $ docker build -t vod-frontend:v1 .
   $ kubectl apply -f vod-frontend.yaml
```
