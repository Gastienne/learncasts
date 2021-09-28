import { Handler } from '@netlify/functions';

const handler: Handler = () => {
  console.log(process.env)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};

export { handler };
