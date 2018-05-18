import inquirer, { Question } from 'inquirer';
import { Optional, capitalizeString } from 'node-shared-utils';

import { Plugin } from '../presets';
import availableFrontEnds from '../utils/availableFrontEnds';

interface Answers {
  frontEnd: string;
  reactScripts: string;
}

const frontEndQuestion = (frontEnds: string[]): Question<Answers> => ({
  name: 'frontEnd',
  type: 'list',
  message: 'Choose a front end framework to use:',
  choices: frontEnds
    .map(frontEnd => ({
      name: capitalizeString(frontEnd),
      value: frontEnd,
    }))
    .concat({
      name: 'None',
      value: 'none',
    }),
});

// If using react allow user to choose a custom version of react scripts
const reactScriptsQuestion: Question<Answers> = {
  name: 'reactScripts',
  type: 'input',
  message: 'Which version of react scripts would you like to use? (default)',
  when: (answers: Answers) => answers.frontEnd === 'react',
};

export default async function frontEndPrompt(): Promise<Optional<Plugin>> {
  // Get all available front ends and make an array of all the names
  const frontEnds = availableFrontEnds();

  const frontEndNames = Object.keys(frontEnds);
  const { frontEnd, reactScripts } = await inquirer.prompt<Answers>([
    frontEndQuestion(frontEndNames),
    reactScriptsQuestion,
  ]);

  // User doesn't want a front end framework
  if (!frontEnd) {
    return undefined;
  }

  return {
    name: frontEnd,
    options: {
      cli: frontEnds[frontEnd],
      reactScripts,
    },
    dependencies: [],
    devDependencies: ['concurrently'],
  };
}
