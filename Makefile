build : clean sass etlua
	#~/.luarocks/bin/luapress
	# lua -l set_paths
	cp luapress lua_modules/bin/luapress
	lua_modules/bin/luapress

etlua:
	cd ../Luapress; \
	luarocks make --tree ~/Documents/.personal/jordanmajd.github.io/lua_modules;


sass :
	sassc templates/jordanmajd/sass/styles.scss templates/jordanmajd/inc/css/styles.css

serve :
	cd build; \
	python -m SimpleHTTPServer

clean : sass
	rm -rf build/*

install :
	luarocks install etlua --tree ~/Documents/.personal/jordanmajd.github.io/lua_modules

.PHONY: build serve clean


# clean-etlua:
# 	rm ~/.luarocks/bin/luapress*; \
# 	rm -rf ~/.luarocks/lib/luarocks/rocks/luapress*; \
# 	rm -rf ~/.luarocks/share/lua/5.1/luapress*
