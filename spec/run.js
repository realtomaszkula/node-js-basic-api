import Jasmine from 'jasmine';
import JasmineConsoleReporter from 'jasmine-console-reporter';


// https://github.com/onury/jasmine-console-reporter
const reporter = new JasmineConsoleReporter({
    colors: 1,           // (0|false)|(1|true)|2
    cleanStack: 1,       // (0|false)|(1|true)|2|3
    verbosity: 4,        // (0|false)|1|2|(3|true)|4
    listStyle: 'indent', // "flat"|"indent"
    activity: false
});

// https://jasmine.github.io/2.6/node.html
const jasmine = new Jasmine();

jasmine.addReporter(reporter);
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();
