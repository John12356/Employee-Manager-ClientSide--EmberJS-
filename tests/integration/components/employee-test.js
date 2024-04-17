import { module, test } from 'qunit';
import { setupRenderingTest } from 'first-emberjs/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | employee', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Employee />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Employee>
        template block text
      </Employee>
    `);

    assert.dom().hasText('template block text');
  });
});
