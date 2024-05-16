check:
	APOLLO_KEY=service:Ecom-Demo:B3ZfLDPWeM2BTKiRu2b37g \
	rover subgraph check Ecom-Demo@prod \
	--schema=prices.graphql \
	--name=prices --validation-period=2w
	
publish:
	rover subgraph publish Ecom-Demo@prod --schema ./prices.graphql \
		--name prices --routing-url https://prices-as4-bhl6lhslfa-uc.a.run.app

publish-staging:
	rover subgraph publish Ecom-Demo@prod@staging --schema ./prices.graphql \
		--name prices --routing-url https://staging-products-bhl6lhslfa-uc.a.run.app
