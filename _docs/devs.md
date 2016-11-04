# Trussle Blog - Developers' Guide

The Trussle Blog a [Jekyll](https://jekyllrb.com/) blog hosted on [Github Pages](https://pages.github.com/).

## Setting up the Development Environment

You'll need Ruby. First, let's get set up:

```
gem install jekyll bundler
git clone git@github.com:trussle/blog.git
```

You should only need to run this once. Whenever you want a server, just run:

```
jekyll serve
```

This command detects changes in your files, so you should only need to run this at the start of your session (or if you want to make configuration changes).

## A Brief Tour

This is mainly a bog-standard Jekyll blog, so the Jekyll docs should be able to help you most of the time.

Here are a few things that are a bit special about the Trussle Blog:

### trussle-style

The style of the blog is based on [trussle-style](https://github.com/trussle/trussle-style). **It is a static version:** if you want to upgrade, you will need to do it manually. See the [README in the trussle-style](../trussle-style/README.md) for more information.

## Deployment

Deployment is done via a push to the `master` branch; Github Pages does the rest of the work.
