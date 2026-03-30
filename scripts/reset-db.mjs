import fs from "fs";
import path from "path";
const dbPath = path.join(process.cwd(), "data", "db.json");
fs.writeFileSync(dbPath, JSON.stringify({ projects: [], jobs: [] }, null, 2));
console.log("Reset data/db.json");
