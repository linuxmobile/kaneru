---
title: 'How I solved adventjs 2022. By @Midudev'
description: "I explain how to apply JavaScript logic to solve Katas. Solving AdventJS 2022."
tags: Javascript
date: 2023-09-16
---

![](https://i.imgur.com/dwPWbws.png)

## Intro:

	From December 1st to 24th 2022 I participated in @midudev's [AdventJS](https://adventjs.dev/).
	Although it's late to write a "how I did this task", it helps me refresh some
	practices, and also prepare for AdventJS 2023. Here I share how I solved the
	Exercises.

## Wrapping Christmas Gifts:

### Problem:

This year the elves bought a gift wrapping machine. But... it's not
programmed! We need to create an algorithm to help it with the task.

The machine is passed an array with the gifts. Each gift is a string.
We need the machine to wrap each gift in wrapping paper and place it
in an array of wrapped gifts.

The wrapping paper is the `*` symbol and to wrap a gift you place the
`*` symbol so that it completely surrounds the string on all sides. For
example:

```javascript
const gifts = ["cat", "game", "socks"];
const wrapped = wrapping(gifts);

console.log(wrapped);
/* [
		"*****\n*cat*\n*****",
		"******\n*game*\n******",
		"*******\n*socks*\n*******"
] */
```

As you can see, the wrapping paper wraps the string. Above and below, to not
leave any gaps, the corners are also covered by the wrapping paper.

Note: The `\n` character represents a line break.

Watch out! Make sure you put the right number of `*` to wrap the string completely.
But not too many. Only those needed to cover the string.

Also, don't modify (mutate) the original array.

### Solution:

```javascript
wrapping = (gifts) =>
		gifts.map((gift) => {
				let wrapped = "*".repeat(gift.length + 2);
				return `${wrapped}\n*${gift}*\n${wrapped}`;
		});
```

_The function is not complex, however, for a new person it might seem
confusing, so let's break it down and explain step by step._

This function takes a single argument called `gifts`, which is expected to be an
array of strings representing the gifts we want to wrap. Then,
it uses the `map()` method to process each element of the array and return a
new array with the wrapped gifts.

- `gifts.map(gift => { ... })`: This part of the function uses the `map()`
		method to iterate through each element of the `gifts` array. In each iteration,
		the provided function executes as an argument, taking a gift
		(`gift`) as parameter.

- `let wrapped = "*".repeat(gift.length + 2)`: In this line, it calculates the
		number of **asterisks** needed to wrap the gift. To do this,
		it uses the `repeat()` function, which creates a string of asterisks `\*`
		repeated as many times as **the length of the gift plus 2**. The "+ 2" is because
		we need **two additional asterisks** at the beginning and end of the
		gift for the wrapping effect.

- `return ${wrapped}\n*${gift}*\n${wrapped}`: This is the part where the
		wrapped representation of the gift is created. It uses a template
		literal to concatenate the different parts. We have:
		- `${wrapped}`: This represents the line of asterisks that forms the
				top and bottom of the wrapped gift.
		- `\n`: This adds a line break to separate the top line from the
				next.
		- `*${gift}*`: Here, the original gift (`gift`) is surrounded by asterisks
				to give it the wrapping effect.

Now if we do a `console.log()`, we can get a result similar to
this:

```
********
*Book*
********
```

## Nobody wants to work overtime:

### Problem:

A millionaire has bought a social network and it doesn't bring good news. He has announced
that **every time a workday is lost due to a holiday**, it will have to be compensated with
**two extra hours another day that same year**.

Obviously the people who work at the company haven't been too happy and are
**preparing a program that tells them the number of extra hours they would do**
in the year if the new rule was applied.

Since it's office work, their working hours are **Monday to Friday**. So you only
need to worry about the holidays that fall on those days.

Given a year and an array with the dates of the holidays, return the number of
extra hours that would be done that year:

```javascript
const year = 2022;
const holidays = ["01/06", "04/01", "12/25"]; // format MM/DD

// 01/06 is January 6th, Thursday. Counts.
// 04/01 is April 1st, a Friday. Counts.
// 12/25 is December 25th, a Sunday. Doesn't count.

countHours(year, holidays); // 2 days -> 4 extra hours in the year
```

Things to keep in mind and tips:

- The year may be a leap year. Make the checks you need for this, if necessary.
- Although December 31st is a holiday, extra hours will be done the same year and not the following.
- The `Date.getDay()` method returns the day of the week of a date. 0 is Sunday, 1 is Monday, etc.

### Solution:

```javascript
countHours = (year, holidays) => {
		const days = holidays.map((holiday) =>
				new Date(`${year}/${holiday}`).getDay()
		);
		return days.filter((day) => day > 0 && day < 6).length * 2;
};
```

**Function Parameters:**

- `year`: This parameter represents the year for which we want to calculate the
		number of work hours. For example, if we pass `2023` as an argument, the
		function will calculate the work hours for that year.

- `holidays`: This is an array containing the dates of holidays in
		the specified year. These dates must be provided in `MM/DD` format. For
		example, ["01/01", "12/25"] would represent New Year's and Christmas.

**Function Breakdown:**

- `const days = holidays.map(holiday => new Date(${year}/${holiday}).getDay())`:
		In this line, the function takes the array of holidays and uses the `map()`
		method to transform each date into a day of the week (0 for Sunday, 1
		for Monday, etc.) using the `new Date()` function. These days are stored
		in a new array called `days`.

- `return days.filter(day => day > 0 && day < 6).length * 2`: This is the part
		where the calculation of work hours is done. First, it uses
		the `filter()` method to remove any day that is equal to 0
		(Sunday) or greater than 5 (Saturday), since these are generally non-working days
		in many parts of the world. Then, it calculates the length of the resulting array,
		which represents the number of working days, and multiplies by 2 to get the number
		of work hours, assuming a standard 8-hour workday.

_To finish, we could do a `console.log()`_

```javascript
console.log(`In ${year}, there are ${hoursOfWork} work hours.`);
```

and it would return us the work hours for this year.

## How many gift boxes can Santa carry?

### Problem:

You have a box of Christmas gifts that Santa Claus wants to deliver to the
children. **Each gift is represented by a string**. Santa Claus has a
sleigh that can carry a **limited weight**, and each gift inside the box
has a weight that equals the number of letters in the gift's name.

Santa Claus also has a list of reindeer that can help him deliver the
gifts. Each reindeer has a **maximum weight limit** it can carry. The
maximum weight limit of each reindeer is **equal to twice the number of letters in
its name**.

Your task is to implement a `distributeGifts(packOfGifts, reindeers)`
function that receives a box of gifts and a list of reindeer and returns the maximum
number of gift boxes that Santa Claus can deliver to the children. **Gift
boxes cannot be divided**.

```javascript
const packOfGifts = ["book", "doll", "ball"];
const reindeers = ["dasher", "dancer"];

// the pack of gifts weighs 4 + 4 + 4 = 12
// reindeers can carry (2 * 6) + (2 * 6) = 24
// therefore, Santa Claus can deliver 2 boxes of gifts

distributeGifts(packOfGifts, reindeers); // 2
```

Things to keep in mind:

- **Gift boxes cannot be divided.**
- **The names of gifts and reindeer will always be greater than 0.**

### Solution:

```javascript
distributeGifts = (packOfGifts, reindeers) =>
		((reindeers.join("").length * 2) / packOfGifts.join("").length) >> 0;
```

**Function Parameters:**

`packOfGifts`: This parameter is an array that represents a package of
gifts. Each element of the array is a gift to be distributed among the
reindeer.

`reindeers`: This parameter is an array that contains the names of the reindeer
that will participate in the distribution of gifts.

**Function Breakdown:**

`reindeers.join("").length`{lang="js"}: This part of the function joins the reindeer
names into a single string and then calculates the length of that
string. This basically gives us the total number of letters in the reindeer
names.

`packOfGifts.join("").length`{lang="js"}: Similar to the previous step, here all the
elements of the gift package are joined into a single string and its length is
calculated. This will give us the total number of letters in the gift
names.

`* 2`{lang="js"}: The result from step 1 is multiplied by 2. This doubles the number of
letters in the reindeer names.

`/`{lang="js"}: Then, the result from step 3 is divided by the result from step 2. This
will give us a ratio indicating how many times the length of the reindeer
names is greater than the length of the gift names.

`>> 0`{lang="js"}: Finally, the right shift operator (>>) is used with a value of 0
to truncate any decimal part of the result. This converts the result to an
integer, meaning we're interested in how many times the reindeer names are
longer than the gift names, without worrying about fractions.
