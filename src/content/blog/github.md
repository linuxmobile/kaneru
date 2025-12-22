---
title: "Git Beginner Guide: Configuration Tips and More"
description: "Learn how to effectively configure Git to make the most of its features and simplify your workflow in project development."
tags: [Git]
published: 2022-08-16
---

## Cloning with Personal Access Token (PAT)

Go to [this link](https://github.com/settings/tokens) and generate a new _token_.
We'll use this as our password from now on!

```bash
$ git clone https://github.com/yourusername/your-repo.git
#Username: <yourusername>
#Password: <your_personal_token>
```

## Cloning via git@ (ssh)

👉 For more references: [here](https://gist.github.com/jexchan/2351996) and
[here](https://gist.github.com/oanhnn/80a89405ab9023894df7).

```bash
# Windows // Linux
ssh-keygen -t ed25519 -C "youremail@gmail.com"
# (-C to add a comment)
# Assign a file:
# Linux: $HOME/linuxmobile/.ssh/id_ed25519
# Windows: C:\Users\linuxin\.ssh\id_ed25519
# Set a password :3
eval $(ssh-agent -s)   # Start
ssh-add ~/.ssh/ed25519 # Add the key
```

```bash
# This tells Git who we are. (This is a global configuration, in this case, it's not necessary to configure it in each repository but just once.)
git config --global user.name "First Last"
git config --global user.email "email@gmail.com"
```

If we have more than one account, we'll need to configure it in each
repository.

```bash
git config user.name "Name"
git config user.email "email@gmail.com"
```
