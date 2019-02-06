# Video on Demand Example on Kubernetes

```
1. build & run movie-db-api server on kubernetes
   $ cd db
   $ docker build -t movie-db-api:v1 .
   $ kubectl apply -f movie-db-api.yaml

2. build & run vod-frontend server on kubernetes
   $ cd frontend
   $ docker build -t vod-frontend:v1 .
   $ kubectl apply -f vod-frontend.yaml
```
