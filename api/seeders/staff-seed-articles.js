/**
 * Author: Elliot C
 * 
 * Inserts seed data into the 'Staff' table.
 *
 * @param {object} queryInterface - The interface for querying the database.
 * @param {object} Sequelize - The Sequelize library.
 * @returns {Promise<void>} A promise that resolves when the seed data has been inserted.
*/

module.exports = {
  async up(queryInterface, DataTypes) {

    await queryInterface.bulkInsert('staff', [
      {
        staffId: '201',
        firstName: 'Joe',
        lastName: 'Ng',
        Position: 'Nurse',
      },
      {
        staffId: '202',
        firstName: 'Jacky',
        lastName: 'Johnson',
        Position: 'Nurse',
      },
      {
        staffId: '203',
        firstName: 'Anna',
        lastName: 'Shelby',
        Position: 'Doctor',
      },
      {
        staffId: '204',
        firstName: 'Grace',
        lastName: 'Wong',
        Position: 'Doctor',
      },
      {
        staffId: '205',
        firstName: 'Michael',
        lastName: 'Goodwin',
        Position: 'Doctor',
      }


    ])
  },

  async down(queryInterface, DataTypes) {
    /**
     * Add commands to revert seed here.
     *
     
     * staffId: '201',
     * labId: '101',
     * staffId: '202',
     * labId: '102',
    * staffId: '203',
    * labId: '103',
    * staffId: '204',
    * labId: '104',
    *staffId: '205',
    *labId: '105',
     */
  }
}