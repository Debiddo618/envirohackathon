// seed.js // $node seed.js // 
require('dotenv').config();
require('./config/database');

const Crop = require('./models/crop');
const data = require('./data.json');

(async function () {
    try {
        // Delete any existing crops in the database
        await Crop.deleteMany({});
        
        // Insert new crops from the data.json file
        const crops = await Crop.create(data);
        
        console.log(`${crops.length} crops were added to the database!`);
        
        // Exit the process
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
})();
