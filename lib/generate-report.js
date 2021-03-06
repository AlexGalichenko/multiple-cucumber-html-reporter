'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const fs = require('fs-extra');
const jsonFile = require('jsonfile');
const opn = require('opn');
const path = require('path');
const uuid = require('uuid/v4');
const moment = require('moment');
const collectJSONS = require('./collect-jsons');
const Base64 = require('js-base64').Base64;

const TEMPLATE_HTML = 'template.html';
const RESULT_STATUS = {
  passed: 'passed',
  failed: 'failed',
  skipped: 'skipped',
  pending: 'pending',
  undefined: 'undefined',
  ambiguous: 'ambiguous'
};
const DEFAULT_REPORTNAME = 'Multiple Cucumber HTML Reporter';

function generateReport(options) {
  if (!options) {
    throw new Error('Options need to be provided.');
  }

  if (!options.jsonDir) {
    throw new Error('A path which holds the JSON files should be provided.');
  }

  if (!options.reportPath) {
    throw new Error('An output path for the reports should be defined, no path was provided.');
  }

  const customMetadata = options.customMetadata || false;
  const customData = options.customData || null;
  const disableLog = options.disableLog;
  const openReportInBrowser = options.openReportInBrowser;
  const reportName = options.reportName || DEFAULT_REPORTNAME;
  const reportPath = path.resolve(process.cwd(), options.reportPath);
  const saveCollectedJSON = options.saveCollectedJSON;
  const displayDuration = options.displayDuration || false;
  const durationInMS = options.durationInMS || false;
  const pageTitle = options.pageTitle || 'Multiple Cucumber HTML Reporter';
  const externalLinks = options.externalLinks;
  const displayGlobalChart = options.displayGlobalChart || false;

  fs.ensureDirSync(reportPath);

  const allFeatures = collectJSONS(options);

  let suite = {
    app: 0,
    displayGlobalChart: displayGlobalChart,
    customMetadata: customMetadata,
    customData: customData,
    displayDuration: displayDuration,
    pageTitle: pageTitle,
    browser: 0,
    name: '',
    version: 'version',
    time: new Date(),
    features: allFeatures,
    featureCount: {
      ambiguous: 0,
      failed: 0,
      passed: 0,
      skipped: 0,
      total: 0,
      ambiguousPercentage: 0,
      failedPercentage: 0,
      skippedPercentage: 0,
      passedPercentage: 0
    },
    reportName: reportName,
    scenarios: {
      passed: 0,
      failed: 0,
      skipped: 0,
      pending: 0,
      notdefined: 0,
      ambiguous: 0,
      total: 0
    },
    totalTime: 0
  };

  _parseFeatures(suite);

  // Percentages
  suite.featureCount.ambiguousPercentage = _calculatePercentage(suite.featureCount.ambiguous, suite.featureCount.total);
  suite.featureCount.failedPercentage = _calculatePercentage(suite.featureCount.failed, suite.featureCount.total);
  suite.featureCount.skippedPercentage = _calculatePercentage(suite.featureCount.skipped, suite.featureCount.total);
  suite.featureCount.passedPercentage = _calculatePercentage(suite.featureCount.passed, suite.featureCount.total);

  /**
   * Calculate and return the percentage
   * @param {number} amount
   * @param {number} total
   * @return {string} percentage
   * @private
   */
  function _calculatePercentage(amount, total) {
    return ((amount / total) * 100).toFixed(2);
  }

  /* istanbul ignore else */
  if (saveCollectedJSON) {
    jsonFile.writeFileSync(path.resolve(reportPath, 'enriched-output.json'), suite, { spaces: 2 });
  }

  // _createFeaturesOverviewIndexPage(suite);
  // _createFeatureIndexPages(suite);

  /* istanbul ignore else */
  if (!disableLog) {
    console.log(chalk.blue(`\n
=====================================================================================
    Multiple Cucumber HTML report generated in:

    ${path.join(reportPath)}
=====================================================================================\n`));
  }

  /* istanbul ignore if */
  if (openReportInBrowser) {
    opn(path.join(reportPath));
  }

  function _parseFeatures(suite) {
    suite.features.forEach(feature => {
      feature.scenarios = {
        passed: 0,
        failed: 0,
        notdefined: 0,
        skipped: 0,
        pending: 0,
        ambiguous: 0,
        passedPercentage: 0,
        failedPercentage: 0,
        notdefinedPercentage: 0,
        skippedPercentage: 0,
        pendingPercentage: 0,
        ambiguousPercentage: 0,
        total: 0
      };
      feature.duration = 0;
      feature.time = '00:00:00';
      feature.isFailed = false;
      feature.isAmbiguous = false;
      feature.isSkipped = false;
      suite.featureCount.total++;
      feature.id = `${uuid()}.${feature.id}`.replace(/[^a-zA-Z0-9-_]/g, '-');
      feature.app = 0;
      feature.browser = 0;

      if (!feature.elements) {
        return;
      }

      feature = _parseScenarios(feature, suite);

      if (feature.isFailed) {
        suite.featureCount.failed++;
        feature.failed++;
      } else if (feature.isAmbiguous) {
        suite.featureCount.ambiguous++;
        feature.ambiguous++;
      } else if (feature.isSkipped) {
        feature.skipped++;
        suite.featureCount.skipped++;
      } else {
        feature.passed++;
        suite.featureCount.passed++;
      }

      if (feature.duration) {
        feature.totalTime += feature.duration;
        feature.time = formatDuration(feature.duration)
      }

      // Check if browser / app is used
      suite.app = feature.metadata.app ? suite.app + 1 : suite.app;
      suite.browser = feature.metadata.browser ? suite.browser + 1 : suite.browser;

      // Percentages
      feature.scenarios.ambiguousPercentage = _calculatePercentage(feature.scenarios.ambiguous, feature.scenarios.total);
      feature.scenarios.failedPercentage = _calculatePercentage(feature.scenarios.failed, feature.scenarios.total);
      feature.scenarios.notdefinedPercentage = _calculatePercentage(feature.scenarios.notdefined, feature.scenarios.total);
      feature.scenarios.passedPercentage = _calculatePercentage(feature.scenarios.passed, feature.scenarios.total);
      feature.scenarios.pendingPercentage = _calculatePercentage(feature.scenarios.pending, feature.scenarios.total);
      feature.scenarios.skippedPercentage = _calculatePercentage(feature.scenarios.skipped, feature.scenarios.total);
      suite.scenarios.ambiguousPercentage = _calculatePercentage(suite.scenarios.ambiguous, suite.scenarios.total);
      suite.scenarios.failedPercentage = _calculatePercentage(suite.scenarios.failed, suite.scenarios.total);
      suite.scenarios.notdefinedPercentage = _calculatePercentage(suite.scenarios.notdefined, suite.scenarios.total);
      suite.scenarios.passedPercentage = _calculatePercentage(suite.scenarios.passed, suite.scenarios.total);
      suite.scenarios.pendingPercentage = _calculatePercentage(suite.scenarios.pending, suite.scenarios.total);
      suite.scenarios.skippedPercentage = _calculatePercentage(suite.scenarios.skipped, suite.scenarios.total);
    });
  }

  /**
   * Parse each scenario within a feature
   * @param {object} feature a feature with all the scenarios in it
   * @return {object} return the parsed feature
   * @private
   */
  function _parseScenarios(feature) {
    feature.elements.forEach(scenario => {
      scenario.passed = 0;
      scenario.failed = 0;
      scenario.notdefined = 0;
      scenario.skipped = 0;
      scenario.pending = 0;
      scenario.ambiguous = 0;
      scenario.duration = 0;
      scenario.time = '00:00:00.000';

      scenario = _parseSteps(scenario);

      if (scenario.duration > 0) {
        feature.duration += scenario.duration;
        scenario.time = formatDuration(scenario.duration)
      }

      if (scenario.failed > 0) {
        suite.scenarios.total++;
        suite.scenarios.failed++;
        feature.scenarios.total++;
        feature.isFailed = true;
        return feature.scenarios.failed++;
      }

      if (scenario.ambiguous > 0) {
        suite.scenarios.total++;
        suite.scenarios.ambiguous++;
        feature.scenarios.total++;
        feature.isAmbiguous = true;
        return feature.scenarios.ambiguous++;
      }

      if (scenario.notdefined > 0) {
        suite.scenarios.total++;
        suite.scenarios.notdefined++;
        feature.scenarios.total++;
        return feature.scenarios.notdefined++;
      }

      if (scenario.pending > 0) {
        suite.scenarios.total++;
        suite.scenarios.pending++;
        feature.scenarios.total++;
        return feature.scenarios.pending++;
      }

      if (scenario.skipped > 0) {
        suite.scenarios.total++;
        suite.scenarios.skipped++;
        feature.scenarios.total++;
        return feature.scenarios.skipped++;
      }

      /* istanbul ignore else */
      if (scenario.passed > 0) {
        suite.scenarios.total++;
        suite.scenarios.passed++;
        feature.scenarios.total++;
        return feature.scenarios.passed++;
      }
    });

    feature.externalLinks = _parseExternalLinks(externalLinks, feature.tags);
    feature.isSkipped = feature.scenarios.total === feature.scenarios.skipped;

    return feature;
  }

  /**
   * Parse all the scenario steps and enrich them with the correct data
   * @param {object} scenario Preparsed scenario
   * @return {object} A parsed scenario
   * @private
   */
  function _parseSteps(scenario) {
    scenario.steps.forEach(step => {
      if (step.embeddings !== undefined) {

        step.attachments = [];
        step.embeddings.forEach((embedding, embeddingIndex) => {
          /* istanbul ignore else */
          if (embedding.mime_type === 'application/json' || embedding.media && embedding.media.type === 'application/json') {
            step.text = (step.text ? step.text : []).concat([JSON.parse(embedding.data)]);
          } else if (embedding.mime_type === 'text/plain' || (embedding.media && embedding.media.type === 'text/plain')) {
            step.text = (step.text ? step.text : []).concat([
              _isBase64(embedding.data) ? Base64.decode(embedding.data) :
                embedding.data
            ]);
          } else if (embedding.mime_type === 'image/png' || (embedding.media && embedding.media.type === 'image/png')) {
            step.image = (step.image ? step.image : []).concat(['data:image/png;base64,' + embedding.data]);
            step.embeddings[embeddingIndex] = {};
          } else {
            let embeddingtype = "text/plain";
            if (embedding.mime_type) {
              embeddingtype = embedding.mime_type;
            } else if (embedding.media && embedding.media.type) {
              embeddingtype = embedding.media.type;
            }
            step.attachments.push({
              data: 'data:' + embeddingtype + ';base64,' + embedding.data,
              type: embeddingtype
            });
            step.embeddings[embeddingIndex] = {};
          }
        });
      }

      scenario.externalLinks = _parseExternalLinks(externalLinks, scenario.tags);

      if (step.result.duration) {
        scenario.duration += step.result.duration;
        step.time = formatDuration(step.result.duration)
      }

      if (step.result.status === RESULT_STATUS.passed) {
        return scenario.passed++;
      }

      if (step.result.status === RESULT_STATUS.failed) {
        return scenario.failed++;
      }

      if (step.result.status === RESULT_STATUS.undefined) {
        return scenario.notdefined++;
      }

      if (step.result.status === RESULT_STATUS.pending) {
        return scenario.pending++;
      }

      if (step.result.status === RESULT_STATUS.ambiguous) {
        return scenario.ambiguous++;
      }

      scenario.skipped++;
    });

    return scenario;
  }

  function _parseExternalLinks(externalLinks, tags) {
    if (externalLinks && tags) {
      return externalLinks.map(rule => ({
        type: rule.type,
        links: tags
          .filter(tag => rule.template.test(tag.name))
          .map(tag => ({
            url: rule.url + tag.name.match(rule.template)[1],
            name: tag.name
          }))
        })
      )
    }
    return []
  }

  /**
   * Read a template file and return it's content
   * @param {string} fileName
   * @return {*} Content of the file
   * @private
   */
  function _readTemplateFile(fileName) {
    if (fileName) {
      try {
        fs.accessSync(fileName, fs.constants.R_OK);
        return fs.readFileSync(fileName, 'utf-8');
      } catch (err) {
        return fs.readFileSync(path.join(__dirname, '..', 'templates', fileName), 'utf-8');
      }
    } else {
      return "";
    }
  }

  /**
   * Check if the string a base64 string
   * @param string
   * @return {boolean}
   * @private
   */
  function _isBase64(string) {
    const notBase64 = /[^A-Z0-9+\/=]/i;
    const stringLength = string.length;

    if (!stringLength || stringLength % 4 !== 0 || notBase64.test(string)) {
      return false;
    }

    const firstPaddingChar = string.indexOf('=');

    return firstPaddingChar === -1 ||
      firstPaddingChar === stringLength - 1 ||
      (firstPaddingChar === stringLength - 2 && string[stringLength - 1] === '=');
  }
  /**
   * Format the duration to HH:mm:ss
   *
   * @param {number} ns
   *
   * @return {string}
   */
  function formatDuration(ns) {
    // `moment.utc(#)` needs ms, we now use device by 1000000 to calculate ns to ms
    return moment.utc(durationInMS ? ns : ns / 1000000).format('HH:mm:ss');
  }

  const file = _readTemplateFile(TEMPLATE_HTML).replace("DATA_JSON", JSON.stringify(suite));
  fs.writeFileSync(path.resolve(reportPath, "index.html"), file);
}

module.exports = {
  generate: generateReport
};
