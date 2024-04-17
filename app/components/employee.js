import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Employee extends Component {
  @service sharedData;
  @tracked emp = [];
  @tracked isEdit = false;

  @action
  toggleEdit(emp) {
    this.sharedData.toggler(emp);
  }

  @action
  toggleDelete(id) {
    this.sharedData.deleteToggler();
    this.sharedData.deleteId = id;
  }

  @action
  async init() {
    super.init(...arguments);
    this.sharedData.getEmployees();
  }

  @tracked emp_id = '';
  @tracked emp_name = '';
  @tracked emp_age = '';

  @action
  save(event) {
    event.preventDefault();
    const formData = {
      emp_id: this.emp_id,
      emp_name: this.emp_name,
      emp_age: this.emp_age,
    };

    if (!this.sharedData.validatePostInput(formData, this.sharedData.emp)) {
      return;
    }
    fetch('http://127.0.0.1:8000/employee/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Post saved:', data);
        this.emp_id = '';
        this.emp_name = '';
        this.emp_age = '';
        this.sharedData.getEmployees();
      })
      .catch((err) => console.error(err));
  }

  @action
  updateId(event) {
    this.emp_id = event.target.value;
  }
  @action
  updateName(event) {
    this.emp_name = event.target.value;
  }
  @action
  updateAge(event) {
    this.emp_age = event.target.value;
  }

  @action
  handleDelete(id) {
    fetch(`http://127.0.0.1:8000/employee/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Post saved:', data);
        // this.emp = this.emp.filter((each) => each.emp_id !== id);
        this.getEmployees();
      })
      .catch((err) => console.error(err));
  }
}
