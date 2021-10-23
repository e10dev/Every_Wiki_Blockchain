#include <eosio/eosio.hpp>
#include <eosio/system.hpp>
#include <string>

using namespace eosio;

struct action_response
{
  uint16_t id;
  std::pair<int, std::string> status;
};

class [[eosio::contract("wiki")]] wiki : public contract
{
public:
  using contract::contract;

  [[eosio::action]]
  void writebody(const name& wiki,
                 uint64_t id,
                 const std::string msg)
  {
    require_auth(wiki);

    check(msg.size() > 0, "Empty message");

    wikibody_table wikibodys(get_self(), wiki.value);    
    
    auto itr_msg = wikibodys.find(id);
    check(itr_msg == wikibodys.end(), "allready exist!!");

    wikibodys.emplace(wiki, [&](auto &m) {
      m.id = id;
      m.text = msg;
      m.create_at = time_point_sec(current_time_point());
      m.update_at = m.create_at ;
    });
  }

  [[eosio::action]]
  void updatebody(const name& wiki,
                 uint64_t id,
                 const std::string msg)
  {
    require_auth(wiki);

    check(msg.size() > 0, "Empty message");

    wikibody_table wikibodys(get_self(), wiki.value);    
    
    auto itr_msg = wikibodys.find(id);
    check(itr_msg != wikibodys.end(), "Message not found");

    wikibodys.modify(itr_msg, wiki, [&](auto &m) {
      m.text = msg;
      m.update_at = time_point_sec(current_time_point());
    });
  }

  [[eosio::action]]
  void deletebody(const name& wiki, uint64_t id)
  {
    require_auth(wiki);

    wikibody_table wikibodys(get_self(), wiki.value);   
    auto itr_msg = wikibodys.find(id);
    check(itr_msg != wikibodys.end(), "Message not found");

    wikibodys.erase(itr_msg);
  }

private:

  struct [[eosio::table, eosio::contract("wiki")]] wikibody
  {
    uint64_t id;
    std::string text;
    eosio::time_point_sec create_at;
    eosio::time_point_sec update_at;

    uint64_t primary_key() const { return id; }
  };
  typedef eosio::multi_index<"wikibody"_n, wikibody> wikibody_table;
};

