<h1 align="center">EOSIO Labs™: EOSIO Explorer</h1>
<p align="center">
  A full web application to communicate with EOSIO blockchain in a local development environment built using React.
</p>

## 참고 사이트

[eosio developer](https://developers.eos.io/manuals/eos/latest/index)  
[github eosio-explorer](https://github.com/EOSIO/eosio-explorer#platform-support) 

## 개요
개발자가 로컬 개발 환경에서 eosio 블록체인과 통신할 수 있는 기능을 제공하여 smart contract 개발을 부트스트랩할 수 있는 완전한 웹 애플리케이션입니다.

## 운영체제
* centos 7  
* ubuntu 18.04

## 필요한 도구
* [Docker](https://www.docker.com/) with support at Docker Engine `20.10.5` (latest stable)
* [Node.JS](https://nodejs.org/en/) with support at `10.24.1` LTS (latest stable)
* [Yarn](https://yarnpkg.com/lang/en/) with support at `^1.22.5 (latest stable)

## 설치 전 초기 설정
1. eosio-explorer 설치 전 centos에서 yarn 사용하기 위한 초기 설정
시스템에 NODE.js가 설치되어 있지 않은 경우 다음 curl 명령으로 Nodesource 저장소를 사용 10.x 이상 버전 사용 필수
```bash
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
```  
2. nodejs 설치 
```bash
yum install nodejs
```  
3. yarn 리포지토리를 활성화하고 리포지토리의 GPG 키문제를 가져오려면 다음 명령어 실행  
```bash
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg
```  
4. yarn설치  
```bash
yum install yarn 
```  
5. Docker 설치
```bash
yum-config-manager 명령어를 사용하기 위해 yum utils 설치
# yum install -y yum-utils
yum 설정에 docker repository 추가
# yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
설치 가능한 docker-ce 버전 확인
# yum --showduplicates list docker-ce
최신 버전 설치
# yum install -y docker-ce
yum install -y docker-ce-20.10.5 docker-ce-cli-20.10.5 docker-ce-rootless-extras-20.10.5


8. 
## 설치
1. 어디에서나 실행할 수 있는 인스턴스 생성
```bash
yarn global add eosio-explorer
```
2. eosio-explorer 파일 다운
```bash
git clone https://github.com/EOSIO/eosio-explorer.git
yarn build
yarn install
```
yarn build시 Command failed with exit code 127 / react-scripts: command not found 오류 발생하면 다음과 같이 실행  
```bash
yarn install
npm install
npm update 
```

vs/editor/contrib/gotoSymbol/goTocommands 오류 발생하면 다음과 같이 실행
```bash
yarn add -D monaco-editor-webpack-plugin
yarn add monaco-editor
```
cannot find module '@babel/helper-regex' require stack 오류 발생하면 다음과 같이 실행
```bash
yarn add @babel/helper-regex
```
npm update canuise-lite browserslist 오류 발생하면 다음과 같이 실행
```bash
npm update caniuse-lite browserslist
npm i npm-update-all -g npm-update-all
yarn upgrade
yarn add reactstrap 
```
발생한 오류 해결 시 eosio-explorer 설치
```bash
eosio-explorer init -> 1번 설치 진행
eosio, eosio.cdt, postgresql 3개 자동 설치 + localhost5111 사이트 창 하나 띄어줌
```
설치 진행하다가 running as root without --no-sandbox is not supported 이런 오류 나오면 무시하고 설치 진행해도 무관
그 이유는 위 오류가 크롬 에러인데 서버 쪽에서 가상으로 크롬사이트를 돌려주는 역할, 나중에 공부하면서 오류까지 잡겠습니다.  

### sandbox 오류 관련  
https://bugs.chromium.org/p/chromium/issues/detail?id=638180
https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md  

### 추가로
eosio-explorer init을 할 때 1번 누르고 설치 진행 시 오류가 날 경우 nodeos가 127.0.0.1:8888 을 사용하고 있으므로 아래와 같이 포트 충돌이 발생하면서 오류가 발생   
docker: Error response from daemon: driver failed programming external connectivity on endpoint eosio_nodeos (e0f41bc24f3e4480937931b657c77d3ee892296749c6c10cd470392ee4624949): Error starting userland proxy: listen tcp 0.0.0.0:8888: bind: address already in use. 
```bash
cd /node1/config/config.ini 들어가면 아래와 같이 설정
130번 줄에 http-server-address = 0.0.0.0:8888
226번 줄에 p2p-listen-endpoint - 0.0.0.0:9876
145줄 access-control-allow-origin = * <--- 이거 설정 안해주면 블록정보 페이지 못 불러옴
eosio-explorer init을 할 때 2번을 눌러서 http://192.168.16.24:8888 접속한다.
```

