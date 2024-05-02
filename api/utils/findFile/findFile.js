const path = require("path");
const fs = require("fs").promises;

const searchFile = async () => {
    try {
        let requiredPath = path.join(__dirname, "../../.en");
        await fs.access(requiredPath); // Using fs.promises.access() to check file existence
        console.log(".env File exists");
        return true;
    } catch (error) {
        console.log(".env File Does Not exist inside api folder");
        return false;
    }
};

module.exports = searchFile;