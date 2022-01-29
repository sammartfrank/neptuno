#! /usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
import figlet from 'figlet';

let userName;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

async function welcome() {
  const title = chalkAnimation.rainbow('Welcome!,\nDo you know JavaScript?\nLets see how you do!');
  await sleep();
  title.stop();
  console.log(`
    ${chalk.bgBlue('How to play')}
    I am a process on your computer.
    I will ask you a series of questions 
    and if you get any wrong, I will be
    ${chalk.red('terminated')}.
  `);
}

await welcome();
await askUserName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await winner();

async function askUserName() {
  const answers = await inquirer.prompt({
    name: 'user_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Morpheus';
    },
  });
  userName = answers.user_name;
}

async function question1() {
  const answers = await inquirer.prompt([
    {
      name: 'question_1',
      type: 'list',
      message: `Tell me, ${chalk.bgBlue(userName)}. Does JavaScript have a garbage collection?`,
      choices: ['Yes', 'No', 'I dont know'],
    },
  ]);
  await handleAnswer(answers.question_1 == 'Yes', 1);
}
async function question2() {
  const answers = await inquirer.prompt([
    {
      name: 'question_2',
      type: 'list',
      message: `So ${chalk.bgRedBright(userName)}, Is Javascript a compiled language?`,
      choices: ['Yes', 'No', 'I dont know', 'Hint: Is reality a subset of JavaScript?'],
    },
  ]);
  await handleAnswer(answers.question_2 == 'No', 2);
}

async function question3() {
  const answers = await inquirer.prompt([
    {
      name: 'question_3',
      type: 'list',
      message: 'Is Javascript a low level language?',
      choices: ['Yes', 'No', 'I dont know'],
    },
  ]);
  await handleAnswer(answers.question_3 == 'No', 3);
}

async function question4() {
  const answers = await inquirer.prompt([
    {
      name: 'question_4',
      type: 'list',
      message: 'How many threads does Javascript has?',
      choices: ['2', '1', '3', '4'],
    },
  ]);
  await handleAnswer(answers.question_4 == '1', 4);
}

async function question5() {
  const answers = await inquirer.prompt([
    {
      name: 'question_5',
      type: 'list',
      message: 'Is Javascript a multi paradigm language?',
      choices: ['Yes', 'No', 'I dont know'],
    },
  ]);
  await handleAnswer(answers.question_5 == 'Yes', 5);
}

async function question6() {
  const answers = await inquirer.prompt([
    {
      name: 'question_6',
      type: 'list',
      message: 'What is a Promise in Javascript?',
      choices: [
        'A promise is an object that may produce a single value some time in the future',
        'A promise is not an object that may produce a single entry to the endpoint some time in the future',
        'A promise is an element that may produce a couple of values in the thread',
        'An arrow function that has a this to be used',
      ],
    },
  ]);
  await handleAnswer(
    answers.question_6 == 'A promise is an object that may produce a single value some time in the future',
    6
  );
}

async function handleAnswer(isCorrect, qNumber = 1) {
  const spinner = createSpinner('Checking...').start();
  await sleep();
  const resultIndicator = [`${chalk.green('Correct!')}`, `${chalk.red('Incorrect!')}`];
  const message = isCorrect ? resultIndicator[0] : resultIndicator[1];
  const successQuestionMessages = {
    1: `${message}. ${userName}!, thats the legit answer. Heres is your ${chalk.bgRedBright('pill')}. Some high-level languages, such as JavaScript, utilize a form of automatic memory management known as garbage collection (GC).\nThe purpose of a garbage collector is to monitor memory allocation and determine when a block of allocated memory is no longer needed and reclaim it.`,
    2: `${message}. JavaScript is an interpreted language, not a compiled language. A program such as C++ or Java needs to be compiled before it is run. ... In contrast, JavaScript has no compilation step.`,
    3: `${message}. JavaScript is a not a low level language. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices. JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard.`,
    4: `${message}. JavaScript has only one thread. JavaScript is single threaded.`,
    5: `${message}. JavaScript is a multi paradigm language. It is a prototype-based, multi-paradigm scripting language that is dynamic, and supports object-oriented, imperative, and functional programming styles. ... JavaScript can function as both a procedural and an object oriented language`,
    6: `${message}. A promise is an object that may produce a single value some time in the future : either a resolved value, or a reason that it's not resolved (e.g., a network error occurred). ... Promises are eager, meaning that a promise will start doing whatever task you give it as soon as the promise constructor is invoked.J`,
  };

  if (isCorrect) {
    spinner.success({
      text: successQuestionMessages[qNumber],
    });
  } else {
    spinner.error({
      text: `${resultIndicator[1]}. Sorry ${userName}, thats not correct. Plugged back into the Matrix.`,
    });
    process.exit(1);
  }
}

function winner() {
  figlet(`Well done, ${userName} !\n You are now a woke human.`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');
    console.log(chalk.green(`Javascript is the future.`));
    process.exit(0);
  });
}
