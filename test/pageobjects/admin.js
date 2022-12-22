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
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[1]/select');
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
    return $('/html/body/div/div/section/form/div[3]/button[2]');
  }
  get actButton() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[1]/td[9]/span/button[1]');
  }
  get confirmActButton() {
    return $('/html/body/div/div/section/dialog/div/button[2]');
  }
  get closeConfirmActButton() {
    return $('/html/body/div/div/section/dialog/div/button');
  }
  get editProjectButton() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[2]/td[9]/span/button[2]');
  }
  get confirmCreationButton() {
    return $('/html/body/div/div/section/dialog/div/button');
  }
  get employeesButton() {
    return $('/html/body/div/div/header/nav/ul/li[2]/a');
  }
  get inactiveEmployee() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[1]/td[6]/span/button[1]');
  }
  get confirmInactiveButton() {
    return $('/html/body/div/div/section/dialog/div/button[2]');
  }
  get closeModalSuccess() {
    return $('/html/body/div/div/section/dialog/div/button');
  }
  get editEmployee() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[1]/td[6]/span/button[2]');
  }
  get numberInputEmployee() {
    return $('#phone');
  }
  get submitEmployee() {
    return $('/html/body/div/div/section/form/div[3]/button[2]');
  }
  get timesheetButton() {
    return $('/html/body/div/div/header/nav/ul/li[4]/a');
  }
  get createTimesheetButton() {
    return $('/html/body/div/div/section/div/header/div/button');
  }
  get deleteTimesheetButton() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[2]/td[7]/span/button[1]');
  }
  get editTimesheetButton() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[2]/td[7]/span/button[2]');
  }
  get employeeTimesheet() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[1]/label[1]/select');
  }
  get projectTimesheet() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[1]/label[2]/select');
  }
  get taskTimesheet() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[1]/label[3]/select');
  }
  get descriptionTimesheet() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[1]/input');
  }
  get dateTimesheet() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[2]/input');
  }
  get hoursTimesheet() {
    return $('/html/body/div/div/section/form/div[2]/fieldset[2]/label[3]/input');
  }
  get tasksButton() {
    return $('/html/body/div/div/header/nav/ul/li[5]/a');
  }
  get createTasksButton() {
    return $('/html/body/div/div/section/div/header/div/button');
  }
  get deleteTasksButton() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[1]/td[2]/span/button[1]');
  }
  get editTasksButton() {
    return $('/html/body/div/div/section/div/div[1]/table/tbody/tr[5]/td[2]/span/button[2]');
  }
  get descriptionTasks() {
    return $('/html/body/div/div/section/form/div[2]/fieldset/label/input');
  }
  async aProject(name, client, description, startDate, endDate, rate) {
    await this.inputProjectName.setValue(name);
    await this.inputProjectClient.setValue(client);
    await this.inputProjectDescription.setValue(description);
    await this.inputProjectStartDate.setValue(startDate);
    await this.inputProjectEndDate.setValue(endDate);
    await this.inputProjectEmployeeRate.setValue(rate);
  }
  async aTimesheet(description, date, hours) {
    await this.descriptionTimesheet.setValue(description);
    await this.dateTimesheet.setValue(date);
    await this.hoursTimesheet.setValue(hours);
  }
}
module.exports = new AdminPage();
