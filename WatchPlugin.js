module.exports = class WatchPlugin {
  constructor({config}) {
    this.config = config;
  }

  apply(jestHooks) {
    // jestHooks.shouldRunTestSuite(testSuiteInfo => {
    //     return testSuiteInfo.testPath.includes('__tests__/genDiff.deep.test.js');
    //   });

      jestHooks.onTestRunComplete(results => {
        console.log(`Passed Tests: ${results.numPassedTests}/${results.numTotalTests}`);
        console.log(`Failed Tests: ${results.numFailedTests}/${results.numTotalTests}`);
        this._hasSnapshotFailure = results.snapshot.failure;
    });

    jestHooks.onFileChange(({projects}) => {
      this._projects = projects;
    });
  }

  getUsageInfo(globalConfig) {
    return {
      key: 'f',
      prompt: 'Run only "genDeff.flat.test.js" test',
    };
  }

  run(globalConfig, updateConfigAndRun) {
    updateConfigAndRun({
      testPathPattern: './__tests__/genDiff.flat.test.js'
    })
    return Promise.resolve(false);
  }
}
