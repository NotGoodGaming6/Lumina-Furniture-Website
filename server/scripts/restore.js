const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const restoreDB = async () => {
  try {
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      throw new Error('No backups directory found.');
    }

    const backupFolders = fs.readdirSync(backupDir).filter(f => f.startsWith('backup-')).sort().reverse();
    if (backupFolders.length === 0) {
      throw new Error('No backup snapshots found in backups directory.');
    }

    const latestBackup = path.join(backupDir, backupFolders[0]);
    console.log(`[RESTORE] Restoring from latest backup: ${backupFolders[0]}`);

    const conn = await mongoose.connect(process.env.MONGO_URI);
    const files = fs.readdirSync(latestBackup).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const collectionName = file.replace('.json', '');
      const rawData = fs.readFileSync(path.join(latestBackup, file), 'utf-8');
      const docs = JSON.parse(rawData);

      if (docs.length > 0) {
        await mongoose.connection.db.collection(collectionName).deleteMany({});
        await mongoose.connection.db.collection(collectionName).insertMany(docs);
        console.log(`[RESTORE] Restored ${collectionName}: ${docs.length} documents`);
      }
    }

    console.log(`\n[SUCCESS] Database restore completed successfully!`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(`[RESTORE ERROR] ${err.message}`);
    process.exit(1);
  }
};

restoreDB();
