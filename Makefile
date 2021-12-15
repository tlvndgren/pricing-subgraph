publish:
	rover subgraph publish Ty-Ecom-Fed-Demo@current --schema ./prices.graphql \
		--name prices --routing-url https://pricing-subgraph-waaq4qt37q-uc.a.run.app

rcheck:
	rover subgraph check Ty-Ecom-Fed-Demo \
	--schema=prices.graphql \
	--name=prices --validation-period=2w