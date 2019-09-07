Use case: whenever an Activity is deleted I want to make sure the corresponding Participations are also deleted. This is basically a "cascade-all" from a traditional relational database.

Option 1: Lambda function triggered by item deleted from DynamoDB
In order to perform such an action you have to first enable DynamoDB Streams on your table of choice. According to this GitHub issue there is no way to enable it from a CLoudFormation template at the moment, and neither is it possible to configure a Lambda trigger for such a use case through CloudFormation templates:
https://github.com/aws-amplify/amplify-cli/issues/533
The only option left if to make such changes directly from AWS Console, but that could create significant issues in a production environment as it involves manual works and, as we very well know, humans are prone to errors. Plus, whenever your CloudFormation stack is updated due to other changes you risk losing the previous configurations and you have to apply them once again.

Another issue here is that AWS doesn't support at the moment triggering Lambda functions only for specific actions in DynamoDB, like whenever an item is deleted from table Activities in my case. It will invoke your Lambda function every time there is a change to any of the items in that database (item created, updated or deleted) which adds some complexity to your function plus will include an additional unnecessary cost.

Option 2: Make the client responsible for that
The idea is to remove the additional items whenever activity is deleted straight from the client application. Not a great option for many reasons - this is essentially a backend task!

Option 3: Pipeline functions in GraphQL
The idea is that you can chain multiple Lambda functions together to be executed as resolvers by AppSync. This gives us a lot of flexibility and is my preferred approach for now. The first problem I encountered was that I couldn't find a way to add a function in addition to the default "deleteActivity" resolver (I wanted to add another step in the process in addition to the one provided out of the box for deleting an activity). So my solution was to completely discard the generated resolver for "deleteActivity" mutation and to implement it from scratch with Lambda functions.
The end result will look like this

client ---> GraphQL ---> Delete Activity Lambda ---> Delete associated Participations Lambda

First we'll have to add a new Lambda function. This can be done with Amplify CLI:

```bash
$ amplify add function
```

Follow all the steps, choose the simple "Hello World" template, and you should have a basic Lambda function. The function definition and associated resources will be found under `/amplify/backend/function/<function-name>`.

Next go to `schema.graphql` and change the `Activity` definition to prevent generating all the resolvers. Our goal here is to prevent generating the `deleteActivity` one, but it's a general good practice to be explicit about which resolvers you want to generate (you can at any point update it as needed):

```javascript
type Activity @model(mutations: { create: "createActivity" }) @versioned {...}
```

With that configuration it will only generate the mutation and associated resolvers for `createActivity`. Next we'll want to add the following Mutation definition pointing to our newly created Lambda function:

```javascript
input DeleteActivityInput {
  id: ID!
}

type Mutation {
  deleteActivity(input: DeleteActivityInput!): Activity! @function(name: "delete-activity-${env}")
}
```

Let's now focus on implementing the Lambda function to actually delete this item. In order to allow your Lambda function to access a DynamoDB table we'll have to update the CloudFormation template and assign all the required permissions to it. Open the CloudFormation template under your Lambda definition and add the following new parameter:

```json
"activitiesTable": {
  "Type": "String"
}
```

Then add the following policy statement:

```json
{
  "Effect": "Allow",
  "Action": ["dynamodb:GetItem", "dynamodb:DeleteItem"],
  "Resource": {
    "Fn::Sub": [
      "arn:aws:dynamodb:${region}:${account}:table/${activitiesTable}",
      {
        "region": { "Ref": "AWS::Region" },
        "account": { "Ref": "AWS::AccountId" },
        "activitiesTable": { "Ref": "activitiesTable" }
      }
    ]
  }
}
```

At the same level with the CloudFormation template create a new file named `parameters.json` which should look like this:

```json
{
  "activitiesTable": "Activity"
}
```

With that we should have everything set up in order to start the implementation. Let's try to apply these changes to make sure we didn't miss anything (just say yes to everything you are asked and should be fine):

```bash
$ amplify push
```
