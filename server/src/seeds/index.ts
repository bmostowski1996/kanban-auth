import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';
import { sequelize } from '../models/index.js';

// Parent function for seeding...
// We should look at ticket-seeds.ts and user-seeds.ts for more info...
const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedTickets();
    console.log('\n----- TICKETS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
