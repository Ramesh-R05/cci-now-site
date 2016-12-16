Performance Test framework
==========================

#Set Up

##Proxy
- In order to run Jmeter beyond proxy, the below command script might be required.
  ```
  jmeter -H sydproxy.acp.net -P 8080 -u acp\{yourusername} -a {yourpw}
  ```

##Data
- ArticleData.csv is a data set for the Article thread. It should be amended accordingly.

- Use following query to get urls for articleData.csv
  ```
  SELECT "liveData"->>'url'
  FROM entity
  where "siteId" = 'dolly'
  ```

##User Metrix

Request the below info for test plan

- Average concurrent USERS => `554 for NTL`  
- Peak concurrent USERS => `3295 for NTL`

##Run in flood.io

go to https://flood.io/ and create a new account
Select the relevant jmeter script and data and Run for 5 min.

refer to this link [https://flood.io/20NyFzEi](https://flood.io/20NyFzEi)

- While the execution is taking place Open AWS and monitor the stacks `now-site-live` 
