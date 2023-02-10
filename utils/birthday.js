require("dotenv").config();

const birthdays = new Map();
birthdays.set(process.env.KITISH_ID, { month: 'Sep', day: 7, status: 2022 });
birthdays.set(process.env.MAYANK_ID, { month: 'Feb', day: 26 , status: 2022});
birthdays.set(process.env.ANIRUDH_ID, { month: 'Aug', day: 31, status: 2022 });
// birthdays.set(process.env.ABHISHEK_ID, { month: 'Aug', day: 1, status: 2022 });
// birthdays.set(process.env.SHUBHAM_ID, { month: 'Aug', day: 1, status: 2022 });
birthdays.set(process.env.ARYAN_ID, { month: 'Sep', day: 11, status: 2022 });
// birthdays.set(process.env.AYUSH_KAMAL_ID, { month: 'Aug', day: 1, status: 2022 });
// birthdays.set(process.env.VIKRANT_ID, { month: 'Aug', day: 1, status: 2022 });
// birthdays.set(process.env.VIKRANT_2_ID, { month: 'Aug', day: 1, status: 2022 });

module.exports = {
    birthdays
}