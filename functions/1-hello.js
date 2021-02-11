// [domain]/.netlify/functions/1-hello

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'Our first serverless function',
  };
};

// const person = { name: 'James' };

// exports.handler = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(person),
//   };
// };
