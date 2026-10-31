import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
test('owner master requirements and 4 approved references are committed', () => {
  for (const f of ['README.md', 'MASTER_FEATURES.md', 'VERIFICATION_CHECKLIST.md', 'APPROVED_VISUAL_REFERENCES/README.md',
    'APPROVED_VISUAL_REFERENCES/01_home_layout.jpeg', 'APPROVED_VISUAL_REFERENCES/02_page_layouts.jpeg',
    'APPROVED_VISUAL_REFERENCES/03_platform_visual_overview.jpeg', 'APPROVED_VISUAL_REFERENCES/04_actual_create_menu.jpeg'])
    assert.ok(existsSync(new URL('../docs/owner-requirements/' + f, import.meta.url)), f);
});
