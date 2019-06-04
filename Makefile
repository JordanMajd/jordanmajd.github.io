ARTICLES := $(basename $(shell ls article/[0-9][0-9][0-9][0-9]_[0-9][0-9]_[0-9][0-9]_*.md) .md)
PROJECTS := $(basename $(shell ls project/[0-9][0-9][0-9][0-9]_[0-9][0-9]_[0-9][0-9]_*.md) .md)

SVGS := $(wildcard img/*.svg)

html: html/article html/project

html/article: $(foreach ART,$(ARTICLES),html/$(ART).html) html/js/acorn_codemirror.js

html/project: $(foreach PRO,$(PROJECTS),html/$(PRO).html) html/js/acorn_codemirror.js

html/%.html: %.md
	node src/render_html.js $< > $@
	node src/build_code.js $<

html/js/acorn_codemirror.js: node_modules/codemirror/lib/codemirror.js \
	                     node_modules/codemirror/mode/javascript/javascript.js \
	                     node_modules/codemirror/mode/css/css.js \
	                     node_modules/codemirror/mode/xml/xml.js \
	                     node_modules/codemirror/mode/htmlmixed/htmlmixed.js \
	                     node_modules/codemirror/addon/edit/matchbrackets.js \
	                     node_modules/acorn/dist/acorn.js \
	                     node_modules/acorn/dist/walk.js
	node_modules/.bin/uglifyjs $^ -m -o $@

code/skillsharing.zip: html/21_skillsharing.html
	rm -f $@
	cd code; zip skillsharing.zip skillsharing/*.js* skillsharing/public/*.*

code/solutions/20_3_a_public_space_on_the_web.zip: $(wildcard code/solutions/20_3_a_public_space_on_the_web/*)
	rm -f $@
	cd code/solutions; zip 20_3_a_public_space_on_the_web.zip 20_3_a_public_space_on_the_web/*

test: html
	@for F in $(CHAPTERS); do echo Testing $$F:; node src/run_tests.js $$F.md; done
	@node src/check_links.js
	@echo Done.

serve: html
	cd html; \
	python3 -m http.server

clean:
	touch html/project/del.html && rm html/project/*.html
	touch html/article/del.html && rm html/article/*.html

package: clean html
	git checkout development
	rm -rf www
	cp -RL html www
	git add www
	git commit -am "Package build"
	git push
	git push origin `git subtree split --prefix www development`:master --force