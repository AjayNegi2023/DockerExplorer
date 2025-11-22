
## 1. Introduction to Docker

Docker is a containerization technology used to package applications with all required dependencies so they run consistently across different environments.
A Docker container is lightweight and isolated but shares the host operating system kernel, unlike Virtual Machines (VMs) which include a full OS.

---

## 2. What is a Dockerfile?

A Dockerfile is a configuration file that contains step-by-step instructions for building a Docker image.
The Docker engine reads the Dockerfile and builds an image based on those instructions.

---

## 3. Dockerfile Used in This Setup

```
FROM ubuntu

RUN apt-get update
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt install -y nodejs

COPY index.js /home/app/index.js
COPY package-lock.json /home/app/package-lock.json
COPY package.json /home/app/package.json

WORKDIR /home/app

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
```

---

## 4. Explanation of Dockerfile Instructions

| Instruction                         | Meaning                                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| `FROM ubuntu`                       | Specifies the base image to start from. In this case, Ubuntu Linux.                             |
| `RUN apt-get update`                | Updates package lists inside the image.                                                         |
| `RUN apt install -y curl`           | Installs curl. The `-y` flag auto-confirms prompts.                                             |
| `RUN curl ...`                      | Downloads Node.js setup script.                                                                 |
| `RUN bash /tmp/nodesource_setup.sh` | Runs the downloaded script to register Node.js repository.                                      |
| `RUN apt install -y nodejs`         | Installs Node.js in the container.                                                              |
| `COPY file destination`             | Copies files from the host machine into the container filesystem.                               |
| `WORKDIR /home/app`                 | Sets a working directory for following commands.                                                |
| `RUN npm install`                   | Installs dependencies inside the container.                                                     |
| `EXPOSE 3000`                       | Indicates that the container will use port 3000. (Informational; does not open port by itself.) |
| `CMD [...]`                         | Specifies the default command to run when the container starts.                                 |

---

## 5. Building the Docker Image

Command:

```
docker build -t mynodeapp .
```

Explanation:

| Part           | Meaning                                           |
| -------------- | ------------------------------------------------- |
| `docker build` | Creates a Docker image based on the Dockerfile.   |
| `-t mynodeapp` | Assigns the name "mynodeapp" to the built image.  |
| `.`            | Means the Dockerfile is in the current directory. |

---

## 6. Running the Docker Container

Command:

```
docker run --name nodecontainer -p 3000:3000 mynodeapp
```

Explanation:

| Option                 | Meaning                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `docker run`           | Runs a new container from an image.                                      |
| `--name nodecontainer` | Assigns a readable name to the container.                                |
| `-p 3000:3000`         | Maps host port 3000 to container port 3000. This enables browser access. |
| `mynodeapp`            | The image being used to create the container.                            |

Without port mapping, the server will run inside the container but cannot be accessed from the host machine.

---

## 7. Useful Docker Commands

| Command                     | Description                                   |
| --------------------------- | --------------------------------------------- |
| `docker images`             | Lists all available images.                   |
| `docker ps`                 | Lists running containers.                     |
| `docker ps -a`              | Lists all containers, including stopped ones. |
| `docker stop nodecontainer` | Stops a running container.                    |
| `docker rm nodecontainer`   | Deletes a stopped container.                  |
| `docker rmi mynodeapp`      | Deletes an image.                             |
| `docker logs nodecontainer` | Shows the logs of a container.                |

---

## 8. Summary

1. Write a Dockerfile defining environment and steps.
2. Build the Docker image using `docker build`.
3. Run the image as a container using `docker run`.
4. Expose and map ports to access the running application externally.

