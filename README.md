## The What

NewsClips is an app that summarizes news articles. 

## The Why

With the new age technology, and ubiquitous assimilation of information, the attention span of people has been regressing. Moreover, there are sources, where the same point is made over and over to strategically keep the users on their website for a long time. This app summarizes the news articles into 3-4 sentences, saving time for the user to decide whether they want to read more about it in detail or skip it. 

In the words of William Shakespeare - "Brevity is the soul of Wit".

##  The How

This is a hybrid Next.js + Python app that uses Next.js as the frontend and Flask as the API backend. One great use case of this is that to write Next.js apps that use Python AI libraries on the backend. We integrated an open source python AI library called "Sumy", to summarize the news content. 

The Python/Flask server is mapped into to Next.js app under /api/.

This is implemented using next.config.js rewrites to map any request to /api/:path* to the Flask API, which is hosted in the /api folder.

On localhost, the rewrite will be made to the 127.0.0.1:5328 port, which is where the Flask server is running.

## Getting Started

Assuming you have Nodejs, npm and Python installed in your system:
First, run the following commands in the specified order :

```bash
npm install - #to install all the dependencies for UI
npm run setup - # to install all the dependencies for the server
npm run dev - #to concurrently run the server and the UI
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on http://127.0.0.1:5328 – feel free to change the port in package.json (you'll also need to update it in next.config.js).

## Deploying on Vercel

Finally, we deployed the app on Versel platform.

[NewsClips](https://news-clips.vercel.app/) - Check it out! 

<img width="1280" alt="image" src="https://github.com/Ramyfi/news-clips/assets/156487372/9724bf6c-a383-4da8-83f5-738a8da0df47">


## References
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Nextjs Flask](https://vercel.com/templates/next.js/nextjs-flask-starter) - learn about nextjs, flask template
- [Sumy AI](https://github.com/miso-belica/sumy/blob/main/README.md) - Python AI Summarization tool
