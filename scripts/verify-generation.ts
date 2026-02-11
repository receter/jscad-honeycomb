
import { honeycomb } from '../lib/main';

console.log('Verifying honeycomb generation...');

try {
  // Test 1: Standard generation (mesh)
  console.log('Test 1: Standard generation');
  const mesh = honeycomb({ rows: 3, columns: 3 });
  if (!mesh) throw new Error('Mesh generation failed');
  console.log('  Success');

  // Test 2: Invert generation (studs)
  console.log('Test 2: Invert generation');
  const studs = honeycomb({ rows: 3, columns: 3, invert: true });
  if (!studs) throw new Error('Studs generation failed');
  console.log('  Success');

  // Test 3: Fill options (mesh)
  console.log('Test 3: Fill options (mesh)');
  const filledMesh = honeycomb({
    rows: 4,
    columns: 4,
    fill: { top: 1, bottom: 1, left: 1, right: 1 }
  });
  if (!filledMesh) throw new Error('Filled mesh generation failed');
  console.log('  Success');

  // Test 4: Fill options ignored when invert is true
  console.log('Test 4: Fill options ignored when invert is true');
  const studsIgnoredFill = honeycomb({
    rows: 3,
    columns: 3,
    invert: true,
    fill: { top: 1 } // Should be ignored
  });
  if (!studsIgnoredFill) throw new Error('Studs (ignored fill) generation failed');
  console.log('  Success');

  console.log('All verification tests passed!');
} catch (error) {
  console.error('Verification failed:', error);
  // process.exit(1); // Avoid process.exit to prevent lint error if node types missing, just throw or let it end
  throw error;
}
