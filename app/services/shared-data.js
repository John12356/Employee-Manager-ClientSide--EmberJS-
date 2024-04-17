import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SharedDataService extends Service {
  @tracked isEditOpen = false;
  @tracked employee = null;
  @tracked deleteId = null;
  @tracked isDeleteOpen = false;
  @tracked emp = [];

  toggler(emp) {
    this.isEditOpen = true;
    this.employee = emp;
  }
  deleteToggler() {
    this.isDeleteOpen = true;
  }

  @action
  async getEmployees() {
    const response = await fetch('http://127.0.0.1:8000/employee/get');
    const data = await response.json();
    this.emp = data;
  }

  validateEditInput(ipValue) {
    if (
      ipValue.emp_age.toString().trim() === '' ||
      ipValue.emp_name.trim() === ''
    ) {
      alert('Enter all the details!!..');
      return false;
    }
    if (ipValue.emp_name.length < 5 || ipValue.emp_name.length > 20) {
      alert('Name should contains 5 to 20 letters');
      return false;
    }
    if (ipValue.emp_age < 18 || ipValue.emp_age > 60) {
      alert('Age should be 18 to 60');
      return false;
    }
    return true;
  }

  validatePostInput(ipValue, emp) {
    if (
      ipValue.emp_id.trim() === '' ||
      ipValue.emp_age.trim() === '' ||
      ipValue.emp_name.trim() === ''
    ) {
      alert('Enter all the details!!..');
      return false;
    }
    let found = emp.find((each) => each.emp_id.toString() === ipValue.emp_id);
    console.log(found);
    if (found) {
      alert('Employee ID already exist:(');
      return false;
    }
    if (ipValue.emp_name.length < 5 || ipValue.emp_name.length > 20) {
      alert('Name should contains 5 to 20 letters');
      return false;
    }
    if (ipValue.emp_age < 18 || ipValue.emp_age > 60) {
      alert('Age should be 18 to 60');
      return false;
    }
    return true;
  }
}
