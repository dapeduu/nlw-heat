# NLW Heat

NLW is a big event from rocketseat, where they teach some especific technologies in a week.
So my plan is to make it more fun, by using Docker, and other things I find interesting.

## Nodejs

On the node path, I first needed a way to initialize the project, without acctually installing nodejs in my machine.

So I came up with this command:

```zsh
docker run --name nodenv --rm -it --entrypoint bash -v `pwd`:/app -w /app node:lts
```

It basically runs a container based on the lts image of node, and sync my workdir with the container. After that I was able to use yarn and node without problems. Acctually with one problem, every file generated inside the container has a different user group. So I have to take the ownership with shown outside the container.

After a while I needed to add postgres as database. So its the docker-compose time. I just want to register that the postgres host needs to be equal to the postgres service name on docker-compose.

Here I noticed that I should have started with compose, since I was going to use it anyway, and we can attach shells to the running containers.
