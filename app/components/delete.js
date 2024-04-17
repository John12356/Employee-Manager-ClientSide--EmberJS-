import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class Employee extends Component {
  @service sharedData;

  @action
  closeDelete() {
    this.sharedData.isDeleteOpen = false;
  }

  @action
  handleDelete() {
    fetch(`http://127.0.0.1:8000/employee/delete/${this.sharedData.deleteId}`, {
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
        this.sharedData.getEmployees();
        this.closeDelete();
      })
      .catch((err) => console.error(err));
  }
}
