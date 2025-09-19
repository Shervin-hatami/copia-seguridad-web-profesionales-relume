import * as migration_20250819_115139 from './20250819_115139';
import * as migration_20250915_082245 from './20250915_082245';
import * as migration_20250915_102853 from './20250915_102853';

export const migrations = [
  {
    up: migration_20250819_115139.up,
    down: migration_20250819_115139.down,
    name: '20250819_115139',
  },
  {
    up: migration_20250915_082245.up,
    down: migration_20250915_082245.down,
    name: '20250915_082245',
  },
  {
    up: migration_20250915_102853.up,
    down: migration_20250915_102853.down,
    name: '20250915_102853'
  },
];
