# Docker: Running Containers, Port Mapping, and EXPOSE 

When running applications inside a container, networking becomes important because the container is isolated from the host machine. To allow access to applications running inside a container, Docker provides options such as `EXPOSE`, `-p`, and `-P`.

---

### 1. Using EXPOSE in Dockerfile

In the Dockerfile, we can specify which ports the container will use:

```
EXPOSE 8000
```

This tells Docker that the application inside the container will listen on port `8000`.
It does not publish the port automatically but acts as documentation and helps tools understand networking.

---

### 2. Running the Container with Automatic Port Mapping

After defining `EXPOSE`, we can run the container using:

```
docker run -it -P my-app
```

Meaning of flags:

| Flag     | Purpose                                                         |
| -------- | --------------------------------------------------------------- |
| `-i`     | Interactive mode                                                |
| `-t`     | Allocates a terminal                                            |
| `-P`     | Automatically maps exposed ports to random available host ports |
| `my-app` | Docker image name                                               |

Docker will automatically choose a random high-level port from the host and map it to `8000` inside the container.

To view the assigned port:

```
docker ps
```

Example output:

```
PORTS
0.0.0.0:49155 -> 8000/tcp
```

This means you will access the app from:

```
localhost:49155
```

---

### 3. Exposing Multiple Ports

Multiple ports can be exposed in the Dockerfile:

```
EXPOSE 3000 8000
```

You can also expose a range:

```
EXPOSE 8000-8009
```

This informs Docker that your application may use all of these ports.

---

### 4. Explicit Port Mapping vs. Automatic Port Mapping

There are two ways to expose ports when running a container:

#### Automatic mapping (using `-P`):

```
docker run -it -P my-app
```

Docker picks random host ports.

#### Manual mapping (using `-p`):

```
docker run -it -p 3000:3000 my-app
```

Here:

* The first `3000` refers to the **host machine**
* The second `3000` refers to the **container**

You will then access the app using:

```
localhost:3000
```

---

### 5. Running in Attached vs Detached Mode

You can combine networking options with execution modes.

#### Attached mode:

```
docker run -it -p 3000:3000 my-app
```

The terminal stays attached and shows logs.

#### Detached mode:

```
docker run -itd -p 3000:3000 my-app
```

Detached mode runs the container in the background and returns only a container ID.

You can view logs later:

```
docker logs <container-id>
```

Stop the container manually:

```
docker stop <container-id>
```

---

### Summary Table

| Option              | Defined In | Purpose                                               |
| ------------------- | ---------- | ----------------------------------------------------- |
| `EXPOSE`            | Dockerfile | Documents port usage, used by `-P`                    |
| `-P`                | docker run | Automatically maps exposed ports to random host ports |
| `-p Host:Container` | docker run | Manually maps ports for predictable access            |
| `-it`               | docker run | Run interactively with terminal                       |
| `-d`                | docker run | Run container in background                           |
| `--rm`              | docker run | Deletes container after it stops                      |

---

### Practical Best Practice

Use `EXPOSE` for clarity and automation, but in real development and production:

```
docker run -d -p 3000:3000 my-app
```

This ensures predictable port access.

---

