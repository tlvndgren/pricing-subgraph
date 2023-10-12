publish:
	rover subgraph publish Tyler-Fed-Demo@prod --schema ./prices.graphql \
		--name prices --routing-url https://prod-prices-subgraph-bhl6lhslfa-uc.a.run.app

publish-staging:
	rover subgraph publish Tyler-Fed-Demo@staging --schema ./prices.graphql \
		--name prices --routing-url https://staging-prices-bhl6lhslfa-uc.a.run.app

check:
	rover subgraph check Tyler-Fed-Demo@prod \
	--schema=prices.graphql \
	--name=prices --validation-period=2w

dev-publish:
	rover subgraph publish Tyler-Fed-Demo@prod --profile dev --schema ./prices.graphql \
		--name prices --routing-url https://prod-prices-subgraph-bhl6lhslfa-uc.a.run.app

