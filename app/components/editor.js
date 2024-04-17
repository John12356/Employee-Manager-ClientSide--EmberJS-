import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class Editor extends Component {
  @service sharedData;

  @tracked formData = {
    emp_name: this.sharedData.employee.emp_name,
    emp_age: this.sharedData.employee.emp_age,
  };

  @action
  closeEditor() {
    this.sharedData.isEditOpen = false;
  }

  @action
  updateName(event) {
    this.formData.emp_name = event.target.value;
  }
  @action
  updateAge(event) {
    this.formData.emp_age = event.target.value;
  }

  @action
  submitEdit() {
    if (!this.sharedData.validateEditInput(this.formData)) {
      return;
    }
    fetch(
      `http://127.0.0.1:8000/employee/edit/${this.sharedData.employee.emp_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData),
      },
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        this.sharedData.getEmployees();
        console.log('Post saved:', data);
        this.emp_name = '';
        this.emp_age = '';
        this.closeEditor();
        this.sharedData.getEmployees();
      })
      .catch((err) => console.error(err));
  }
}
