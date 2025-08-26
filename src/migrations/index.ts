import * as migration_20250819_115139 from './20250819_115139';
import * as migration_20250819_115833 from './20250819_115833';
import * as migration_20250826_090245 from './20250826_090245';

export const migrations = [
  {
    up: migration_20250819_115139.up,
    down: migration_20250819_115139.down,
    name: '20250819_115139',
  },
  {
    up: migration_20250819_115833.up,
    down: migration_20250819_115833.down,
    name: '20250819_115833',
  },
  {
    up: migration_20250826_090245.up,
    down: migration_20250826_090245.down,
    name: '20250826_090245'
  },
];
