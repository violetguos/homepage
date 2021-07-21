---
title: "How virtual hiring transformed the coding interview process"
date: "2021-03-25"
coverImage: "./cover.jpg"
category: ["interview"]
---

TLDR: unfortunately, virtual hiring is far from perfect and it does not fix many problems tech has had for years.

## Intro

When coding interviews were conducted on a whiteboard or a text editor, the process focused more on your thinking process than the final result.

If you've read Gayle L. MacDowell's CTCI, you know that she said

> It's absolutely true that you'd struggle with writing perfect code on a white board. Fortunately, your interviewer doesn't expect that. Virtually everyone has some bugs or minor syntactical errors.

However, today I'm here to break it to you that it's not the case anymore. The interview process has become more fixated on bugs and minor syntactical errors than ever after the interview process has become 100% virtual.

## Whiteboard alternative #1: no human in the loop coding challenge

This is when a recruiter sends you an invite. You'd usually have 1 to 2 hours to complete 2 to 6 problems. At the end, the coding platform will evaluate your code against hidden test cases and generate a score. The entire process is fully automated end to end and involves zero human in the loop.

## Whiteboard alternative #2: interviewer + online compiler

While you're on a video call, you'd code on an online IDE + compiler. The interviewer would expect you to communicate and also deliver a working solution.

Let's summarize

| Format                         | Communication                              | Code Evaluation                  | Fault tolerance                      |
| ------------------------------ | ------------------------------------------ | -------------------------------- | ------------------------------------ |
| 1. Whiteboard                  | required                                   | You will walk through it by hand | Small syntactical errors are allowed |
| 2. Coding challenge            | not required. candidate works in isolation | fully automated                  | None                                 |
| 3. Interview + online compiler | required                                   | fully automated                  | None                                 |

## I'm personally skeptical of interviewing format 3. Here's why.

**Reason 1: Research has shown that it's very difficult to focus on communication and correctness at the same time.**

It's trying to kill two birds with one stone, aka evaluate the communication in a whiteboard interview and technical correctness in an automated test environment. This interview is essentially trying to merge behaviour and technical screens into one giant interview.

Source 1: Gayle from CTCI

> Whiteboards also tend to encourage candidates to speak more [...]. When a candidate is given a computer, their communication drops substantially.

The inability to balance the two in fact stems from our psychological and behaviour traits. It's not because a particular candidate can't communicate. This format is not a fair mechanism to judge both at the same time.

**Reason 2: the workplace rarely functions like interviewing format #3**

For developers, you mostly code by yourself and attend larger meetings to explain the big picture of your technical project.

The closest to interviewing format #3 IRL is pair programming. However, no one in a real pair programming scenario plays the role of interviewers. It's a lot of looking up Stackoverflow, checking documentations, and trying different solutions together. Other developers usually don't (and shouldn't!) watch you struggle with trivial things such as syntax and not offering to help.

IRL we work with a plethora of programming languages and it's common to forget some trivial syntax. Why would you select your future co-workers by simulating an unrealistic working environment with your candidates?

**Reason 3: Focus solely on results**

Both interview #2 and #3 focus solely on the results. Particularly in interview format #3, interviewers have access to the results from online IDEs. Their judgement would strongly favour candidates who solved the coding problem and put less emphasis on the communication component. Some companies even make it explicit that they focus on the compilation result.

Proposed solution

- Use a text editor instead of an online compiler
- Separate type #3 interviews into 2 separate rounds. One purely technical and one purely behaviour.

## Conclusion

The tech interview process is broken and [everyone knows it](<[https://www.wsj.com/articles/tech-companies-say-they-cant-find-good-employees-the-companies-may-be-the-problem-11615212029](https://www.wsj.com/articles/tech-companies-say-they-cant-find-good-employees-the-companies-may-be-the-problem-11615212029)>). The remote working/interviewing process did not fix it. It's time for us to introspect and slim down the interview process. An efficient interviewing process attracts talent and shows respect to both current and future employees.
