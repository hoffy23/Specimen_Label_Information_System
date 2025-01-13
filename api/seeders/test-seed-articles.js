/**
 * Author: Elliot C
 * 
 * Inserts seed data into the 'test' table.
 *
 * @param {object} queryInterface - The interface for querying the database.
 * @param {object} Sequelize - The Sequelize library.
 * @returns {Promise<void>} A promise that resolves when the seed data has been inserted.
*/

module.exports = {
    async up (queryInterface, DataTypes) {
      
      await queryInterface.bulkInsert('test', [
       {
        testType: '401',
        testDescription: 'Complete Blood Count',
       },
       {
        testType: '402',
        testDescription: 'Tissue Typing',
       },
       {
        testType: '403',
        testDescription: 'Infectious Diease Screening',
       },
       {
        testType: '404',
        testDescription: 'Bone Marrow Biopsy',
       },
       {
        testType: '405',
        testDescription: 'Pulmonary Function Test',
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