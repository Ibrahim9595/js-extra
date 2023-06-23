const axios = require("axios");
const moment = require("moment/moment");

const getTotal = (items) => {
  let sum = 0;

  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    sum += element.amount;
  }

  return sum;
};

const convertDate = (items) => {
  const newItem = [];

  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    newItem[index] = {
      ...element,
      day: moment(new Date(element.day)).format("YYYY-MM-DD"),
    };
  }

  return newItem;
};

const groupByDay = (items) => {
  const group = {};

  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    if (group[element.day]) {
      group[element.day] += element.amount;
    } else {
      group[element.day] = element.amount;
    }
  }

  return group;
};

const mergeObjects = (sales, expenses) => {
  const res = {};
  const keys = Object.keys(sales);

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const sale = sales[key];
    const expense = expenses[key];

    res[key] = sale - expense;
  }

  return res;
};

const getAsync = async () => {
  try {
    const [sales, expenses] = await Promise.all([
      axios.get("http://localhost:3000/sales").then((res) => res.data),
      axios.get("http://localhost:3000/expenses").then((res) => res.data),
    ]);

    const convertedExpenses = convertDate(expenses);
    const groupedExpenses = groupByDay(convertedExpenses);
    
    const convertedSales = convertDate(sales);
    const groupedSales = groupByDay(convertedSales);

    console.log(mergeObjects(groupedSales, groupedExpenses));
  } catch (error) {
    console.log(error);
  }
};

getAsync();
console;

