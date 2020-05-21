# simple vod-on-kubernetes
## movie-db-api

```
data(movies.json)를 DB에 import하기 위해서 host folder를 mount 함.
1. movie-db-api.yaml에 host 폴더를 수정할 것.
2. movies.json을 공유된 host 폴더에 복사할 것.
3. MOVIE-DB POD가 생성되면 다음 명령으로 data를 import 함.
   $ kubectl exec {{MOVIE_DB POD명}} -- mongoimport --db vod --collection movies host/movies.json --legacy
   
   
Hyper-V로 minikube 동작시에는 다음과 같이 hostpath를 연결해 준다.
먼저 windows에서 네트워크 공유 폴더를 설정한다. \\192.168.22.10\shared_folder
(192.168.22.10은 minikube가 설치된 컴퓨터의 IP)
minikube를 다시 시작한다.
$ minikube stop
$ minikube start
ssh로 minikube node에 접근한다.
$ minikube ssh
다음 방법으로 /d에 마운트 한다.
(yourname, yourpassword는 Windows Login ID와 암호이다)
# sudo mkdir /d
# sudo mount -t cifs -o "user=yourname,domain=WORKGROUP,password=yourpassword" //192.168.22.10/shared_folder /d

```

### build docker image
$ docker build -t movie-db-api:v1 .

### deploy movie-db-api on Kubernetes (minikube)
$ kubectl apply -f movie-db-api.yaml
