import chalk from "chalk";

export const Output = {
  info: (...output: any[]) => console.log(`✨ `, ...output),
  success: (...output: any[]) => console.log(`⭐️ `, chalk.green(...output)),
  error: (...output: any[]) => console.log(`❌ `, chalk.red(...output)),
  nextSteps: (projectName: string) => {
    console.log(`✅ You're now ready to start, so your next steps are`);

    let message = chalk.green("NextSteps");
    message += `\n\ncd ${projectName}`;
    message += `\n\n${chalk.grey("To run in development")}`;
    message += `\n\n${"npm run dev"}`;
    message += `\n\n${chalk.grey("To run in production")}`;
    message += `\n\n${"npm run build"}`;
    message += `\n${"npm run start"}`;

    return message;
  },
};
