# simple vod-on-kubernetes
## movie-db-api

### build docker image
$ docker build -t movie-db-api:v1 .

### deploy movie-db-api on Kubernetes (minikube)
$ kubectl apply -f movie-db-api.yaml
