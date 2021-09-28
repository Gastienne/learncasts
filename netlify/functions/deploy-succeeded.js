exports.handler = () => {
  console.log(process.env)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};
