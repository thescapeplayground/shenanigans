import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const cleanArgs = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--host') {
    cleanArgs.push('-H');
  } else if (arg.startsWith('--host=')) {
    cleanArgs.push('-H', arg.substring(7));
  } else {
    cleanArgs.push(arg);
  }
}

// Ensure the server runs on port 3000 as mandated by the container reverse proxy.
if (!cleanArgs.includes('-p') && !cleanArgs.includes('--port')) {
  cleanArgs.push('-p', '3000');
}

// Ensure the server binds to 0.0.0.0 to be visible externally.
if (!cleanArgs.includes('-H') && !cleanArgs.includes('--hostname')) {
  cleanArgs.push('-H', '0.0.0.0');
}

console.log('Proxying dev command to: next dev', cleanArgs.join(' '));

const child = spawn('npx', ['next', 'dev', ...cleanArgs], {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
