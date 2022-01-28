const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const books = [
  {
    name: "testname",
    author: "testauthor",
    id: "1",
    writer: "testwriter",
    authorid: "2",
  },
  {
    name: "testname",
    author: "testauthor",
    id: "1",
    writer: "testwriter",
    authorid: "2",
  },
  {
    name: "testname",
    author: "author3",
    id: "1",
    writer: "testwriter",
    authorid: "2",
  },
  { name: "testname", author: "testauthor", id: "2" },
  { name: "testname", author: "testauthor", id: "3", authorid: "4" },
  { name: "testname", author: "testauthor", id: "4", authorid: "5" },
];

const authors = [
  { name: "author first", author: "testauthor", age: "1", id: "2" },
  { name: "author 2nd", author: "testauthor", age: "1", id: "2" },
  { name: "author 3rd", author: "testauthor", age: "1", id: "2" },
  { name: "author 4th", author: "testauthor", age: "1", id: "2" },
  { name: "author 2", author: "testauthor", age: "2", id: "3" },
  { name: "author 3", author: "testauthor", age: "3", id: "4" },
  { name: "author 4", author: "testauthor", age: "4", id: "5" },
];

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    name: { type: GraphQLString },
    author: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    name: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        console.log(parent, args);
        return authors.find((author) => author.id === parent.authorid);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        return authors.filter((author) => author.id === parent.authorid);
      },
    },
    id: { type: GraphQLString },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "Root",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return books;
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return books.find((b) => b.id === args.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
