import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';
import Output from './output';

export const copyToProject = async (projectName: string) => {
  try {
    Output.info(`Copying files to ${chalk.magentaBright(projectName)} directory...`);

    const projectDir = path.join(process.cwd(), projectName);
    const templateDir = path.join(__dirname, '../', 'templates', 'default');

    const requirementsExist = await Promise.all([
      fs.pathExists(templateDir),
    ]);

    if (!requirementsExist.every((requirement) => requirement === true)) {
      Output.error('One of the dependency folders was not found (template or docker configs). Exiting.');
      process.exit(1);
    }

    const folderAlreadyExists = await fs.pathExists(projectDir);

    if (folderAlreadyExists) {
      Output.error(`Project ${chalk.magentaBright(projectName)} already exists. Exiting.`);
      process.exit(1);
    }

    await fs.ensureDir(projectDir);

    await Promise.all([
      fs.copy(templateDir, projectDir),
    ]);

    Output.success('Successfully copied files!');
  } catch (e) {
    console.log(e);
    Output.error(e.message);
    process.exit(1);
  }
};

export const installProject = async (projectName: string) => {
  try {
    const projectDir = path.join(process.cwd(), projectName);
    Output.info(chalk.blue('Installing dependencies...'))
    await execa('npm', ['install'], {cwd: projectDir, stdio: 'inherit'});
    Output.success(`Successfully installed dependencies for ${chalk.magentaBright(projectName)}`);
  } catch (e) {
    console.log(e);
    Output.error(e.message);
    process.exit(1);
  }
};