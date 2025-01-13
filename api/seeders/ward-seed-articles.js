/**
 * Author: Elliot C
 * 
 * Inserts seed data into the 'ward' table.
 *
 * @param {object} queryInterface - The interface for querying the database.
 * @param {object} Sequelize - The Sequelize library.
 * @returns {Promise<void>} A promise that resolves when the seed data has been inserted.
*/

module.exports = {
    async up (queryInterface, DataTypes) {
      await queryInterface.bulkInsert('ward', [
        {
            wardId: '301',
            wardLocation: 'Westmead Hospital',
        },
        {
            wardId: '302',
            wardLocation: 'Balmain Hospital',
        },
        {
            wardId: '303',
            wardLocation: 'RPA Hospital',
        },
        {
            wardId: '304',
            wardLocation: 'Liverpool Hospital',
        },
        {
            wardId: '305',
            wardLocation: 'St George Hospital'
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