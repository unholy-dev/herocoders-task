class IssuesService {
  constructor(axiosInstance, project) {
    this.axiosInstance = axiosInstance;
    this.project = project;
  }

  async fetchAll() {
    let startAt = 0;
    let maxResults = 50;
    let total = 0;
    let issues = [];
    do {
      const data = await this.fetch(startAt, maxResults);
      total = data.total;
      startAt += maxResults;
      issues = issues.concat(data.issues);
    } while (startAt < total);
    return issues;
  }

  async fetch(startAt = 0, maxResults = 50) {
    const params = new URLSearchParams({
      jql: `project=${this.project} AND component IS NOT EMPTY`,
      fields: "components",
      startAt,
      maxResults,
    })
    const response = await this.axiosInstance.get(`/rest/api/3/search?${params.toString()}`);
    return response.data;
  }
}

module.exports = IssuesService;
