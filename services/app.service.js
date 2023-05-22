const ComponentsService = require("./components.service");
const axios = require("axios");
const IssuesService = require("./issues.service");

class AppService {
  constructor(baseURL, project) {
    this.cs = new ComponentsService(axios.create({ baseURL }), project);
    this.is = new IssuesService(axios.create({ baseURL }), project);
  }

  /**
   * Finds components with no lead and counts issues that belong to that component.
   * The return value is an array of: [componentId, componentName, issueCount] arrays.
   * @see https://herocoders.breezy.hr/p/5be73e5bc3a501-senior-full-stack-developer-with-leadership-skills-react-nodejs
   * @returns {Promise<*[]>}
   */
  async run() {
    // fetch all components and issues
    const components = await this.cs.fetchAll();
    const issues = await this.is.fetchAll();

    // index issues by component
    const byComponent = {};
    for (const issue of issues) {
      for (const component of issue.fields.components) {
        if (!byComponent[component.id]) {
          byComponent[component.id] = [];
        }
        byComponent[component.id].push(issue);
      }
    }

    // collect results
    const results = []
    for (const component of components) {
      if (component.lead) {
        continue;
      }
      results.push([component.id, component.name, byComponent[component.id].length])
    }

    return results
  }
}

module.exports = AppService;
