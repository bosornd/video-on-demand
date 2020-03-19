# simple vod-on-kubernetes
## movie-db-api

```
data(movies.json)를 DB에 import하기 위해서 host folder를 mount 함.
1. movie-db-api.yaml에 host 폴더를 수정할 것.
2. movies.json을 공유된 host 폴더에 복사할 것.
3. MOVIE-DB POD가 생성되면 다음 명령으로 data를 import 함.
   $ kubectl exec {{MOVIE_DB POD명}} -- mongoimport --db vod --collection movies host/movies.json --legacy
```

### build docker image
$ docker build -t movie-db-api:v1 .

### deploy movie-db-api on Kubernetes (minikube)
$ kubectl apply -f movie-db-api.yaml
