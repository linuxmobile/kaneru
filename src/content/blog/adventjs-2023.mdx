---
title: 'Solutions for AdventJS 2023 by @Midudev'
description: "I explain how to apply JavaScript logic to solve Katas. Solving AdventJS 2023."
tags: Javascript
date: 2023-12-13
---

## Intro:

    From December 1st to 24th, for the third consecutive year, we are participating in
    @midudev's [AdventJS](https://adventjs.dev/). On this occasion I would like to leave you a small
    review of how I'm solving the exercises. Easy and practical for novices like me ❤️.

## 1: First Repeated Gift!

### Task:

In the North Pole toy factory, each toy has a unique identification number.

However, due to an error in the toy machine, some numbers have been assigned to more than one toy.

Find the first identification number that has been repeated, **where the second occurrence has the smallest index**!

In other words, if there is more than one repeated number, you must return the number whose second occurrence appears first in the list. If there are no repeated numbers, return -1.

```javascript
const giftIds = [2, 1, 3, 5, 3, 2];
const firstRepeatedId = findFirstRepeated(giftIds);
console.log(firstRepeatedId); // 3
// Although both 2 and 3 are repeated
// 3 appears second first

const giftIds2 = [1, 2, 3, 4];
const firstRepeatedId2 = findFirstRepeated(giftIds2);
console.log(firstRepeatedId2); // -1
// It's -1 since no number is repeated

const giftIds3 = [5, 1, 5, 1];
const firstRepeatedId3 = findFirstRepeated(giftIds3);
console.log(firstRepeatedId3); // 5
```

**Note!** The elves say this is a Google technical interview question.

### Solution:

```javascript
// 360 pts
function findFirstRepeated(gifts) {
  return gifts.find((gift, index) => gifts.indexOf(gift) !== index) ?? -1;
}
```

- `findFirstRepeated`: Here we're defining the function. Look, the name is pretty clear, right? It will find the first repeated gift in the list.

- `gifts`: This function expects a list of gifts, which we call `gifts`. Think of this list as a table with all the gifts on top.

- `return`: Now comes the interesting part, the return. Here we're using JavaScript's `find` function. This function goes element by element in the list (gifts) until it finds something that meets the condition we put in the function parameter.

- `(gift, index) => gifts.indexOf(gift) !== index`: Here we're using an arrow function. This line is saying: "For each gift and its index, check if the position of this gift in the list is different from its index. If so, we found a repeated gift".

- `?? -1`: This is a bit of modern JavaScript magic. The `??` is called the nullish coalescing operator, and basically says: "return what's on the left if it's not `null` or `undefined`, otherwise return what's on the right". In this case, if it doesn't find a repeated gift, it returns -1.

_Now, why did I do it this way and what alternatives are there?_

**Efficiency**: Using `find` and `indexOf` is easy to understand, but if you have a very long list, it can be somewhat slow because it has to traverse it multiple times. If you're concerned about efficiency, you could think of faster ways, but sometimes simplicity is key.

**Alternative with `Set`**: You could use a `Set`, which automatically removes duplicates, and then compare the original length with the `Set`'s length. But be careful, the order of the gifts may change.

Defining something like this inside the function:

```javascript
const set = new Set(gifts);
```

In the end, there are several ways to tackle this problem, but it ultimately depends on how big the "party" is and how much efficiency matters to you. I hope the function is clearer now!

## 2: Starting up the Factory

### Task:

In Santa's workshop, the elves have a **gift list** they want to make and a limited set of materials.

The gifts are strings and the materials are characters. Your task is to write a function that, given a list of gifts and the available materials, returns a **list of gifts that can be made**.

A gift can be made if we have all the necessary materials to make it.

```javascript
const gifts = ["tren", "oso", "pelota"];
const materials = "tronesa";

manufacture(gifts, materials); // ["tren", "oso"]
// 'tren' YES because its letters are in 'tronesa'
// 'oso' YES because its letters are in 'tronesa'
// 'pelota' NO because its letters are NOT in 'tronesa'

const gifts = ["juego", "puzzle"];
const materials = "jlepuz";

manufacture(gifts, materials); // ["puzzle"]

const gifts = ["libro", "ps5"];
const materials = "psli";

manufacture(gifts, materials); // []
```

### Solution:

```javascript
function manufacture(gifts, materials) {
  const regex = new RegExp(`^[${materials}]+${"$"}`);
  return gifts.filter(regex.test.bind(regex));
}
```

- `manufacture`: We're passing it two properties or arguments, `gifts` and `materials`. The list of gifts and the materials.
- `const regex = new RegExp(^[${materials}]+${"$"});`: Here's some amazing **magic**. I used a RegEx that checks if the materials are at the beginning of each gift. `^[${materials}]+` means that _"At the beginning of each string (`^`)"_, there must be one or more (`+`) of the available materials. And the `$` indicates that it must be at the beginning and there can't be anything else after.
`return gifts.filter(regex.test.bind(regex))`: We use a `filter`. For each gift, we check with the `RegEx` to see if it matches the materials. If it matches it stays in the list, and if not... We remove it.

An alternative without `RegEx` could be using methods like `startsWith` or `indexOf`. For example:

```javascript
function manufacture(gifts, materials) {
  return gifts.filter((gift) =>
    materials.split("").every((material) => gift.includes(material))
  );
}
```

This function takes care of filtering the gifts with the available materials!

## 3: The Naughty Elf

### Task:

In Santa's workshop, **a naughty elf** has been playing with the toy production line, adding or removing an unplanned step.

You have the original sequence of steps in the original manufacturing and the modified sequence that can include an extra step or be missing a step.

Your task is to **write a function that identifies and returns the first extra step that was added or removed in the manufacturing chain**. If there is no difference between the sequences, return an empty string.

```javascript
const original = "abcd";
const modified = "abcde";
findNaughtyStep(original, modified); // 'e'

const original = "stepfor";
const modified = "stepor";
findNaughtyStep(original, modified); // 'f'

const original = "abcde";
const modified = "abcde";
findNaughtyStep(original, modified); // ''
```

Keep in mind:

- There will always be one step difference or none.
- The modification can occur anywhere in the string.
- The original sequence can be empty

### Solution:

```javascript
function findNaughtyStep(original, modified) {
  const [lessWords, mostWords] = [original, modified].sort((a, b) =>
    a.length - b.length
  );
  return [...mostWords].find((x, i) => lessWords[i] != x) ?? "";
}
```

- `[lessWords, mostWords] = [original, modified].sort((a, b) => a.length - b.length)`:
  In this line we're taking two sequences (`original` and `modified`), putting them in an `array` and sorting them by length. The shortest goes in `lessWords` and the longest in `mostWords`.
- `[...mostWords].find((x, i) => lessWords[i] != x) ?? ""`: In this line,
  we're converting the longer string (`mostWords`) into an array of characters. Then with the `find` method, we look for the first character that's different at the same position in the shorter string (`lessWords`). If we find one, it means that's the "naughty" step. If not, we return an empty string.

## 4: Reverse the Parentheses

### Task:

In Santa's workshop 🎅, some Christmas messages have been written in a peculiar way: **the letters inside parentheses should be read backwards**

**Santa needs these messages to be properly formatted.** Your task is to write a function that takes a text string and reverses the characters inside each pair of parentheses, removing the parentheses in the final message.

However, keep in mind that there can be nested parentheses, so you should reverse the characters in the correct order.

```javascript
const a = decode('hola (odnum)') console.log(a) // hola mundo

const b = decode('(olleh) (dlrow)!') console.log(b) // hello world!

const c = decode('sa(u(cla)atn)s') console.log(c) // santaclaus

// Step by step:
// 1. Reverse the nested -> sa(ualcatn)s
// 2. Reverse what's left -> santaclaus
```

Notes:

- The input strings will always be well formed with properly matched parentheses, you don't need to validate them.
- There shouldn't be any parentheses in the final message.
- The maximum nesting level is 2.

### Solution:

```javascript
function decode(message) {
  while (message.includes("(")) {
    const startIndex = message.lastIndexOf("(");
    const endIndex = message.indexOf(")", startIndex);

    const start = message.slice(0, startIndex);
    const middle = [...message.slice(startIndex + 1, endIndex)].reverse();
    const end = message.slice(endIndex + 1, message.length);
    message = start + middle.join("") + end;
  }
  return message;
}
```

- `while (message.includes('(')) { ... }`: This `while` loop will execute as long as there are parentheses in the message. It's a way to handle nested parentheses.
- `const startIndex = message.lastIndexOf("(")` and
  `const endIndex = message.indexOf(")", startIndex)`: These lines find the position of the last opening parenthesis and the position of the closing parenthesis.
- `const start = message.slice(0, startIndex)`: `start` is the part of the message before the pair of parentheses we're processing.
- `const middle = [...message.slice(startIndex + 1, endIndex)].reverse()`:
  `middle` is the part between the parentheses. We use `slice` to get this part and `reverse` to reverse the characters inside the parentheses. Using `[...]` converts the string to an array, to be able to use the `reverse` method.
- `const end = message.slice(endIndex + 1, message.length)`: `end` is the part of the message after the pair of parentheses we're processing.
- `message = start + middle.join("") + end`: Here we're reconstructing the message. We concatenate the three parts (start, reversed part, and end) and update `message`.
- `return message`: When there are no more parentheses, the function returns the decoded message.

## 5: Santa's Cybertruck

### Task:

Santa 🎅 is testing his new electric sleigh, the _CyberReindeer_, on a North Pole road. The road is represented by a string of characters, where:

- `.` = Road
- `S` = Santa's Sleigh
- `*` = Open barrier
- `|` = Closed barrier

Example road: `S...|....|.....`

Each unit of time, **the sleigh advances one position to the right.** If it encounters a closed barrier, it stops until the barrier opens. If it's open, it goes straight through.

**All barriers start closed**, but after 5 units of time, they all open **forever**.

**Create a function that simulates the sleigh's movement** for a given time and **returns an array** of strings representing the state of the road at each unit of time:

```javascript
const road = 'S..|...|..' const time = 10 // time units const result =
cyberReindeer(road, time)

/* -> result: [ 'S..|...|..',
// initial state '.S.|...|..',
// sleigh advances on the road '..S|...|..',
// sleigh advances on the road '..S|...|..',
// sleigh stops at the barrier '..S|...|..',
// sleigh stops at the barrier '...S..._..',
// barrier opens, sleigh advances '..._S.._..',
// sleigh advances on the road '..._.S._..',
// sleigh advances on the road '..._..S*..',
// sleigh advances on the road '...*...S..',
// advances through the open barrier] */
```

The result is an **array where each element shows the road at each unit of time.**

Keep in mind that **if the sleigh is in the same position as a barrier**, then it takes its place in the array.

_The elves were inspired by this Code Wars challenge._

### Solution:

```javascript
function cyberReindeer(road, time) {
  let s = 0;
  const result = [road];
  road = road.replace("S", ".");

  const roadString = {
    5: road.replaceAll("|", "*"),
  };

  const roadDelay = {
    ".": 1,
    "*": 1,
    "|": 0,
  };

  for (let i = 1; i < time; i++) {
    road = roadString[i] ?? road;
    s += roadDelay[road[s + 1]];
    result.push(
      `${road.substring(0, s)}S${road.substring(s + 1)}`,
    );
  }
  return result;
}
```

- `let s = 0`: Where `s` is the current position of the sleigh on the road.
- `const result = [road]`: We start a `result` array with the first road configuration.
- `road = road.replace('S', '.')`: We replace the initial sleigh position with a point, so the sleigh can advance.
- `const roadString = { 5: road.replaceAll('|', '*'), }`: After 5 time units, we change all **closed barriers** (`|`) to **open barriers** (`*`). We store this in `roadString`.
- `const roadDelay = { ... }`: We establish delay times for different types of roads.
- `for (let i = 1; i < time; i++) { ... }` We start a loop that simulates time.
  - This loop simulates the passage of time from `i=1` to `time-1`. In each loop iteration, we represent a unit of time.
- `road = roadString[i] ?? road`: If we reach a moment when barriers need to change, we do it.
  - Here we check if at the current moment `i` there exists a special road configuration (`roadString[i]`). If it exists, we update the `road` variable with that configuration; otherwise, we maintain the current configuration.
- `s += roadDelay[road[s + 1]]` We calculate the new sleigh position based on the type of road in the next position.
  - `s` is the current sleigh position in the road string. We're updating `s` according to the elapsed time and road type. `road[s+1]` is the type of road in the next position. `roadDelay[road[s+1]]` gives us the delay time associated with that type of road, which we then add to the current position `s`. With this we simulate the sleigh's movement.
- `result.push(${road.substring(0, s)}S${road.substring(s + 1)})`: We store the new road state in the `result` array, with the sleigh moved to the correct position.
  - We create a new string that represents the current state of the road after updating the sleigh's position. We use `substring` to split the original string (`road`) into three parts: from the start to `s`, the sleigh (`S`), and from `s+1` to the
