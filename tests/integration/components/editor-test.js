import { module, test } from 'qunit';
import { setupRenderingTest } from 'first-emberjs/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | editor', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Editor />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Editor>
        template block text
      </Editor>
    `);

    assert.dom().hasText('template block text');
  });
});
