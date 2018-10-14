# #Polyserv

###Prerequisites:

1.  Node >= 8.10
2.  Latest .env file supplied by one of the contributors
3.  No postgress instance running on your machine
4.  Google Cloud SDK: https://cloud.google.com/sdk/

    * Authenticate with the polyserv admin account

5.  Google Cloud Proxy: https://cloud.google.com/sql/docs/mysql/sql-proxy

    * Access the cloudSQL instance, all details are on the cloud sql dashboard
    * Once installed on your machine copy the proxy file into the project folder.
    * See the package.json command for what the file name should be as it is gitignored. However it is currently set to the default name.

###To run:

1.  Run a Yarn or npm install
2.  Run command `yarn dev` or `npm run dev`

###Deployment:
No current setup
