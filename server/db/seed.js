const db = require('../server/') // does this need a forward / ?
const { User, Category, Cheese, Purchase } = require('../db/models')

const chalk = require('chalk')
const Chance = require('chance')
const chance = new Chance()



function createUser() { // when do you use chance vs. 
    return User.build({
        name: grievanceNames(10),
        email: grievanceEmails(10),
        password: chance.avatar({protocol: 'http'}),
        description: chance.paragraph(),
        active: true,
        companyId: chance.integer({min: 1, max: 25}),
        thumbnailId: chance.integer({min: 1, max: 5})
    });
}

Use chance in a custom function if you need to clean up or modify its data.

function grievanceTitles(num) {
    let counter = 0;
    const wordArr = [];

    while (counter < num) {
        wordArr.push(chance.word());
        counter++;
    }

    return wordArr.join();
}

Write a set of functions to run your createModel() functions. Please remember: Sequelize returns promises. Use Promise.all() or Bluebird's Promise.map() to work with them.

// Build promise array from each createModel() function

function makeModelArray(instanceType, num) {
    let counter = 0;
    const instanceArr = [];

    while (counter < num) {
        instanceArr.push(instanceType());
        counter++;
    }

    return instanceArr;
}

// Save instances after running your createModel() function

function addDataToDb(makeThisData, num) {
    return Promise.map(makeModelArray(makeThisData, num), instance => instance.save());
}

// Run your seed functions

function runSeed() {
    return addDataToDb(createCompany, 25)
        .then(() => {
            return addDataToDb(createThumbnail, 5);
        })
        .then(() => {
            return addDataToDb(createGrievance, 50);
        })
        .then(() => {
            return addDataToDb(createSecond, 50);
        })
        .catch(err => {
            console.error('runSeed() error');
            console.error(err.stack);
        });
}


// Sync db, invoke runSeed(), then close db

db.sync({force: true})
    .then(() => {
        console.log('Seeding db');
        return runSeed();
    })
    .then(() => {
        console.log('DB seeded');
    })
    .catch(err => {
        console.error('Error seeding');
        console.log(err.stack);
    })
    .finally(() => {
        db.close();
        return null;
    }); 