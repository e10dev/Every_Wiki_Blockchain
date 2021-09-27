## 3개의 서버에서 블록 생성 후 노드 연결하기

### 메인 서버에 블록 생성 및 백그라운드에서 돌리기 
```bash 
nohup nodeos -e -p eosio 
--p2p-listen-endpoint 192.168.16.23:9876 
--config-dir ./node1/config/ 
--data-dir ./node1/data/ 
--plugin eosio::chain_api_plugin 
--plugin eosio::net_api_plugin 
--plugin eosio::http_plugin 
--plugin eosio::producer_api_plugin
```
ps -ef | grep nodeos 프로세스 확인  
tail -f nohup.out : 정상적으로 블록 생성되는지 확인

### 192.168.16.24  -> 192.168.16.23 연결
```bash
nohup nodeos 
--p2p-listen-endpoint 192.168.16.24:9876 
--p2p-peer-address 192.168.16.23:9876 
--config-dir ./node1/config/ 
--data-dir ./node1/data/ 
--plugin eosio::chain_api_plugin 
--plugin eosio::net_api_plugin 
--plugin eosio::http_plugin 
--plugin eosio::producer_api_plugin 
--plugin eosio::state_history_plugin 
--disable-replay-opts 
--delete-all-blocks &
```
### 192.168.16.25 -> 192.168.16.23, 192.168.16.24 연결
```bash
nohup nodeos 
--p2p-listen-endpoint 192.168.16.25:9876 
--p2p-peer-address 192.168.16.23:9876 
--p2p-peer-address 192.168.16.24:9876 
--config-dir ./node1/config/ 
--data-dir ./node1/data/ 
--plugin eosio::chain_api_plugin 
--plugin eosio::net_api_plugin 
--plugin eosio::http_plugin 
--plugin eosio::producer_api_plugin &
```  
### 오류
1. handshake 오류 발생 시 시간 동기화 진행
```bash
ntp 설치
# yum install ntp

동기화할 서버 주소
# vi /etc/ntp.conf 아래와 같이 주석 처리 후 동기화할 서버 주소 입력
#server 0.centos.pool.ntp.org iburst
#server 1.centos.pool.ntp.org iburst
#server 2.centos.pool.ntp.org iburst
#server 3.centos.pool.ntp.org iburst
server 0.asia.pool.ntp.org
server 1.asia.pool.ntp.org
server 2.asia.pool.ntp.org
server 3.asia.pool.ntp.org

방화벽 설정
# firewall-cmd --add-service=ntp --permanent
# firewall-cmd --reload

서비스 시작
# systemctl start ntpd
# systemctl enable ntpd

작동 여부확인
# ntpq -p
```
2. 기존에 노드 생성 시 오류 발생하면 node1 폴더를 삭제하고 옵션 --delete-all-blocks 넣고 명령어 재실행
3. 실수로 노드 강제 종료 시 옵션 --replay-blockchain 넣고 명령어 재실행
4. 블록정보를 못받아오면 state_history_plugin --disable-replay-opts 옵션 넣어야지 db랑 node 불러옴
