class ComponentsService {
  constructor(axiosInstance, project) {
    this.axiosInstance = axiosInstance;
    this.project = project;
  }

  async fetchAll() {
    const response = await this.axiosInstance.get(`/rest/api/3/project/${this.project}/components`);
    return response.data;
  }
}

module.exports = ComponentsService;
