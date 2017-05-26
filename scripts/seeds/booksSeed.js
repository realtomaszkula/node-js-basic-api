const jsf = require('json-schema-faker');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

jsf.extend('faker', () => require('faker'));

const fileName = 'booksSeed.json';
const filePath = path.join(__dirname, fileName);

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        faker: 'commerce.productName'
      },
      author: {
        type: 'string',
        faker: 'name.firstName'
      },
      genre: {
        type: 'string',
        pattern: 'sci-fi|fantasy|horror|erotica'
      },
      read: {
        type: 'boolean',
      },
    },
    required: ['title', 'author', 'genre', 'read']
  },
  minItems: 10,
  maxItems: 20
}

async function saveFile() {
  try {
    const generatedSchema = await jsf.resolve(schema);
    const jsonSchema = JSON.stringify(generatedSchema, null, 2);
    fs.writeFileSync(filePath, jsonSchema);
    console.log(chalk.green(`Successfully generated  BooksSchema, saved to ${fileName}`))
  } catch (e) {
    console.log(chalk.red('Cannot generate schema', e))
  }
}

saveFile();
