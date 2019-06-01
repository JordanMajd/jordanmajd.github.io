build : clean sass
	luapress

sass :
	sassc templates/jordanmajd/sass/styles.scss templates/jordanmajd/inc/css/styles.css

serve :
	cd build; \
	python -m SimpleHTTPServer

clean : sass
	rm -rf build/*

.PHONY: build serve clean sass
