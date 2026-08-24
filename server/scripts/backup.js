const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const backupDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[BACKUP] Connected to: ${conn.connection.name}`);

    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const collections = await mongoose.connection.db.listCollections().toArray();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const targetDir = path.join(backupDir, `backup-${timestamp}`);
    fs.mkdirSync(targetDir, { recursive: true });

    for (const col of collections) {
      const data = await mongoose.connection.db.collection(col.name).find({}).toArray();
      const filePath = path.join(targetDir, `${col.name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`[BACKUP] Saved collection: ${col.name} (${data.length} docs)`);
    }

    console.log(`\n[SUCCESS] Full backup created at: ${targetDir}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(`[BACKUP ERROR] ${err.message}`);
    process.exit(1);
  }
};

backupDB();
