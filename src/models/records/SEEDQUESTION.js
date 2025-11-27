const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

/* load env */
function loadEnv(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/(^"|"$)/g, '').trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv(path.join(__dirname, '.env.local'));
loadEnv(path.join(__dirname, '.env'));

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined');
  process.exit(1);
}

/* schema */
const QuestionSchema = new mongoose.Schema({
  questionId: { type: Number, required: true },
  text: { type: String, required: true },
  specialty: { type: String, enum: ['weight', 'dental', 'stetic'], required: true },
  version: { type: String, enum: ['short', 'full'], required: true },
  isMetric: { type: Boolean, default: false },
});

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    console.log('Connected to MongoDB.');

    const jsonPath = path.join(__dirname, 'src', 'data', 'questions.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`JSON file not found at ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const questionsData = JSON.parse(rawData);

    console.log(`Found ${Object.keys(questionsData).length} entries in JSON.`);

    const bulkOps = [];
    const validKeys = new Set(); // track valid keys

    /* build operations */
    for (const [id, item] of Object.entries(questionsData)) {
      if (!item.specialties || typeof item.specialties !== 'object') {
        console.warn(`Skipping ID ${id}: specialties missing or invalid.`);
        continue;
      }

      const isMetric = Boolean(item.isMetric);

      for (const [specialty, versions] of Object.entries(item.specialties)) {
        if (!Array.isArray(versions)) {
          console.warn(`Skipping ID ${id}: invalid versions format on ${specialty}.`);
          continue;
        }

        for (const version of versions) {
          const key = `${id}_${specialty}_${version}`;
          validKeys.add(key);

          bulkOps.push({
            updateOne: {
              filter: {
                questionId: Number(id),
                specialty: specialty,
                version: version,
              },
              update: {
                $set: {
                  text: item.text,
                  isMetric: isMetric,
                },
              },
              upsert: true,
            },
          });
        }
      }
    }

    console.log(`Prepared ${bulkOps.length} operations.`);

    /* delete outdated docs */
    const allDocs = await Question.find({});
    for (const doc of allDocs) {
      const key = `${doc.questionId}_${doc.specialty}_${doc.version}`;
      if (!validKeys.has(key)) {
        await Question.deleteOne({ _id: doc._id });
        console.log(`Removed outdated entry: ${key}`);
      }
    }

    /* write updates */
    if (bulkOps.length > 0) {
      const result = await Question.bulkWrite(bulkOps);
      console.log('Bulk write result:', result);
      console.log(`Successfully processed ${bulkOps.length} questions.`);
    } else {
      console.log('No operations to execute.');
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
