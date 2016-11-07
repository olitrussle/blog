# Trussle Blog - Authors' Guide

The Trussle Blog is a static website powered by a bunch of technologies:

- [Markdown](http://kirkstrobeck.github.io/whatismarkdown.com/) is a way of writing text files that makes writing documents easy, but also makes generating web pages easy. (This article is written in Markdown!)
- [Jekyll](https://jekyllrb.com) is a static blog generator that uses Markdown for its articles.
- Jekyll is hosted on [Github Pages](https://pages.github.com/), which hosts Jekyll blogs free.
- [prose.io](http://prose.io/) is a website that allows you to manage a Jekyll blog.

This guide will cover how to get started with the Trussle Blog, how to write and edit articles, and where to go if you get stuck.

## Getting started

The easiest way to manage the Trussle Blog is via [prose.io](http://prose.io/), an online tool for Jekyll blog management.

To start, you'll need a [Github account](https://github.com/join) and you'll need to be part of the [Trussle team on Github](https://github.com/trussle) (a developer should be able to let you in).

Once you are part of the Trussle team, you'll be able to see and edit the blog. Head to [prose.io](http://prose.io/) and *authorise on Github*. Once this is done, you should be taken to a list of *repositories* (collections of code), one of which will be called *blog*.

> Sometimes *blog* isn't immediately obvious. If you can't find it, [click here](http://prose.io/#trussle/blog) or save `http://prose.io/#trussle/blog` to your favourites.

## Writing posts

You'll be happy to hear that you don't have to worry about most of the files and folders you see in the blog; the one authors care about is `_posts`, which is where all blog posts are stored.

There are a couple of things that immediately stick out if you're more familiar with [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editors like Microsoft Word or Wordpress:

### File names are important

Your file name **must** be of the format `YYYY-MM-DD-the-title.md`; if it isn't, it will be ignored. For example, `2016-01-01-happy-new-year.md` is a valid file name, but `hello-world.md` is not.

If the post is in the `_posts` directory, the direct link to the blog will be `https://trussle.com/blog/the-title`. 

If a post is in a subfolder, the link will be relative to that subfolder. For example, if a post is stored in `_posts/subfolder/2016-01-01-article.md` the direct link will be `https://trussle.com/blog/subfolder/article`.

### Posts are written in Markdown

[Markdown](http://kirkstrobeck.github.io/whatismarkdown.com/) is a pure text format that uses special symbols to format your post. The prose.io toolbar gives you help with headings, links and images, or you can click on the *Help* button for more information. A full Markdown reference is available [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Something worth highlighting is that **HTML snippets are OK**: if you have a Twitter widget or some other HTML snippet, you can add them to your articles without an issue.

Also, **don't add the title to the article:** that's covered by *metadata*…

### Posts have metadata

We consider the words you write as the data; everything else is *metadata*, including (but not limited to) the title, author, publish date, and so on.

Metadata is powerful because it allows you to control things about a particular blog post. One of the most useful features is the ability to publish and unpublish posts through metadata.

Metadata can be changed via the *Metadata* button on the right-hand toolbar of prose.io. Jekyll refers to this metadata as *front matter*, and they provide a [guide to built-in front matter](https://jekyllrb.com/docs/frontmatter/) on their website. 

When adding metadata, **make sure to use double quotes ("") for values:** `author: "John Smith"` is good; `author: John Smith` is bad.

Here's a handful of metadata that you may find useful:

- **`layout: post`** should be in all post metadata. This tells Jekyll to use the `post` page layout for styling.
- **`title`**: this is mandatory, and is the title used in both the post page and the summary.
- **`published`:** **`true` (default)** or `false`. Shows or hides a post on the blog.
- **`excerpt`:** This should be the summary that you'd like to see in summaries. If one is not given, the first two sentences of the blog post will be used.
- **`author`:** The name of the author.
- **`author_twitter`:** The Twitter handle (with quotes) of the author. If left blank, the author's name is not a link.
- **`thumbnail_filename`:** The name of a file, with the file extension, in `post_images` that should be resized for use in the summary. (Square images work best here.)
- **`social_image_filename`:** The name of a file, with the file extension, in `post_images` that should be used in social shares of the page. [Files should be 1024×512px.](https://blog.bufferapp.com/ideal-image-sizes-social-media-posts)

### Posts are published by default

If you read the last section carefully you already know this, but it's worth mentioning again: **if you don't have `published: false` in your metadata, your post *will* be published.** You have been warned.

### prose.io's previewer is awful

The `preview` directory can be used to preview posts without putting them on the index page. To do this, just move or create files in the `preview` directory (it's at the same level as `_posts`, or you can [click here](http://prose.io/#trussle/blog/tree/master/preview) to go to it).

If you use the preview directory, bear in mind the following:

- Posts will need to be *published* before they can be seen. (i.e. `published: true` will need to be in the metadata.)
- Posts can be accessed via `trussle.com/blog/preview/file-name` - *with* the date, but *without* the `.md` extension. For instance, if you have a file called `2011-01-01-hello-world.md`, you would access it at `trussle.com/blog/preview/2011-01-01-hello-world`.

## Images

### Uploading images

prose.io has a built-in image uploader, but:

1. It puts it in a place that won't work when users come via `trussle.com/blog`.
2. It doesn't allow you to float images to the left or right of text easily.
3. It doesn't allow you to specify captions easily.

However, with a few tweaks we can make it work!

First things first, upload the image. prose.io allows you to this, but will put images in the `_posts` directory. **Do not upload images to the `_posts` directory:** it doesn't work. Instead, change the URL to **`images/post_images/`**`your-image-name.ext`.

### Full-size images

**By default, images will span the width of the page.** You should check whether your image looks good on mobile and desktop browsers before publishing.

### Positioned images and captions

If you want to:
- position your image to the left, right or in the center
- you want to add a caption to an image

then **you should remove the link that's added by prose.io** and use one of the following lines of code instead:

```
{% include image/left.html filename="YOUR_IMAGE_NAME" caption="CAPTION" %}
{% include image/right.html filename="YOUR_IMAGE_NAME" caption="CAPTION" %}
{% include image/center.html filename="YOUR_IMAGE_NAME" caption="CAPTION" %}
```

For `image/left` and `image/right`, text will flow alongside the image. `url` is mandatory and should include the file extension (like `foo.png`); `caption` is optional. `filename` should just be the name of the image.

### Cropping and resizing images

There are no tools to crop or resize images on prose.io - you'll have to do this resizing on your own computer.

The maximum size of the content section is **800px**. Please don't add images any more than 800px in width - they'll just get resized to 800px and will take longer to load.

## FAQs

Here are some answers to commonly asked questions:

### How do I align text?

Ideally, *don't*: the basic styles through Markdown should be enough. If you feel there's a style you need, then talk to a developer. 

If one isn't to hand, you *can* use CSS styles inline, but it's not recommended because it may not play nicely with existing styles (which have been tested on multiple browsers and screen sizes).
