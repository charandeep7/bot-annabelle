const date = new Date();
const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
const timeOffset = 5 + 30 / 60;
const year = new Date(utcTime + 3600000 * timeOffset).toLocaleDateString({}).split('/')[2];

module.exports = {
    year
}