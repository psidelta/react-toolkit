const chalk = require('chalk');
const MODULE_NAME = process.env.npm_config_module || 'ALL';

if (!MODULE_NAME) {
  console.log(chalk.red('Have to provide a --module option!\n\n'));
  process.exit(1);
}

// var filesPattern;
// if (MODULE_NAME === 'ALL') {
//   filesPattern = `<rootDir>/src/**/*-test.js`;
// } else {
//   filesPattern = `<rootDir>/src/${MODULE_NAME}/**/*-test.js`;
// }

module.exports = {
  setupFiles: ['<rootDir>/setupTests.js'],
  // globalTeardown: './teardownTests.js',
  // testEnvironment: './puppeteer_environment.js',
  testMatch: [
    MODULE_NAME === 'ALL'
      ? `<rootDir>/src/**/__jests__/**/*.js`
      : `<rootDir>/src/${MODULE_NAME}/**/__jests__/**/*.js`
  ],
  testPathIgnorePatterns: ['/.history/', '/node_modules/'],
  // moduleFileExtensions: ['js', 'jsx'],
  // moduleDirectories: ['node_modules'],
  globals: {
    sinon: require('sinon')
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|sass|scss)$': '<rootDir>/__mocks__/fileMock.js'
  }
};
