const dedent = require('dedent');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const pkg = require('../package.json');

const context = {
  akxVersion: pkg.version
}

const argv = hideBin(process.argv);
const cli = yargs(argv)
cli
  .usage('Usage: $0 [command] <options>')
  .demandCommand(1, 'One command is required. Pass --help to see all available commands and options.')
  .strict()
  .recommendCommands()
  .fail((msg, err) => {
    console.log('msg', msg);
    console.log('err', err);
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .wrap(cli.terminalWidth())
  .epilogue(dedent`
      When a command fails, all logs are written to lerna-debug.log in the current working directory.

      For more information, find our manual at https://github.com/lerna/lerna
    `)
  .options({
    debug: {
      type: 'boolean',
      describe: 'Bootstrap debug mode',
      alias: 'd'
    }
  })
  .option('registry', {
    type: 'string',
    describe: 'Define global registery',
    alias: 'r'
  })
  .group(['debug'], 'Dev Options:')
  .group(['registry'], 'Extra Options:')
  .command('init [name]', 'Do init a project', (yargs) => {
    yargs
      .option('name', {
        type: 'string',
        describe: 'Name of project',
        alias: 'n'
      })
  }, (argv) => {
    console.log(argv);
  })
  .command({
    command: 'list',
    aliases: ['ls', 'la', 'll'],
    describe: 'List local packages',
    builder: () => {
      console.log('start');
      setTimeout(() => {
        console.log('setTimeout');
      });
      new Promise(() => {
        const chain = Promise.resolve();
        chain.then(() => console.log('chain1'));
        chain.then(() => console.log('chain2'));
        chain.then(() => console.log('chain3'));
      });
      const chain = Promise.resolve();
      chain.then(() => console.log('chain4'));
      setTimeout(() => {
        const chain = Promise.resolve();
        chain.then(() => console.log('chain5'));
      });
      console.log('end');
    },
    handler: (argv) => { /*console.log(argv);*/ }
  })
  .parse(process.argv.slice(2), context);