/**
 * Created by Haoan Wang on 15/11/18.
 */
var _ = require('lodash'),
    config = require('../config'),
    mongoose = require('mongoose'),
    chalk = require('chalk');

// global seed options object
var seedOptions = {};

function removeUser (user) {
    return new Promise(function (resolve, reject) {
        var User = mongoose.model('User');
        User.find({ username: user.username }).remove(function (err) {
            if (err) {
                reject(new Error('Failed to remove local ' + user.username));
            }
            resolve();
        });
    });
}

function saveUser (user) {
    return function() {
        return new Promise(function (resolve, reject) {
            // Then save the user
            user.save(function (err, theuser) {
                if (err) {
                    reject(new Error('Failed to add local ' + user.username));
                } else {
                    resolve(theuser);
                }
            });
        });
    };
}

function checkUserNotExists (user) {
    return new Promise(function (resolve, reject) {
        var User = mongoose.model('User');
        User.find({ roles: user.roles }, function (err, users) {
            if (err) {
                reject(new Error('Failed to find local account ' + user.username));
            }

            if (users.length === 0) {
                resolve();
            } else {
                //reject(new Error('Failed due to local account already exists: ' + user.username));
            }
        });
    });
}

function reportSuccess (password) {
    return function (user) {
        return new Promise(function (resolve, reject) {
            if (seedOptions.logResults) {
                console.log(chalk.bold.red('Database Seeding:\t\t\tLocal ' + user.username + ' added with password set to ' + password));
                console.log(chalk.bold.red('Please use following username and password to login '));
                console.log(chalk.bold.red('username: ' + user.username));
                console.log(chalk.bold.red('password: ' + password));


            }
            resolve();
        });
    };
}

// save the specified user with the password provided from the resolved promise
function seedTheUser (user) {
    return function (password) {
        return new Promise(function (resolve, reject) {

            var User = mongoose.model('User');
            // set the new password
            user.password = password;

                checkUserNotExists(user)
                    .then(saveUser(user))
                    .then(reportSuccess(password))
                    .then(function () {
                        resolve();
                    })
                    .catch(function (err) {
                        reject(err);
                    });

        });
    };
}

// report the error
function reportError (reject) {
    return function (err) {
        if (seedOptions.logResults) {
            console.log();
            console.log('Database Seeding:\t\t\t' + err);
            console.log();
        }
        reject(err);
    };
}

module.exports.start = function start(options) {
    // Initialize the default seed options
    seedOptions = _.clone(config.seedDB.options, true);

    // Check for provided options
    if (_.has(options, 'logResults')) {
        seedOptions.logResults = options.logResults;
    }

    if (_.has(options, 'seedUser')) {
        seedOptions.seedUser = options.seedUser;
    }

    if (_.has(options, 'seedAdmin')) {
        seedOptions.seedAdmin = options.seedAdmin;
    }

    if (_.has(options, 'seedSuperAdmin')) {
        seedOptions.seedSuperAdmin = options.seedSuperAdmin;
    }

    var User = mongoose.model('User');
    return new Promise(function (resolve, reject) {

        //var adminAccount = new User(seedOptions.seedAdmin);
        var superAdminAccount = new User(seedOptions.seedSuperAdmin);
        //var userAccount = new User(seedOptions.seedUser);

        User.generateRandomPassphrase()
                .then(seedTheUser(superAdminAccount))
                //.then(User.generateRandomPassphrase)
                //.then(seedTheUser(adminAccount))
                .then(function () {
                    resolve();
                })
                .catch(reportError(reject));
    });
};
