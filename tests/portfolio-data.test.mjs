import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("sample data contains 24 synthetic recruitment records", async () => {
  const csv = await readFile(new URL("public/sample-data/students.csv", root), "utf8");
  const rows = csv.trim().split(/\r?\n/);
  assert.equal(rows.length - 1, 24);
  assert.match(rows[0], /ContactKey/);
  assert.match(rows[0], /ConsentStatus/);
  assert.match(rows[0], /ApplicationStatus/);
});

test("entry SQL includes identity, consent, quality, and lifecycle gates", async () => {
  const sql = await readFile(new URL("sql/01_build_journey_entry.sql", root), "utf8");
  assert.match(sql, /ROW_NUMBER\(\)/);
  assert.match(sql, /ConsentStatus = 'OptedIn'/);
  assert.match(sql, /EmailValid = 1/);
  assert.match(sql, /NOT IN \('Submitted', 'Enrolled'\)/);
});

test("README is transparent about simulator scope", async () => {
  const readme = await readFile(new URL("README.md", root), "utf8");
  assert.match(readme, /personal portfolio project/i);
  assert.match(readme, /not a production/i);
  assert.match(readme, /synthetic/i);
});
