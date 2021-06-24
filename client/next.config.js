module.exports = {
    async rewrites() {
      return [
        {
            source: '/api/users/:slug*',
            destination: `http://auth:3000/api/users/:slug*`,
        },
      ]
    },
  }