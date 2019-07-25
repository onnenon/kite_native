const spawn = require('cross-spawn');
require('colors');

main();

async function main() {
  let isCompiling;
  let isLinting;
  let initialMessage;
  if (process.argv.length === 2) {
    isCompiling = true;
    isLinting = true;
    initialMessage = 'Compiling TS and Linting';
  } else if (process.argv.length === 3 && (process.argv[2] === '-c' || process.argv[2] === '-l')) {
    if (process.argv[2] === '-c') initialMessage = 'Compiling TS';
    else initialMessage = 'Linting';
    isCompiling = process.argv[2] === '-c';
    isLinting = process.argv[2] === '-l';
  } else {
    console.log('\nOptions:\n\n\tOnly compile, -c\n\tOnly lint, -l,\n\tOr neither\n');
    process.exit(2);
    return;
  }

  console.log(`\n${initialMessage}...`.bold);

  const compile = async () => await executeYarnCommand(`compile`);
  const lint = async () => await executeYarnCommand(`lint`);

  const tasks = [];
  if (isCompiling) tasks.push(compile());
  if (isLinting) tasks.push(lint());
  const done = await Promise.all(tasks);
  const compileOutput = done[0];
  const lintOutput = done[isCompiling && isLinting ? 1 : 0];

  console.log('Done!'.grey);

  const { compileItems, lintItems } = filterOutput(compileOutput || '', lintOutput || '');

  if (compileItems.length + lintItems.length > 0) {
    console.log(`\n${compileItems.length} Type Errors, ${lintItems.length} Lint Warnings:\n`.bold);
    printAllMessages(compileItems, lintItems);
    console.log();
    process.exit(1);
  } else {
    console.log();
    process.exit(0);
  }
}

function executeYarnCommand(command) {
  console.log(`$ yarn ${command}`);
  return new Promise((resolve, reject) => {
    var response = '';
    const commandArgs = command.split(/\s/);
    let _process;
    if (process.platform === 'win32') {
      _process = spawn('npm', ['run', ...commandArgs], { encoding: 'utf-8' });
    } else {
      _process = spawn('yarn', commandArgs, { encoding: 'utf-8' });
    }
    _process.stdout.on('data', chunk => (response += chunk.toString()));
    _process.on('exit', () => resolve(response));
    _process.on('close', () => resolve(response));
    _process.on('error', err => reject(err));
    _process.on('disconnect', () => resolve(response));
  });
}

function filterOutput(compileOutput, lintOutput) {
  const compileItems = [];
  const lintItems = [];

  const compileOutputLines = compileOutput.split('\n');
  for (line of compileOutputLines) {
    if (line.startsWith('src/') || line.startsWith('types/')) {
      line = line
        .replace('(', '[')
        .replace(')', ']')
        .trim();
      const groups = /^(.*?\:\s?).*?\:\s*(.*)$/.exec(line);
      const modLine = groups[1] + groups[2];
      if (line.includes('is declared but its value is never read.')) {
        lintItems.push(modLine);
      } else {
        compileItems.push(modLine);
      }
    }
  }

  const lintOutputLines = lintOutput.split('\n');
  for (line of lintOutputLines) {
    if (line.startsWith('WARNING: ')) {
      lintItems.push(/WARNING:\s*?\/.*?\/(src\/.*$)/.exec(line)[1]);
    }
  }

  return { compileItems, lintItems };
}

function printAllMessages(compileItems, lintItems) {
  const messages = [
    ...lintItems.map(message => {
      const groups = /^(.*?)\:\s*(.*)$/.exec(message);
      return {
        type: 'Warning',
        location: groups[1],
        message: groups[2],
      };
    }),
    ...compileItems.map(message => {
      const groups = /^(.*?)\:\s*(.*)$/.exec(message);
      return {
        type: 'Error  ',
        location: groups[1],
        message: groups[2],
      };
    }),
  ].sort((l, r) => l.message.localeCompare(r.message));
  for (message of messages) {
    console.log(
      `${message.type === 'Warning' ? message.type.yellow : message.type.red} ` +
        `(${message.location})`.grey +
        `: ${message.message}\n`.reset
    );
  }
}
