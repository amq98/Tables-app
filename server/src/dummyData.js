// server/src/dummyData.js
const Restaurant = require('./models/Restaurant');

const createDummyData = async () => {
  try {
    await Restaurant.bulkCreate([
      { name: 'Restaurant A', address: '123 Main St', cuisine: 'Italian', rating: 4.5 },
      { name: 'Restaurant B', address: '456 Elm St', cuisine: 'Mexican', rating: 4.0 },
      { name: 'Restaurant C', address: '789 Oak St', cuisine: 'Japanese', rating: 4.2 },
    ]);
    console.log('Dummy data created');
  } catch (error) {
    console.error('Error creating dummy data:', error);
  }
};

module.exports = createDummyData;
