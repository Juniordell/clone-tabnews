const { default: orchestrator } = require("tests/orchestrator");

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const updatedAtParsed = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(updatedAtParsed);

  const postgresVersion = responseBody.dependencies.database.version;
  expect(postgresVersion).toEqual("16.0");

  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toEqual(100);

  const usedConnections = responseBody.dependencies.database.used_connections;
  expect(usedConnections).toEqual(1);
});

// test.only("GET to /api/v1/status should return 200", async () => {
//   await fetch("http://localhost:3000/api/v1/status?database_name=local_db");
//   await fetch(
//     "http://localhost:3000/api/v1/status?database_name='; SELECT pg_sleep(4); --",
//   );
// });
