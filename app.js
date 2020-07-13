var profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = function(profileDataArgs) {
    profileDataArgs.forEach(element => {
        console.log(element)
    });
}
printProfileData(profileDataArgs)