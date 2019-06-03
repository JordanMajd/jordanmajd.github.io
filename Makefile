build : clean sass
	luapress

sass :
	sassc templates/jordanmajd/sass/styles.scss templates/jordanmajd/inc/css/styles.css

serve : build
	cd build; \
	python3 -m http.server

clean : sass
	rm -rf build/*

.PHONY: build serve clean sass
