import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import moment from 'moment';
import _ from 'lodash';

const Post = new GraphQLObjectType({
  name: 'post',
  description: 'An individual blog post',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Unique ID for post. Assigned by DB',
      resolve(post) {
        return post._id; // eslint-disable-line no-underscore-dangle
      },
    },
    author: {
      type: GraphQLString,
      description: 'Post Author',
    },
    title: {
      type: GraphQLString,
      description: 'Main title of the post',
    },
    subtitle: {
      type: GraphQLString,
      description: 'Subtitle of the post',
    },
    snippet: {
      type: GraphQLString,
      description: 'First one hundred characters of post',
      resolve(post) {
        return _.truncate(post.content, {
          length: 50,
        });
      },
    },
    content: {
      type: GraphQLString,
      description: 'Post body as string of html',
    },
    published: {
      type: GraphQLString,
      description: 'Initial publish date',
      resolve(post) {
        return moment(post.createdAt).format('MMMM D, YYYY');
      },
    },
    lastUpdated: {
      type: GraphQLString,
      description: 'Last saved edit date',
      resolve(post) {
        return moment(post.updatedAt).format('MMMM D, YYYY');
      },
    },
  }),
});

export default Post;
