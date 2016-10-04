- In order to run Jmeter beyond proxy, the below command script might be required.
  jmeter -H sydproxy.acp.net -P 8080 -u acp\{yourusername} -a {yourpw}

- ArticleData.csv is a data set for the Article thread. It should be amended accordingly.

- Use following query to get urls for articleData.csv
  SELECT "liveData"->>'url'
  FROM entity
  where "siteId" = 'dolly'
