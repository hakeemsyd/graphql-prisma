const Subscription = {
  count: {
    subscribe(parent, args, {pubSub}, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubSub.publish('count', {
          count
        })
      }, 1000);
      return pubSub.asyncIterator('count')
    }
  },
  comment: {
    subscribe(parent, {postId}, {prisma}, info) {
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId
              }
            }
          }
        }, info)
    }
  },
  post: {
    subscribe(parent, args, {prisma}, info)  {
      return prisma.subscription({
        where: {
          node: {
            published: true
          }
        }
      }, info)
    }
  }
}

export {Subscription as default}
