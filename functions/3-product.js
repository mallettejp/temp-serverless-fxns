require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appI0gNFgBWlzvstV')
  .table('products');

exports.handler = async (event, context) => {
  // console.log(event);
  const { id } = event.queryStringParameters;
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        // return 404 if there is an error
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }
      // return product if id exists in airtable
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
      // catch any other error
    } catch (error) {
      return {
        statusCode: 404,
        body: `No product with id: ${id}`,
      };
    }
  }
  // return 500 if no id provided
  return {
    statusCode: 500,
    body: 'Please provide product id',
  };
};
