---
title: "Tips for techical interviews"
date: "2021-04-21"
coverImage: "./cover.jpg"
category: ["tech"]
---

After going through technical interviews for small, medium, large companies in the post corona world, I've noticed enough differences that I felt I ought to inform my fellow leetcoders. I also wanted to follow up on my last post and provide some tips.

## Choose your adventure

I categorize the companies in tech into the following:

1. Small startups. They have less than 50 employees.
2. Medium companies. They just IPOed or are about to IPO.
3. Big companies. Think FAANG et al.

## Small startups

- Work on the specific stacks for their business
  - e.g. web: Ruby on Rails or PhP, (almost) never a mix
  - e.g. ML: pytorch or tensorflow
- They will ask you to work on a take home assignment with their specific stack
- They don't care about fluff. Can you do what they do? That's all they want to know.

## Medium companies

- They quiz you with coding problems like Leetcode easy, but much longer.
- They expect you to read a very long prompt and apply your data structures.
  - They almost never ask candidates to program a data structure from scratch.
- You need to know the common data structures, but with little to no emphasis on algorithm
  - using the language of your choice, be well versed in the language's following libraries
    - heap
    - priority queue
    - stack
    - queue
    - set
    - hash map
    - array
    - basic string manipulation methods
- The coding problem emphasizes application
  - You need to know basic SWE principles
  - Write classes, not just a global function
- The coding challenge is usually done via an online coding platform, whether proctored or not. Some popular platforms are:
  - coderpad
  - hackerrank pairing
  - hackerrank solo challenges

## Big companies

I had relatively less experience with typical FAANG interviews described in popular books such as CTCI. Here's my takeaway.

- You need to grind Leetcode easy, medium, and hard.
- Brush up on obscure data structures
  - trie
  - set
  - graph
  - linked list
  - tree
- Emphasis on the algorithm part
  - dynamic programming
  - graph, tree traversal
  - recursion
  - backtracking
  - matrix manipulation
  - Tip:
    - Watch youtube tutorials, then proceed to code.
    - Don't stare at leetcode for hours on end
    - Best Youtube channel I found while deep diving in Leetcode's comment section
      - [https://www.youtube.com/channel/UCmJz2DV1a3yfgrR7GqRtUUA](https://www.youtube.com/channel/UCmJz2DV1a3yfgrR7GqRtUUA)
- Less emphasis on your syntax
  - Caution: this has changed due to remote hiring. See disclaimer/FAQ below.
- System design
  - if you are a new grad, you gotta power through it
    - I personally think it's not reasonable to test new grads on this. Assuming that new grads had internships during their studies, I can tell you with great confidence that no company would ever let an intern touch production stuff. If they do, they're in trouble.
  - Watch these youtube channels
    - [https://www.youtube.com/channel/UCRPMAqdtSgd0Ipeef7iFsKw](https://www.youtube.com/channel/UCRPMAqdtSgd0Ipeef7iFsKw)
    - [https://www.youtube.com/channel/UCZLJf_R2sWyUtXSKiKlyvAw](https://www.youtube.com/channel/UCZLJf_R2sWyUtXSKiKlyvAw)
  - if you don't have time, here's a must watch
    - [https://www.youtube.com/watch?v=UzLMhqg3_Wc](https://www.youtube.com/watch?v=UzLMhqg3_Wc)

## Disclaimer/FAQ

### Is syntax important?

- It's not supposed to be the point.
- In the past, with whiteboard interviewing, as long as you have retained around 90% of the syntax, it's a pass
  - e.g. in Python, to test whether a character is a number, is it `char.isnumber()`? or is it `char.isnumeric()`? doesn't matter. You get the gist of it.
- Unfortunately, with remote hiring, it's no longer the case.
  - Some companies started using interview platforms with built in compilers.
  - The platforms are sometimes not crafted with the flexibility we need.
  - You have to prepare for that. If you can't beat them, join them. Welcome to the leetcode grind.

### Which language do I choose?

Ideally,

- the one you're familiar with
- the one that's popular in general

**in that order**.

### Has not knowing a particular programming language backfired?

- Of course, based on my personal experience below.
- Small companies
  - They don't have the time to onboard you.
  - They don't care for CS generalists. They need someone here to work with their tech stack ASAP.
  - They usually advertise with a specific tech stack and fully expect candidates knowing their stack.
- Big companies
  - During my interview with one of the As of FAANG, the online coding challenge only allowed C, C++, or Java.
  - I know C and C++, but I used them so long ago that I couldn't possibly complete 5 coding exercises in 30 minutes.

## Conclusion

With remote hiring, it's more common for companies to automate testing and they care more about your syntactical accuracy. Smaller companies have a different hiring routine. Make sure that you use your time wisely and prepare for the job you want.
