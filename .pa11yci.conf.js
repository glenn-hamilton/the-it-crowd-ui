const defaults = {
    concurrency: 1,
    standard: 'WCAG2AA',
    timeout: 50000,
    chromeLaunchConfig: {
        args: ['--no-sandbox'],
    },
};

function myPa11yCiConfiguration() {
    const urls = [
        "https://kainos.com",
        "https://9miwn7w3uh.eu-west-1.awsapprunner.com/",
        "https://9miwn7w3uh.eu-west-1.awsapprunner.com/jobs"
    ];

    return {
        defaults: defaults,
        urls: urls,
    };
}

module.exports = myPa11yCiConfiguration();
