# Deployment Instruction
This is the simple instructions of how to deploy our application on your own. 
Unfortunately, I forget lots of details and miss lots of steps. 

Please do not fully rely on this instructions! *(It is just my reference for future projects)*
## Prerequisite
- Set up your own **GCP Account**. It could be either free-trial with 300$ or go on your own.

## Application on Cloud Run
1. Create new Cloud Run instance with preferred settings.
2. Set the environment variable in the instance as following.
```
# .env
ENV=
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
ELASTIC_NODE_URL=
ELASTIC_API_ID=
ELASTIC_API_KEY=
BUCKET_NAME=
BUCKET_REGION=
S3_ACCESS_KEY=
S3_SECRET_ACCESS_KEY=
GMAIL_EMAIL=
GMAIL_APP_PASSWORD=
RECIPIENT_NUMBER=
SLIPOK_BRANCH_ID=
SLIPOK_API_KEY=
RECIPIENT_EN_NAME=
RECIPIENT_TH_NAME=
FRONTEND_URL=
NEXT_PUBLIC_BACKEND_URL=
```
3. Set-up the VPC and serverless VPC with default settings.
4. Create domain mappings using Cloud Run Domain Mappings.

*ref: https://cloud.google.com/run/docs/configuring/vpc-connectors, https://cloud.google.com/vpc/docs/serverless-vpc-access*

## PostgreSQL on Cloud SQL
1. Create new Cloud SQL instance with the settings as following.
- Database version: PostgreSQL 15
- Enterprise edition
- Single Zone [us-central1 (Iowa)]
- Machine type: db-g1-small
- Network: skillbridgevpc
- Authorized networks: (0.0.0.0/0) **!CAUTIONS: DEVELOPMENT ONLY!**
- Database flag: max_connections = 100
2. Add a new database user.


## Elastic on Google Cloud
1. Activate Elastic Cloud product on the GCP.
2. Create and get the API KEY credentials.
3. Create new index using the setting defined at `/elasticsearch/config/setting.json`

*ref: https://cloud.google.com/elastic?hl=en*

## Logstash on Compute Engine
1. Create new Compute Engine instance. It could be free-tier which is *e2-micro* and set network interface to *skillbridgevpc*. 
2. Get into instance shell using *ssh*.
3. Create logstash.env as following.
```
# logstash.env
JDBC_CONNECTION_STRING=
JDBC_USER=
JDBC_PASSWORD=
ELASTICSEARCH_CLOUD_ID=
ELASTICSEARCH_API_KEY=
ELASTICSEARCH_INDEX=
```
4. Pull Logstash image and run it using the following command.

`docker run --env-file logstash.env <<image_name>>`

5. If there is an error in documents count, please check the correctness of environment variables in logstash.env.

# Utils
## Github Actions
1. Create *Workload Identity Provider* in GCP.
2. Create all of the required github secrets in the repository.
3. *(Optional)* Create discord bot and get the webhook api and put it in the github secrets.

## Re-initialize Logstash and Elasticsearch
1. Delete all documents on Elasticsearch by calling REST API.
```
curl -X POST "{{endpointurl}}/{{index_name}}/_delete_by_query?pretty" -H 'Content-Type: application/json' -H 'Authorization: ApiKey {{API_KEY}}' -d'
{
  "query": {
    "match_all": {}
  }
}
'
```
2. Re-run Logstash instance using the following command. (make sure to stop running Logstash first, if any)

`docker run --env-file logstash.env <<image_name>>`

Note: assume that logstash.env contains
```
# logstash.env
JDBC_CONNECTION_STRING=
JDBC_USER=
JDBC_PASSWORD=
ELASTICSEARCH_CLOUD_ID=
ELASTICSEARCH_API_KEY=
ELASTICSEARCH_INDEX=
```