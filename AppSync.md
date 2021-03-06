In order to integrate AppSync into the application, you'll have to first create a role giving AppSync permissions to be able to push logs into CloudWatch (this is the default role you could create through the AWS console).
Then, you will have to also create a role that gives AppSync permissions to access the data sources (e.g. DynamoDB). This role is selected when you configure a new data source in AppSync.

Plan:

- learn a little more about GraphQL (what that is, why is useful, what problems it solves)
- create a new AppSync GraphQL API and integrate it with Elasticsearch in order to enable searching for users
- learn about and integrate VTL

React app with AWS Amplify:

- first you'll have to install aws-amplify cli globally (this will help you easily add different features to your application - like GraphQL)
- also add the aws-amplify and aws-amplify-react to your package.json:
  > npm add aws-amplify aws-amplify-react --save

What I liked while watching the course is how easy it is to create a React application and already have it fully deployed in production with just a few simple commands. Amplify seems to work really great as a starting point, there might be issues when you use that in production, but for prototyping or just to start your project it seems to give you a huge boost in productivity. It took me a while to create all the resources myself (e.g. S3 bucket where the application is deployed, then build the application, copy the files to that bucket, make sure proper permissions are set on the bucket in order to be accessible on the internet etc.).
I remember the guy that presented on Meetup mentioned that many of their clients start off with Amplify, but then "eject" it and go their own way in order to be able to perform optimizations as needed.
What is also interesting is that the CF template looks really readable, so you can check that as well as the actual CF stack in AWS console and you can see what resources were created automatically for you.

what struck me when generating the amplify using `amplify init` was that it automatically created 2 roles for Cognito (those roles to be assigned to authenticated and unauthenticated users in order to check which resources they are allowed to access). But why do they even do that as I didn't add any authentication at all? I know we're not paying anything for those roles, but still it's a bit strange to assume I'll add that.

Authentication/Authorization support in Amplify
It's still annoying that Amplify forces you into using User Pools, with no option to only make use of Federated Identity Pools. Let's say I use User Pools to store all my users (maybe with additional details about them like name, address etc.), but I might not want to also give users the ability to sign in using username/password credentials, maybe all I want is to login through federated identities. How do I do that? Looks like there is no way to select such an option: it's username/password and optionally federated auth. Maybe one way would be by hiding the option to login with username/password on the UI (not ideal, but it might work).
Then Amplify seems to go in the same direction, as the signin/signup widget doesn't give you a way to hide username/password part. In order to do that I'll probably have to build a custom widget myself.

It's strange how Amplify works in regard to authentication. If I only create a Federated Identity Pool, then I can't access GraphQL resources as I'm getting an error "No user pool".
I could also create a User Pool as select authentication with user pools, but then again I can't use federated identity (the same error) as I now get an error "No current user".
What seems to work is to create a User Pool as well as select federated identity e.g. with Google, and then you have to set AWS_IAM authenticateion method in AppSync API as well as to change to the same value in aws-exports.js file. But still you won't be able to use both options: users logged in using a username/password created through User Pools and federated identity at the same time. I also had to modify the Cognito auth role to allow invoking GraphQL endpoints (currently it allows all, but there is a way to make it more granular).

I think I don't like that much the mutations and resolvers generated out of the box by Amplify. First, it's exposing way too much - you could basically updated any field (maybe not all of them are actually modifiable). Second, it's missing the business logic, you need to check certain things before allowing something to change. But as a first step I think it's good enough.

I'm now sure how much business logic should be added into a VTL resolvers? Things like checking if a user should be allowed to delete an item, or that the title of an activity is not too long etc.

There is a limitation now when a user joins an activity as they could join it multiple times, due to no uniqueness constraint at the database level. In order to progress faster with the development I will perform that check at the application level for the moment, but later will have to be fixed on the server side too.
It seems that this Amplify thing works fine for simple use cases, but once you want to implement something more complex it sometimes even gets in your way or just requires too much effort. I think that in a way it forces you to perform more stuff at the application level (which is not a bad thing, if you are able to mirror the same logic server side as well).

Issues while redeploying the application from scratch:
- I got a couple of errors due to hosting S3 bucket already being present so I just deleted all the CloudFormation stacks as well as all the S3 buckets related to this application.
- There were some errors while creating the resources in the cloud for authentication, most likely someething has changed in the code generated automatically by AWS Amplify CLI and my old code was not working anymore. I removed auth and added the configurations back again.
- I got an error regarding fields annotated with `@key` in `schema.graphql` saying that `ModelActivityFilterInput` cannot be found in `Query` (this is referenced in the GraphQL queries on those iindexes - see `API.ts`). My solution was to add a `list` query as this is making use of the same input type and in that case it works as expected. This is clearly a bug in AWS Amplify CLI as it doesn't seem to generate the filter input types unless there is a `list` query.
- Next I got another error `Can’t add two indexes in GlobalSecondaryIndexes` because I have 2 fields annotated with `@key` in schema.graphql. This seems to be a CloudFormation issue. My solution was to add the indexes one by one. But that is not great as my deployment is not repeatable now.