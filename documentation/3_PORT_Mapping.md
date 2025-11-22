
# Why Does the Application Not Run on `localhost:3000` When Using Docker?

When running an application inside a Docker container, you may notice that accessing `http://localhost:3000` in the browser does not work, even though the app is running inside the container.

The reason is that **the Docker container acts as a separate isolated environment**, similar to another machine.
Your laptop or workstation is called the **Host Machine**, while the Docker container is an **isolated container environment**.

So, when the application runs inside Docker and listens on `localhost:3000`, it is referring to:

```
localhost (inside the container) ≠ localhost (on your host machine)
```

Because of this isolation, services running inside the container cannot be accessed directly from the host.

---

## How to Access the Application?

To allow your host machine to access a port running inside a Docker container, you must perform **port mapping**. This exposes a port from the container to a port on the host.

Example command:

```
docker run -it -p 3000:3000 my-app
```

### Meaning of Port Mapping:

| Part            | Meaning                                                    |
| --------------- | ---------------------------------------------------------- |
| `-p`            | Enables port mapping                                       |
| `3000` (first)  | Port on the host machine (your system)                     |
| `3000` (second) | Port inside the container where the application is running |

So this mapping links:

```
Host Machine Port 3000  --->  Container Port 3000
```

After running the above command, you can now open:

```
http://localhost:3000
```

in your browser and access the application running inside the container.

---

## Summary

* Docker containers are isolated environments and do not share host networking by default.
* Applications running in a container cannot be accessed from the host unless port mapping is used.
* Using `-p hostPort:containerPort` exposes the container port to the host.

---
