publish:
	rover subgraph publish Tyler-Fed-Demo@current --schema ./prices.graphql \
		--name prices --routing-url https://pricing-subgraph-waaq4qt37q-uc.a.run.app

check:
	rover subgraph check Tyler-Fed-Demo \
	--schema=prices.graphql \
	--name=prices --validation-period=2w