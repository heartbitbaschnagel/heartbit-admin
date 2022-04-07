# HeartBit Admin

To visit the HeartBit Admin Portal, follow this link: https://heartbit-admin.vercel.app/

This site was built with Next.js and is hosted on Vercel.

Dr. B and his researchers can use this web portal to interact directly with their HRV study data. Once logged in, they can perform intuitive data searches and download whatever datasets they need to store locally.

## Installation for Development

Run the following:
```bash
npm install
```

Create a file for local environment variables `.env.local` at the root of the project. Add the following to it (altering the port according to your local configuration):
```
NEXT_PUBLIC_AUTH0_REDIRECT=http://localhost:3000
```

## Running for Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Information from Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
