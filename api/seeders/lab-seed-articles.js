/**
 * Author: Elliot C
 * 
 * Inserts seed data into the 'lab' table.
 *
 * @param {object} queryInterface - The interface for querying the database.
 * @param {object} Sequelize - The Sequelize library.
 * @returns {Promise<void>} A promise that resolves when the seed data has been inserted.
*/


module.exports = {
    async up (queryInterface, DataTypes) {
      
      await queryInterface.bulkInsert('lab', [
       {
        labId: '101',
        labLocation: 'Westmead Lab',
       },
       {
        labId: '102',
        labLocation: 'Balmain Lab'
       },
       {
        labId: '103',
        labLocation: 'RPA Lab'
       },
       {
        labId: '104',
        labLocation: 'Liverpool Lab'
       },
       {
        labId: '105',
        labLocation: 'St George Lab'
       }
       
       
       
      ])
    },

    async down (queryInterface, DataTypes) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         * 
         * Delete articles with a specific title:
         * await queryInterface.bulkDelete('Articles', { title: 'War and Peace' });
         * 
         * Delete articles where the title starts with 'Sequelize':
         * await queryInterface.bulkDelete('Articles', {title: {[Op.like]: 'Sequelize%'}});
         */
      }
}