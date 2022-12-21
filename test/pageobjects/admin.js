class AdminPage {
  get projects() {
    return $('/html/body/div/div/div/div/section/button[1]');
  }
  get addProject() {
    return $('/html/body/div/div/section/div/header/div/button');
  }
  get inputProjectName() {
    return $('#ProjectName');
  }
  get inputProjectClient() {
    return $('#client');
  }
  get inputProjectDescription() {
    return $('#description');
  }
  get inputProjectStartDate() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[1]/label[4]/input');
  }
  get inputProjectEndDate() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[1]/label[5]/input');
  }
  get inputProjectStatus() {
    return $('#active');
  }
  get inputProjectManager() {
    return $('#projectManager');
  }
  get ProjectAddEmployee() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/button');
  }
  get inputProjectChooseEmployee() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[2]/select');
  }
  get inputProjectChooseEmployeeRole() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[3]/select');
  }
  get inputProjectEmployeeRate() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/div[2]/label/input');
  }
  get assignButton() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/div[2]/button');
  }
  get submitButton() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/div[2]/button');
  }
  async aProject(name, client, description, startDate, endDate, status, pm, employee, role, rate) {
    await this.inputProjectName.setValue(name);
    await this.inputProjectClient.setValue(client);
    await this.inputProjectDescription.setValue(description);
    await this.inputProjectStartDate.setValue(startDate);
    await this.inputProjectEndDate.setValue(endDate);
    await this.inputProjectStatus.setValue(status);
    await this.inputProjectManager.setValue(pm);
    await this.inputProjectChooseEmployee.setValue(employee);
    await this.inputProjectChooseEmployeeRole.setValue(role);
    await this.inputProjectEmployeeRate.setValue(rate);
    await this.assignButton.click();
    await this.submitButton.click();
  }
}
export default new AdminPage();
