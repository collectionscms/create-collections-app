import { Argument, Command, Option } from 'commander';
import packageJson from './package.json';
import chalk from 'chalk';
import { copyToProject, installProject } from './helpers/utils';
import Output from "./helpers/output";

const program = new Command();

program.version(packageJson.version, '-v, --version');
program.usage(
  `${chalk.blue('project-directory')} [options]`
);

// Arguments
program.addArgument(
  new Argument('<project-directory>', 'specify path for create-superfast-app').argOptional().default('create-superfast-app')
);

program.parse(process.argv);

(async () => {
  const projectDirectory = program.processedArgs[0];

  await copyToProject(projectDirectory)
  await installProject(projectDirectory);
  Output.nextSteps(projectDirectory);
})();

