check:
	rover subgraph check Tyler-Fed-Demo@prod \
	--schema=prices.graphql \
	--name=prices --validation-period=2w
	
publish:
	rover subgraph publish Tyler-Fed-Demo@prod --schema ./prices.graphql \
		--name prices --routing-url https://prices-as4-bhl6lhslfa-uc.a.run.app

publish-staging:
	rover subgraph publish Tyler-Fed-Demo@staging --schema ./prices.graphql \
		--name prices --routing-url https://staging-products-bhl6lhslfa-uc.a.run.app
