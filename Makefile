build : clean sass
	~/.luarocks/bin/luapress


etlua: clean sass
	../Luapress/bin/luapress

# doesnt rebuild sass
watch :
	~/.luarocks/bin/luapress --watch

sass :
	sassc templates/jordanmajd/sass/styles.scss templates/jordanmajd/inc/css/styles.css

serve :
	cd build; \
	python -m SimpleHTTPServer

clean : sass
	rm -rf build/*

.PHONY: build serve clean
