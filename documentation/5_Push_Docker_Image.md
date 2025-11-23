# Pushing Docker Images to Docker Hub

Docker Hub is a public container registry, similar to GitHub but specifically for storing and sharing Docker images. Once an image is pushed to Docker Hub, it can be pulled and used from any machine.

---

## Step 1: Log in to Docker Hub from CLI

Before pushing an image, authentication is required.

```
docker login
```

Enter your Docker Hub **username** and **password**.

---

## Step 2: Create a Repository on Docker Hub

Go to:

```
https://hub.docker.com
```

Create a new repository.
Example repository name:

```
node-app
```

Your full image name becomes:

```
<username>/<repo>
Example: ajayRPG/node-app
```

---

## There Are Two Ways to Push an Image

---

### Method 1: Build the Image Using the Same Name as Your Docker Hub Repository

If you name your image correctly while building, tagging is not needed.

```
docker build -t ajayRPG/node-app .
```

Then push:

```
docker push ajayRPG/node-app
```

This works because the image name already matches the Docker Hub repository name.

---

### Method 2: Build with a Local Name and Then Tag

If you already built an image with a different local name, for example:

```
docker build -t my-app .
```

Trying to push directly:

```
docker push my-app
```

You will get an error because **Docker Hub doesn't know where to push it**.

To fix this, tag the existing image:

```
docker tag my-app ajayRPG/node-app
```

Now push:

```
docker push ajayRPG/node-app
```

---

### Summary Table

| Action                     | Command                              |
| -------------------------- | ------------------------------------ |
| Build with Docker Hub name | `docker build -t ajayRPG/node-app .` |
| Push directly              | `docker push ajayRPG/node-app`       |
| Build with custom name     | `docker build -t my-app .`           |
| Tag before push            | `docker tag my-app ajayRPG/node-app` |
| Push after tagging         | `docker push ajayRPG/node-app`       |

---

### Verify the Image in Docker Hub

Once the push is successful, you can view your uploaded image under:

```
https://hub.docker.com/repository/docker/<username>/<repo>
```

Example:

```
https://hub.docker.com/repository/docker/ajayRPG/node-app
```

---

### Pull the Image From Anywhere

To download and run the image from another machine:

```
docker pull ajayRPG/node-app
```

Then run it:

```
docker run -it -p 3000:3000 ajayRPG/node-app
```

---

## Notes

* The image pushed to Docker Hub will remain until deleted manually.
* If a new version is pushed with the same tag, it will overwrite the existing one.
* Use version tags for production images:

```
docker tag my-app ajayRPG/node-app:v1
docker push ajayRPG/node-app:v1
```

---
