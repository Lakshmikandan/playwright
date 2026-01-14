require('dotenv').config({path: './.env', override:true });
module.exports = {

  default: {
    
    paths: [
      `test/features/*.feature`
    ],
    require: [
      'test/step-definitions/*.js',
      'test/hooks/*.js',
      'test/local/*.json',
    ],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await',
    },
    parallel: 1,
    retry: 0,
    publishQuiet: true
  }
};
