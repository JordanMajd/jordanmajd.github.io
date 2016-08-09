---
title: JS Recipes: Game of Life from Scratch
date: 2016-6-20
layout: post.html
description: Use Canvas and Javascript to build Conway's Game of Life from scratch.
---

# JS Recipes: Game of Life from Scratch

- [Project Source Code]().
- [Project Demo]().

## Objectives

By the end of this post you will:

- Understand what Conway's Game of Life is.
- Be able to use Javascript and the Canvas to create Game of Life.

## About

Conway's Game of Life is a zero-player game invented by John Conway, a Cambridge mathematician, and was first published by the [Scientific American in 1970](http://web.stanford.edu/class/sts145/Library/life.pdf). Instead of player inputs determining the outcome, the initial state determines the outcome. The game board is an infinite two-dimensional matrix filled with cells which are either living or dead. A few rules govern what happens to the cells every tick:

1. Living cells with less than two adjacent living cells die.
1. Living cells with greater than three adjacent living cells die.
1. Dead cells with exactly three adjacent living cells come to life.

These few simple rules form a state machine of infinite complexity. The game itself has been proven [Turing complete](https://en.wikipedia.org/wiki/Turing_completeness), meaning any calculation or algorithm can be performed by Game of Life. The game itself has been used across many educational and research fields from biology to physics to computer science.

## Code

## Resources

- [Project Source Code]()
- [Project Demo]()
- [Scientific American: MATHEMATICAL GAMES The fantastic combinations of John Conway's new solitaire game "life"](http://web.stanford.edu/class/sts145/Library/life.pdf)
- [Wikipedia: Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life)
- [Wikipedia: John Horton Conway](https://en.wikipedia.org/wiki/John_Horton_Conway)
- [Wikipedia: Turing Completeness](https://en.wikipedia.org/wiki/Turing_completeness)
