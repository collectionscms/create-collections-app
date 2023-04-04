#!/usr/bin/env node
import chalk from 'chalk';
import { Argument, Command } from 'commander';
import execa from 'execa';
import fse from 'fs-extra';
import path from 'path';
import Output from './helpers/output.js';

const program = new Command();

program.version('0.2.0', '-v, --version')
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

	Output.info('Installing Superfast')

	try {
		await execa('npx', ['-y', 'superfastcms', 'init', `-p ${directory}`], {stdio: 'inherit'});
	} catch (err) {
		Output.error(err.message || 'Unknown error')
		process.exit(1);
	}

	Output.nextSteps(directory);
})();

