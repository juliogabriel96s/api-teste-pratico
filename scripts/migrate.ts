import { readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    const args = process.argv.slice(2);
    const direction = args[0] || "up"; // Default to "up"
    const migrationsDir = join(__dirname, "../src/db/migrations");
    const migrationFiles = await readdir(migrationsDir);

    for (const file of migrationFiles) {
      const migrationPath = join(migrationsDir, file);
      const { up, down } = await import(`file://${migrationPath}`);

      if (direction === "up" && up) {
        console.log(`🔼 Running migration: ${file}`);
        await up();
      } else if (direction === "down" && down) {
        console.log(`🔽 Reverting migration: ${file}`);
        await down();
      }
    }

    console.log("✅ Migration completed.");
  } catch (error) {
    console.error("❌ Migration error:", error);
  }
})();
