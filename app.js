const AppService = require("./services/app.service");

async function init({ baseURL, project } = {}) {
  if (!baseURL) {
    throw new Error("baseURL is required");
  }
  if (!project) {
    throw new Error("project is required");
  }

  const app = new AppService(baseURL, project);
  try {
    const results = await app.run();

    console.log("Components with no lead:");
    console.log("Component ID, Component Name, Issue Count");
    console.log(results.map((r) => r.join(", ")).join("\n"));
  } catch (e) {
    console.error(e.toString())
    process.exit(1)
  }
}

module.exports = init;
