import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql', // this is not datamodel.graphql
    endpoint: 'http://localhost:4466', // where prisma graphql api lives
})

export { prisma as default }
/******* FOLLOWING ARE SOME SAMPLE QUERIES USING PRISMA SETUP *****************/

/*
* How to check if some item exists in database e.g. a post with given id and title.
*/
/*
prisma.exists.Post({
  id: "ck1lo4mzh01mr09914y44tief",
  title: "hacked!"
}).then((exists) => {
  console.log(exists)
})*/


/*
* How to create new data and get something specifc back e.g. create new post for a
* given author and return user information with his/her all posts
*/
const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({
    id: authorId
  })

  if (!userExists) {
    throw new Error('User not found')
  }

  console.log('here')
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, `{author {id name email posts {id title published}}}`)
  console.log(post.author)
  return post.author
}

// Call to createPostForUser.
/*
createPostForUser('ck1fs4cgi006h0991iyv7s59v', {
  title: "Great books to read",
  body: "book sbody",
  published: true
}).then((user) => {
  console.log(JSON.stringify(user))
}).catch((error) => {
  console.log(error.message)
})*/

/*
* How to update and get back specific info e.g. update post and get author info
* with all his/her posts.
*/
const updatePostForUser = async (postId, data) => {
  const exists = await prisma.exists.Post({
    id: postId
  })

  if (!exists) {
    throw new Error('Post does not exist')
  }

  return prisma.mutation.updatePost(
   {
     data:  {
      ...data
    },
    where: {
      id: postId
    }
  }, `{id author {id email name posts {id title published}}}`).then((post) => {
    return post.author
  });
}

// Call to updatePostForUser()
/*
updatePostForUser("ck1lo4mzh01mr09914y44tief", {title: 'hacked!'}).then((author) => {
  console.log(JSON.stringify(author))
}).catch((error) => {
  console.log(error.message)
})*/

/*
prisma.mutation.createPost({
  data: {
    title: 'My new graphql post is live',
    body: 'You can find a new course here',
    published: true,
    author: {
      connect: {
        id: "ck1fs4cgi006h0991iyv7s59v"
      }
    }
  }
}, `{id title body author {id name}}`).then((data) => {
  console.log(JSON.stringify(data))
  return prisma.query.users(null, `{id name posts {id title}}`)
}).then((data) => {
  console.log(JSON.stringify(data, undefined, 2))
})*/
