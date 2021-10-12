<h1 align="center">EOSIO Labs™: EOSIO smart contract</h1>


## smart contract

스마트 컨트랙트를 배포하기 위해서는 지갑이 필요합니다.
`--to-console` 옵션을 사용하면 지갑의 키가 `bash`에 나타나게 되는데 이는 `bash history`에 남을 수 있으므로 보안에 좋지 않습니다.
라이브 환경에서 생성하는 것이라면 `--to-file` 옵션을 사용

지갑 키는 나중에 사용해야 하므로 복사하여 다른 곳에 저장해 둡니다.
```bash 
cleos wallet create --to-console ( 지갑 생성 )
지갑 키 : PW5KPeKUuNGb3ncWCeL7S8SaY6cjN6fAAm1MDY8SbHVouXVakK499
```

방금 만든 default 지갑을 열 수 있습니다.
```bash
cleos wallet open
```
지갑을 열었지만 잠겨있는 상태라서 지갑의 잠금을 해제합니다. (아까 따로 적어둔 패스워드를 넣어줍니다)
```bash
cleos wallet unlock
password :
```

키 생성 시 지갑에 바로 넣어줍니다.
```bash
cleos wallet create_key
```
개인 키, 공용 키 확인
```bash
cleos wallet private_keys
```

## smart contract hello

위의 메뉴얼대로 진행 후 smart contract 기본 예제인 hello를 배포하는 법을 알아보도록 하겠습니다. 

우선 mkdir hello 디렉터리 하나 생성 후, touch hello.cpp 파일을 만듭니다.

코드는 다음과 같습니다. ( 코드는 c++로 되어 있으므로 기본적으로 공부를 해야 합니다.
```bash
#include <eosio/eosio.hpp>

using namespace eosio;

class hello : public contract {
public:
   using contract::contract;

   [[eosio::action]]
   void hi( name user ) {
      print( "Hello, ", user );
   }
};
EOSIO_DISPATCH( hello, (hi) )
```
우선 hi라는 함수를 실행하면 console 창에 "Hello World" + 입력한 account_name 를 출력해 주는 smart contract입니다.
eos의 기본 예제에 있는 걸 사용했습니다.
소스 코드를 분석해 보겠습니다.

```bash
using namespace eosio;
class hello : public contract (
);
```
eos smart contract의 핵심 기능 대부분은 eosio에 존재합니다. 때문에 위처럼 using namespace eosio를 적어줍니다.

```bash
class hello : public contract {
public:
   using contract::contract;

   [[eosio::action]]
   void hi( name user ) {
      print( "Hello, ", user );
   }
```
컨트랙트로 사용할 메인 class도 필요합니다.
여기서는 hello라는 class를 선언해 주었고, 그리고 contract를 상속받습니다.
contract를 상속받아야만 wast(웹 어셈블리) 파일을 생성할 수 있고, smart contract의 owner를 저장할 수 있습니다.
이 contract도 eosio::contract 즉 eosio에서 제공하는 기능입니다.
다음의 using contract :: contract 함수 즉 생성자를 사용하겠다는 선언입니다.

```bash
// @abi action
void hi (account_name user_ {
  print("hello, ", user);
}
```
contract에서 사용할 hi라는 함수를 선언 및 정의를 해줍니다.
여기서 인자값으로 account_name 타입의 user를 변수로 받습니다.
함수를 action하기 위해서는 abi에 함수를 추가해야하는데, 이를 해 주는 것이 @abi action입니다.

위에 작업을 끝낸 후 eosio-cpp -o hello.wasm hello.cpp -abigen 입력합니다.
그러면 hello.abi, hello.cpp, hello.wasm 3개의 파일이 생성됩니다.

아까 만들어 놓은 public key를 선택해서 계정을 생성합니다
```bash
cleos create account eosio hello EOS61CYmjdjkwqljeklsndmasnejqwkjeiodjlska -p eosio@active
```
등록된 이름을 사용하기 위해서 eos cookie에 세팅하도록 합니다.
```bash
cleos set contract hello /home/wallet/eos/contracts/contracts/hello -p hello@active
```

이제 smart contract를 이용해 안녕이라고 인사할 수 있습니다.
```bash
cleos push action hello hi '{"suhyung"}' -p hello@active
```

마지막으로 smartcontract를 사용해서 계약을 완료하였습니다. 
그럼 계약한 내용 정보를 트랜잭션을 이용하여 바로 확인 할 수 있습니다.
```bash
cleos get transaction 9eb2f585930393932939239jdjdkdsbi1jh3b2
```
위와 같이 명령어 날리면 트랜잭션을 발생했던 기록들을 모두 무결성하게 확인이 가능합니다



