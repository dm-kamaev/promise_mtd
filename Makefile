publish:
	npm publish --access public

test:
	npx jest --coverage

make_badge: test
	npx coverage-badges;

.PHONY: test