const reporter = require('cucumber-html-reporter');
const path = require('path');
const { exec } = require('child_process');

const reportPath = path.resolve('reports/cucumber-report.html');

reporter.generate({
  theme: 'bootstrap',
  jsonDir: 'reports', 
  output: reportPath,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true
});

console.log(`🚀 Cucumber HTML report generated successfully 👍`);

const command =
  process.platform === 'darwin'
    ? `open "${reportPath}"`
    : process.platform === 'win32'
    ? `start "" "${reportPath}"`
    : `xdg-open "${reportPath}"`;

exec(command);
