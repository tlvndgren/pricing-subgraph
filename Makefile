publish:
	rover subgraph publish Ty-Demo@current --schema ./prices.graphql \
		--name prices --routing-url https://pricing-subgraph-waaq4qt37q-uc.a.run.app

check:
	rover subgraph check Ty-Demo \
	--schema=prices.graphql \
	--name=prices --validation-period=2w