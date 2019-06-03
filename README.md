# jordanmajd.com



## Getting Started

```
# install lua
sudo apt install lua5.1
sudo apt install luarocks

# install discount
wget http://www.pell.portland.or.us/~orc/Code/discount/discount-2.2.4.tar.bz2
tar xjf discount-2.2.4.tar.bz2
cd discount-2.2.4
./configure.sh
vim Makefile # update $CFLAGS from -g to "-g -fPIC"
make
sudo make install

# install luapress
git clone git@github.com:JordanMajd/Luapress.git
cd Luapress
sudo luarocks make


# install sassc
sudo apt install sassc

make build
make serve

# maybe:
luarocks install etlua --local
```


## Roadmap

- Multiple post types
- ensure XML is esacped for RSS (&rsqo;)
- Other templating languages `etlua`
