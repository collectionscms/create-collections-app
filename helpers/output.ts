import chalk from 'chalk';

const Output = {
  info: (...output: any[]) => console.log(`✨ `, ...output),
  success: (...output: any[]) => console.log(`⭐️ `, ...output),
  error: (...output: any[]) => console.log(`❌ `, ...output),
  nextSteps: (projectName: string) => {
    console.log(`✅ You're now ready to start, so your next steps are:

$ ${chalk.magentaBright(`cd ${projectName}`)}

$ ${chalk.magentaBright('npm run dev')}   - To start a local server for development.
$ ${chalk.magentaBright('npm run build')} - To build a version for production.
$ ${chalk.magentaBright('npm run start')} - To run the server in production.

`);
  }
};

export default Output;
