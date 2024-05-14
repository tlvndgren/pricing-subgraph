create:
	wgc subgraph create prices \
    --namespace default \
    --label team=A \
    --routing-url https://prod-pricing-subgraph-bhl6lhslfa-uc.a.run.app

publish:
	wgc subgraph publish prices --schema ./prices.graphql

delete:
	wgc subgraph delete prices -f
