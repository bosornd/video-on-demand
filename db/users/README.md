# simple vod-on-kubernetes
## user-db-api

### build docker image
$ docker build -t user-db-api:v1 .

### deploy user-db-api on Kubernetes (minikube)
$ kubectl apply -f user-db-api.yaml
