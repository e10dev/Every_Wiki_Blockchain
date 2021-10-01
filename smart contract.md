<h1 align="center">EOSIO Labs™: EOSIO smart contract</h1>


## example

hello world contract 
```bash
mkdir hello -> cd hello -> touch hello.cpp
```

#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] hello : public contract {
  public:
      using contract::contract;

      [[eosio::action]]
      void hi( name user ) {
         print( "Hello, ", user);
      }
};

assembly compile
```bash
eosio-cpp hello.cpp hello.wasm
```
## Deploy the Contract
```bash
cleos wallet keys
```

## Create account cleos
```bash
cleos create account eosio hello (public key) -p eosio@active
```

## Execute the contract
```bash
cleos push action hello hi '["bob"]' -p bob@active
```

## Recompile the contract

다음과 같이 콘솔 출력은 bob로 출력이 되는데 이 경우 승인된 사용자인 alice가 계약이 hi로 응답하는 사용자와 같도록 계약을 수정합니다,
작업을 다시 실행하려고 하지만 일치하지 않는 권한을 부여해서 실행 시 오류 발생하고 트랜잭션 중단
```bash 
void hi( name user ) {
   require_auth( user );
   print( "Hello, ", name{user} );
}

eosio-cpp -abigen -o hello.wasm hello.cpp
cleos set contract hello CONTRACTS_DIR/hello -p hello@active
cleos push action hello hi '["bob"]' -p alice@active
```


