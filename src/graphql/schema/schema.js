import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLEnumType,
  GraphQLList } from 'graphql';
import _ from 'lodash';
import PostType from './types';
import PostsService from '../../services/posts';

// HELPERS FOR SINGLE SEARCH
const columnEnum = new GraphQLEnumType({
  name: 'Column',
  description: 'Column name in the database',
  values: {
    ID: { value: '_id' },
    TITLE: { value: 'title' },
  },
});

const singlePostQuery = (col, query) => {
  let search = {
    _id: query,
  };
  if (col === 'title') {
    search = {
      title: query,
    };
  }
  return search;
};

// GRAPHQL ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      description: 'A list of all blog posts',
      resolve() {
        return PostsService.find({}).then((response) => {
          return response;
        });
      },
    },
    singlePost: {
      type: PostType,
      description: 'A single blog post. Accepts argument for query. Returns one result',
      args: {
        col: {
          type: new GraphQLNonNull(columnEnum),
        },
        query: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Query for post by id or title',
        },
      },
      resolve(source, { col, query }) {
        const search = singlePostQuery(col, query);
        return PostsService.find(search).then((response) => {
          return response[0];
        });
      },
    },
    latestPost: {
      type: PostType,
      description: 'The latest blog post by updatedAt',
      resolve() {
        return PostsService.findLimit({}, 1).then((response) => {
          return response[0];
        });
      },
    },
    recentPosts: {
      type: new GraphQLList(PostType),
      description: 'A list of recent blog posts. Accepts argument for count to return',
      args: {
        count: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Number of recent items',
        },
      },
      resolve(source, { count }) {
        return PostsService.findLimit({}, count).then((response) => {
          return response;
        });
      },
    },
  }),
});

// ROOT MUTATION
const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Add, Update, or Delete a Post',
  fields: {
    createPost: {
      type: PostType,
      description: 'Create a new blog post',
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        subtitle: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLString },
      },
      resolve(source, { ...args }) {
        const newPost = args;
        if (!newPost.author) {
          newPost.author = 'Bryan';
        }
        return PostsService.insert(newPost).then((response) => {
          return response;
        });
      },
    },
    updatePost: {
      type: PostType,
      description: 'Update a blog post',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'Unique ID of post, required for update',
        },
        title: { type: GraphQLString },
        subtitle: { type: GraphQLString },
        content: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      resolve(source, { ...args }) {
        const updatePost = _.omit(args, 'id');
        return PostsService.update(args.id, updatePost).then((response) => {
          return response;
        });
      },
    },
    removePost: {
      type: PostType,
      description: 'Delete a blog post',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: `Unique ID of post, required for delete.
                        The only value that will be available
                        in successful response`,
        },
      },
      resolve(source, { ...args }) {
        return PostsService.remove(args.id).then((response) => {
          return response;
        });
      },
    },
  },
});

// GRAPHQL SCHEMA
const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default Schema;
