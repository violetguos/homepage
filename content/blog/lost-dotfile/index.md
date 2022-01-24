---
title: "Dotfiles to Notfiles"
date: "2022-01-24"
coverImage: "./cover.png"
category: ["tech"]
---

## I accidentally nuked all of my dotfiles.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I decided to organize my dot files. I ran some rando’s script on Stackoverflow and it ended up overwriting my files…. The symlink was buggy 🙃📉</p>&mdash; Violet Guo (@YVioletGuo) <a href="https://twitter.com/YVioletGuo/status/1466527787339104264?ref_src=twsrc%5Etfw">December 2, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Let me explain. I finally decided to back up my dotfiles properly. I found a seemingly straightforward Bash script that

1. moves your current dotfiles from your root directory to a designated directory, aka your dotfile repo. Now this repo will become the source of truth. It is also tracked by Git.
2. creates symlink at your root directory, which links to your dotfile repo.

What could possibly go wrong? This random script I found wasn't _idempotent_. It failed but did not stop processing the rest of my files in the background. When I tried to run it again, it overwrote the links that were already linked with the link itself, and the originl dotfiles were lost.

Thankfully, I did stash my dotfiles somewhere. I proceeded with caution and there're so many ways to go about dotfile mgmt.

1. write your own shell script. I don't trust myself at this point...
2. use a git [bare](https://www.ackama.com/what-we-think/the-best-way-to-store-your-dotfiles-a-bare-git-repository-explained/) repo. TBH I really didn't understand the whole rationale behind it.
3. install someone's pkg via a pkg mgmer. but what if the author abandons the project?
4. finally, I found the dotbot

## Dotbot

- it lives with your dotfile repo as a submodule. worst case scenario, the authoer abandons the project, and you just keep one working copy of it
- it's deisgned to be idempotent. I value this design especially after my dotfile disaster.
- if you want a more detailed tutorial, try [the official guide](https://github.com/anishathalye/dotbot) or [this blog post](https://www.elliotdenolf.com/posts/bootstrap-your-dotfiles-with-dotbot)

I finally have a pretty basic dotfile setup. It's been years and I can't believe [no one taught this in university](https://missing.csail.mit.edu/2020/command-line/).

## Speedround

Taken from one of the dotfile [repos](https://github.com/webpro/dotfiles/tree/master/config/thefuck) I found.

<!-- ![the frustration is real]() -->
<img src="./frustration.png" width="200" height="200">
The frustration is real. End.
