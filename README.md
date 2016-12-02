# graphql-blog-schema
This is a single type GraphQL schema that I used to learn the basics of GraphQL. The server runs on [express-graphql](https://github.com/graphql/express-graphql) and uses [NeDB](https://github.com/louischatriot/nedb) for a datastore.

The schema has a single `post` type that is used for queries and mutations. The GraphQL fields resolve to NeDB methods for querying/adding/updating/removing posts.

#### Running the Server
Install the dependencies:
```
npm install
```

Add the seed data:
```
npm run seed
```

Start the server:
```
npm run dev
```

Open browser to http://localhost:3003 for the awesome [GraphiQL](https://github.com/graphql/graphiql) interface.

#### Basic Queries
Some basic queries to run against the schema. They expect two variables.
```
# Variables

{
  "postCount": 2,
  "postId": "HDRXvndzrtqeknCx"
}
```

```
# Queries and Mutations

query AllPosts {
	posts {
    ...PostData
  }
}

query RecentPosts($postCount: Int!) {
  recentPosts (count: $postCount) {
		...PostData
  }
}

mutation AddPost {
  createPost(
    title: "Post 5"
    author: "Bryan"
    subtitle: "A nice subtitle here"
    content: "Content content content content content content"
  ) {
    ...PostData
  }
}
mutation UpdatePost($postId: ID!) {
  updatePost(
    id: $postId,
    title: "Here is a new title mate"
  ) {
		...PostData
  }
}

mutation RemovePost($postId: ID!) {
  removePost(
    id: $postId
  ) {
    id
  }
}

fragment PostData on post {
  id
  title
  snippet
  published
  lastUpdated
}
```
#### Resources
- [GraphQL Docs](http://graphql.org/learn/)
- [Learn GraphQL by Kadira](https://learngraphql.com/)
- [Using GraphQL w MongoDB](https://www.compose.com/articles/using-graphql-with-mongodb/)
- [Kadira's graphql-blog-schema from above](https://github.com/kadirahq/graphql-blog-schema/blob/master/src/schema.js)
