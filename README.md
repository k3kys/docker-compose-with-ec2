# docker-compose를 활용해 ec2에 배포하기

## 단계
- ec2 인스턴스 생성
- 인바운드 설정
- ec2 인스턴스에 docker & docker-compose 설치
- route 53을 이용해 domain 등록하기
- ELB(Elastic Load Balancing)를 통해 로드밸런싱 하기
- ssl 인증하여 https 사용하기

## 1.ec2 인스턴스 생성

ec2 인스턴스를 Ubuntu20.04로 생성합니다.

저는 Centos 보다는 Ubuntu가 더 익숙하기 때문에 Ubuntu로 진행했습니다.

## 2.인바운드 룰 설정

포트를 열어줘야 외부에서 생성한 ec2 인스턴스에 접근할 수 있습니다.

88번 포트, 22번 포트, 27017, 27018, 27019번 포트, 3000번 포트, 5000번 포트 등

컨테이너를 생성할 때 정해놓은 외부 포트를 인바운드 룰을 통해 개방해주도록 합니다.

## 3. ec2 인스턴스에 docker & docker-compose 설치
```
sudo apt-get update
```
```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
```
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
```
apt-cache madison docker-ce
```
```
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
```
sudo apt install docker.io
```

**주의할 점**
1. 설치 후, docker-compose를 할 때 react build에서 멈추는 현상이 자주 발생하였습니다.

   이를 해결하기 위해 스크립트에 다음과 같이 추가합니다.
```
    "build": "GENERATE_SOURCEMAP=false && react-scripts build"
```
2. .env 파일을 .gitignore에 올린 채로 git clone을 해버리면 env파일이 전달되지 않아 배포에 문제가 생길 수 있습니다.


## 4. route 53을 이용해 domain 설정하기

저는 이전에 godaddy에서 연습용 도메인을 구매했었기 때문에 이를 route 53과 연결합니다.

route 53의 dns관리를 통해 name server를 할당받고, godaddy에 등록해주면 구매한 도메인을

사용할 수 있습니다.

## 5. ELB(Elastic Load Balancing)를 통해 로드밸런싱 하기

로드밸런싱은 아주 중요합니다.

전에 mongodb replica와 dump를 활용해 db의 가용성을 높였던 것처럼

로드밸런싱을 활용해 서버의 가용성을 높여줄 수 있습니다.

로드밸런싱을 하게 되면 평소에는 서버의 트래픽을 분산해 서버의 과부하를 막을 수 있으며

한 대의 서버에서 문제가 발생할 경우 다른 서버로 서비스를 제공할 수 있습니다.

구현 방법은 단순 합니다.

인스턴스를 두 대 설치 후 똑같은 환경을 조성합니다.

그 다음 로드밸런서를 만들고, 타겟 그룹에 인스턴스 두 대를 같이 넣어줍니다.

## 6. ssl 인증하여 https 사용하기

ssl certificate은 https를 사용할 수 있도록 합니다.

http는 보안상 결함이 있기 때문에, 이를 보완하고자 ssl 인증 통해 https을 사용해야 합니다.

ssl은 기존에 돈을 주고 구매하였으나, letencrypt 등 무료 ssl 인증도 존재합니다.

또한 지금 구현하고자 하는 ACM의 ssl 인증도 무료입니다.
