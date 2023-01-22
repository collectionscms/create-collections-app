#!/usr/bin/env node
import chalk from 'chalk';
import { Argument, Command } from 'commander';
import execa from 'execa';
import ora from 'ora';
import fse from 'fs-extra';
import path from 'path';
import Output from './helpers/output';
import packageJson from './package.json';

const program = new Command();

program.version(packageJson.version, '-v, --version')
program.usage(
  `${chalk.blue('project-directory')} [options]`
);

// Arguments
program.addArgument(
  new Argument('<project-directory>', 'specify path for create-superfast-app').argOptional().default('create-superfast-app')
);

program.parse(process.argv);

(async () => {
  const directory = program.processedArgs[0];
  const rootPath = path.resolve(directory)

	if (await fse.pathExists(rootPath)) {
		const stat = await fse.stat(rootPath);

		if (stat.isDirectory() === false) {
			Output.error(`Destination ${chalk.magentaBright(directory)} already exists and is not a directory.`)
			process.exit(1);
		}

		const files = await fse.readdir(rootPath);

		if (files.length > 0) {
			Output.error(`Destination ${chalk.magentaBright(directory)} already exists and is not an empty directory.`)
			process.exit(1);
		}
	} else {
		await fse.mkdir(rootPath);
	}

	const onError = ({ err, exit = true }) => {
		if (err) {
			Output.error(err.stderr || err.stdout || 'Unknown error')
		}
		if (exit) {
			process.exit(1);
		}
	};

	const spinner = ora()
	spinner.start(`Copying files to ${chalk.magentaBright(directory)} directory...`)

	try {
		await execa('npx', ['superfastcms', 'init', `-p ${directory}`]);
	} catch (err) {
		onError({err});
	}

	spinner.stop()

	Output.info('Installing dependencies...')

	try {
		await execa('npm', ['install'], {cwd: directory, stdio: 'inherit'});
	} catch (err) {
		onError({err});
	}

	Output.success(`Successfully installed dependencies for ${chalk.magentaBright(directory)}.`)
	Output.nextSteps(directory)
})();

