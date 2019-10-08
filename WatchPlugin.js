module.exports = class WatchPlugin {
  constructor({config}) {
    this.config = config;
  }

  apply(jestHooks) {
    jestHooks.shouldRunTestSuite(testSuiteInfo => {
        return testSuiteInfo.testPath.includes('/home/danylo/backend-project-lvl2/__tests__/integration/genDiff.test.js');
      });

      jestHooks.onTestRunComplete(results => {
        console.log(`Passed Tests: ${results.numPassedTests}`);
        this._hasSnapshotFailure = results.snapshot.failure;
    });
    jestHooks.onFileChange(({projects}) => {
      this._projects = projects;
    });
  }

  getUsageInfo(globalConfig) {
    return {
      key: 'r',
      prompt: 'Run only "genDeff.test.js" test',
    };
  }

  run(globalConfig, updateConfigAndRun) {
    updateConfigAndRun({
      testPathPattern: './__tests__/integration/genDiff.test.js'
    })
    return Promise.resolve(false);
  }
}
