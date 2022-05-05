const commander = require('commander');
const pkg = require('../package.json');

const program = new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', true)
  .option('-e, --env <envName>', '获取环境变量', true)

// command 命令注册
const clone = program.command('clone <source> [destination]');
clone
  .description('clone a repository')
  .option('-f, --force', '是否强制克隆')
  .action((source, destination, cmdObj) => {
    console.log('do clone', source, destination, cmdObj);
  })

// addCommand 注册子命令
const service = new commander.Command('service');
service
  .command('start [port]')
  .description('start service at some port')
  .action((port) => {
    console.log('service start', port);
  })
service
  .command('stop')
  .action(() => {
    console.log('stop service');
  });

program
  .addCommand(service);

program
  .command('install [name]', 'install package', {
    executableFile: 'akx-cli',
    /*isDefault: true,
    hidden: true*/
  })
  .alias('i');

// 高级定制1：自定义help信息
// program.helpInformation = function() {
//   return 'your help information\n';
// };
// program.on('--help', () => {
//   console.log('your help information');
// });

// 高级定制2：实现debug模式
program.on('option:debug', () => {
  process.env.LOG_LEVEL = 'verbose';
  console.log(process.env.LOG_LEVEL);
})

// 高级定制3：对未知命令进行监听
program.on('command:*', (obj) => {
  console.log(obj);
  console.log(`未知的命令：${obj[0]}`);
  const availableCommands = program.commands.map(cmd => cmd.name());
  console.log(availableCommands);
  console.log(`可用的命令：${availableCommands.join(',')}`);
})

// program
//   .argument('<cmd>', 'command to run')
//   .argument('[options]', 'options for command')
//   .action((cmd, options) => {
//     console.log(cmd, options);
//   })

program
  .parse(process.argv)