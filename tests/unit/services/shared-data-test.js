import { module, test } from 'qunit';
import { setupTest } from 'first-emberjs/tests/helpers';

module('Unit | Service | shared-data', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:shared-data');
    assert.ok(service);
  });
});
