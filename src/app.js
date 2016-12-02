import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema/schema';

const app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

export default app;
