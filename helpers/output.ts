import chalk from 'chalk';
import logSymbols from 'log-symbols';

const Output = {
  success: (...output: any[]) => console.log(`${logSymbols['success']} `, ...output),
  error: (...output: any[]) => console.log(`${logSymbols['error']} `, ...output),
  info: (...output: any[]) => console.log(chalk.blue(...output)),
  nextSteps: (projectName: string) => {
    console.log(`
${chalk.green('Awesome!')} You're now ready to start coding.

We already ran ${chalk.magentaBright('npm install')} for you, so your next steps are:

$ ${chalk.magentaBright(`cd ${projectName}`)}

$ ${chalk.magentaBright('npm run dev')} - To start a local server for development.
$ ${chalk.magentaBright('npm run build')} - To build a version for production.
$ ${chalk.magentaBright('npm run start')} - To run the server in production.

`);
  }
};

export default Output;
