import Jasmine from 'jasmine';
import reporter from './config/reporter';

// https://jasmine.github.io/2.6/node.html
const jasmine = new Jasmine();

jasmine.addReporter(reporter);
jasmine.loadConfigFile('spec/config/jasmine-unit.json');
jasmine.execute();
