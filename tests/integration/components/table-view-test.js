import { module, test } from 'qunit';
import { setupRenderingTest } from 'first-emberjs/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | table-view', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TableView />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <TableView>
        template block text
      </TableView>
    `);

    assert.dom().hasText('template block text');
  });
});
