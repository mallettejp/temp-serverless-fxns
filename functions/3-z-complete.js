// this function combines the functionality of 3-airtable.js and 3-product.js

require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appI0gNFgBWlzvstV')
  .table('products');

exports.handler = async (event, context) => {
  // console.log(event);
  const { id } = event.queryStringParameters;
  // show single product if id is provided
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
  // if no id is provided, access the full airtable list
  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const { name, image, price } = product.fields;
      const url = image[0].url;
      return { id, name, url, price };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server error',
    };
  }
};
