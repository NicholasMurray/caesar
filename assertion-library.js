const greenColor = "\033[32m";
const redColor = "\033[31m";
const closeColor = "\033[0m";

function test(title, callback) {
  try {
    callback();
    console.log(`👍 ${greenColor}${title}${closeColor}`);
  } catch (err) {
    console.error(`👎 ${redColor}${title}${closeColor}`);
    consoleLogReadableStackTrace(err);
  }
}

function expect(result) {
  return {
    tobe(actual) {
      if (result !== actual) {
        throw new Error(`${result} is not equal to ${actual}`);
      }
    }
  };
}

function consoleLogReadableStackTrace(err) {
  let stacktrace = err.stack;
  stacktrace = stacktrace.split('at').join('👉');

  console.log(`🔴 ${err.message}`);
  err.stack.split('\n').splice(1).map(stackline => {
    consoleLogReadableStackTraceLine(stackline);
  });
}

function consoleLogReadableStackTraceLine(stackline) {
  const STACK_LINE_RE = /(\s*)at\s*([^\s]*)\s*\((.*?):(\d*):(\d*)\)/;
  const STACK_LINE_NO_FN_RE = /(\s*)at\s*(.*?):(\d*):(\d*)/;
  let match = stackline.match(STACK_LINE_RE);

  if (match) {
    printMatch(match);
  } else {
    match = stackline.match(STACK_LINE_NO_FN_RE);

    printMatch(match);
  }
}

function printMatch(match) {
  let fnTitle, filenameTitle, lineNumberTitle, columnTitle, filePathTitle;
  fnTitle = "function";
  filenameTitle = "filename";
  lineNumberTitle = "line";
  columnTitle = "col";
  filePathTitle = "filePath";

  const indent = match[1];
  const fn = match[2];
  const filePath = match[3];
  const filename = match[3].replace(/^.*[\\\/]/, '');
  const lineNumber = match[4];
  const column = match[5];
  let tabsBetweenFunctionAndFileName = "\t\t\t\t";
  let tabsBetweenLineNumberAndColumnNumber = "\t\t";

  // if function name is a certain length
  if (fn.length > 25) {
    tabsBetweenFunctionAndFileName = "\t\t";
  } else if (fn.length > 20) {
    tabsBetweenFunctionAndFileName = "\t\t\t";
  } else if (fn.length > 12) {
    tabsBetweenFunctionAndFileName = "\t\t\t\t";
  } else if (fn.length > 10) {
    tabsBetweenFunctionAndFileName = "\t\t\t\t\t";
  } else {
    tabsBetweenFunctionAndFileName = "\t\t\t\t\t";
  }

  // if line number is a certain length
  if (lineNumber.length > 1) {
    tabsBetweenLineNumberAndColumnNumber = "\t";
  }

  if (filename.includes('module')) {
    let output = "\033[90m   " +
      fnTitle + ":" + fn + tabsBetweenFunctionAndFileName + " " +
      filenameTitle + ":" + filename + "\t " +
      lineNumberTitle + ":" + lineNumber + "\t " +
      columnTitle + ":" + column + tabsBetweenLineNumberAndColumnNumber + " " +
      filePathTitle + ":" + filePath + " " +
      "\033[0m";
    console.log(output);
  } else {
    fnTitle = "\033[31mfunction\033[0m";
    filenameTitle = "\033[31mfilename\033[0m";
    lineNumberTitle = "\033[31mline\033[0m";
    columnTitle = "\033[31mcol\033[0m";
    filePathTitle = "\033[31mfilePath\033[0m";
    console.log(`👉 ${fnTitle}:${fn}${tabsBetweenFunctionAndFileName} ${filenameTitle}:${filename}\t ${lineNumberTitle}:${lineNumber}${tabsBetweenLineNumberAndColumnNumber} ${columnTitle}:${column} \n ${filePathTitle}:${filePath}`);
  }
}

module.exports = {
  test,
  expect
};