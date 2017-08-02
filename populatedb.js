#! /usr/bin/env node

console.log('This script populates a some test categories, and reports to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
var Category = require('./app/models/category');
var Report = require('./app/models/report');


var Promise = require('bluebird');
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { promiseLibrary: Promise });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = Promise;

var cats = [
    {
        ledgerAccount: "610000",
        name: "Advertising/Marketing",
        description: "Expenses related to the use of advertising/marketing"
    },
    { ledgerAccount: "600100", name: "Air Fare", description: "Airfare, baggage, passport, visa fees, etc." },
    { ledgerAccount: "630800", name: "Bistro Supplies", description: "Supplies purchased for the Bistro" },
    {
        ledgerAccount: "610800",
        name: "Cell Phone Expense",
        description: "Expenses related to the usage of cell phones for business purposes"
    },
    {
        ledgerAccount: "610710",
        name: "Demonstrator Supplies",
        description: "Supplies purchased for demonstrator shows"
    },
    { ledgerAccount: "630200", name: "Education", description: "Tuition, trainings, and seminars" },
    {
        ledgerAccount: "630600",
        name: "Employee Relations",
        description: "Company parties, movie passes, employee awards, etc."
    },
    {
        ledgerAccount: "600200",
        name: "Ground Transportation",
        description: "Car rental, train, tolls, gas, subway, etc."
    },
    {
        ledgerAccount: "600200",
        name: "Ground Transportation – Mileage",
        description: "Mileage reimbursement for personal car"
    },
    { ledgerAccount: "600300", name: "Hotel", description: "Lodging, Wi-Fi, dry cleaning, etc." },
    {
        ledgerAccount: "600000",
        name: "Meals & Entertainment",
        description: "Business and traveler’s meals, gratuities"
    },
    {
        ledgerAccount: "500231",
        name: "Office Supplies",
        description: "Office pens, paper, post-it notes, envelopes, etc."
    },
    { ledgerAccount: "670000", name: "Postage & Shipping", description: "Stamps, etc." },
    { ledgerAccount: "610500", name: "Printing", description: "Marketing collateral, other printed materials" },
    {
        ledgerAccount: "680400",
        name: "Product Testing and Certification",
        description: "UL listing service, int'l product compliance, certification of the company’s products both domestic and internationally"
    },
    {
        ledgerAccount: "500200",
        name: "Production Supplies",
        description: "Supplies purchased for the production department"
    },
    { ledgerAccount: "750700", name: "R&D General Supplies", description: "General supplies used in R&D" },
    { ledgerAccount: "750800", name: "R&D Project Supplies", description: "Supplies purchased for a specific project" },
    {
        ledgerAccount: "650500",
        name: "Repairs & Maintenance – Equipment",
        description: "Expenses related to repairing and maintaining equipment"
    },
    {
        ledgerAccount: "650600",
        name: "Repairs & Maintenance – Office",
        description: "Expenses related to repairing and maintaining the offices"
    },
    { ledgerAccount: "680550", name: "Software/License/IT Services", description: "Amazon, Google, web support, etc." },
    {
        ledgerAccount: "680500",
        name: "Subscriptions/Dues",
        description: "Organization dues, trade publications, industry association dues, etc."
    },
    { ledgerAccount: "720000", name: "Tax & License", description: "Food handler’s permit, business licenses, etc." },
    {
        ledgerAccount: "610400",
        name: "Tradeshow",
        description: "Expenses directly related to tradeshows, booth, registration fees and electrical"
    }
];
var categories = [];
var reports = [
    {
        created: Date('2017-01-01'),
        startDate: Date('2016-12-15'),
        endDate: Date('2016-12-31')
        // expenses:[
        //     {
        //         created: Date('2017-01-01'),
        //         amount: 500.0,
        //         description: 'expense 1',
        //         category: categories[0].id,
        //         image: '',
        //         merchant: 'expense merchant',
        //         expenseDate: Date('2016-12-30')
        //     },
        //     {
        //         created: Date('2017-01-01'),
        //         amount: 1500.0,
        //         description: 'expense 2',
        //         category: categories[1].id,
        //         image: '',
        //         merchant: 'expense merchant',
        //         expenseDate: Date('2016-12-30')
        //     },
        //     {
        //         created: Date('2017-01-01'),
        //         amount: 2500.0,
        //         description: 'expense 3',
        //         category: categories[2].id,
        //         image: '',
        //         merchant: 'expense merchant',
        //         expenseDate: Date('2016-12-30')
        //     }
        // ]
    }
];

function categoryCreate(c) {
    var category = new Category(c);
    return category.save()
}

function reportCreate(r) {
    var report = new Report(r);
    return report.save()
}

function createCategories() {
    return Promise.all(cats.map(function (c) {
        return categoryCreate(c);
    }));
}


function createReport() {
    return Promise.all(reports.map(function (r) {
            reportCreate(r);
        })
    );
}

Promise.all([
    createCategories()
])
    .then(function (s) {
        console.log('create categories success');
        mongoose.connection.close();
        process.exit();
    })
    .catch(function (err) {
        console.log('create categories err', err);
        mongoose.connection.close();
        process.exit();
    });


