# simple vod-on-kubernetes
## vod-frontend

### build docker image
$ docker build -t vod-frontend:v1 .

### deploy vod-frontend on Kubernetes (minikube)
$ kubectl apply -f vod-frontend.yaml
