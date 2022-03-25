publish:
	rover subgraph publish Tyler-Fed-Demo@prod --schema ./prices.graphql \
		--name prices --routing-url https://prices-subgraph-bhl6lhslfa-uc.a.run.app

publish-current:
	rover subgraph publish Tyler-Fed-Demo@current --schema ./prices.graphql \
		--name prices --routing-url https://pricing-subgraph-waaq4qt37q-uc.a.run.app

publish-staging:
	rover subgraph publish Tyler-Fed-Demo@staging --schema ./prices.graphql \
		--name prices --routing-url https://prices-staging-waaq4qt37q-uc.a.run.app

check:
	rover subgraph check Tyler-Fed-Demo \
	--schema=prices.graphql \
	--name=prices --validation-period=2w