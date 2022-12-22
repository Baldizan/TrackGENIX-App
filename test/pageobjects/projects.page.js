class ProjectsPage {

    get btnAddHours() {
      return $('/html/body/div/div/section/div/div[1]/table/tbody/tr/td[5]/span/button');
    }

    get btnManage() {
      return $('/html/body/div/div/section/div/header/div/button');
    }

    get btnEmployees() {
      return $('/html/body/div/div/section/div/div[1]/table/tbody/tr/td[5]/button');
    }
    
    get employeesInformation() {
      return $('/html/body/div/div/section/dialog');
    }
}
module.exports = new ProjectsPage();