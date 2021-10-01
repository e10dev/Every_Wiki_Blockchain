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

