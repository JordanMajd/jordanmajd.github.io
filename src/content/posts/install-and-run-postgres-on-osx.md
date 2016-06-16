---
title: Install and Run Postgres on OSX
date: 2015-12-16
layout: post.html
description: Installation, configuration and scripting Postgres server on OSX
---


This article covers installation the postgres server on OSX. It discusses how to launch the server in the foreground from the terminal or in the background as a daemon / agent. In addition, it discusses how to connect to the server with the `psql` command.


## Installing

Install Postgres via Homebrew. If you don't have Homebrew installed or know what it does I suggest you, [check it out.](http://brew.sh/)

```bash
brew update
brew install postgres
```

This command will install Postgres into your `/usr/local ` directory and adds the following directories:

 - `/usr/local/var/postgres` is where the database and logs are stored
 - `/usr/local/opt/postgresql` contains a `.plist` file which contains some metadata about how to launch Postgres.

## Running

In order to access a PostgreSQL database, the postgres server needs to be running.

We can run the server in the foreground by using the `postgres` command:

```bash
postgres -D /usr/local/var/postgres
```

The `-D` argument tells `postgres` where the database is.

In another terminal window we can now access the database with the `psql` command.

```bash
psql
```

(Remember if you want to exit `psql` you can quit by typing `\q` and then enter or just press `ctrl + d`)

The problem with running the postgres server in the foreground is it needs to be ran in a terminal - and the terminal needs to stay open. If for some reason the terminal closes or the connection to the terminal stops then the postgres server shuts down.

This is why it is recommended to launch the postgres as a daemon. A daemon is a program that runs in the background, sometimes for long periods of time, that doesn't interact with the user. The postgres server works great as a daemon, because it will keep running until told to stop or the computer is shut down. The best part is, we don't need to have an extra terminal window open.

There are two ways to run the postgres server as a daemon on OSX, automatically and manually.

### Automatically running the Postgres server as a daemon

If desired, the postgres server can be configured to launch as a deamon in the background every time the user signs in:

```bash
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

Let's talk about what each of these commands does so we understand why it runs automatically.

`ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents`

Here is an explainshell breaking down the [ln -svf](http://www.explainshell.com/explain?cmd=ln+-sfv+%2Fusr%2Flocal%2Fopt%2Fpostgresql%2F*.plist+~%2FLibrary%2FLaunchAgents) command.

This takes the `.plist` file in `/usr/local/opt/postgressql` and creates a symbolic link in the `~/Library/LaunchAgents` directory.

A symbolic link creates a reference to a file, this allows the file seem like it is in many different locations but is only in one. Here we `/usr/local/opt/postgressql`, but the computer also thinks it is also at another URI, `~/Library/LaunchAgents`. If the file is modified in either spot, it will modify the original file.

`launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist`

`launchctl` is what OSX uses to load daemons and agents in the background. It is used to manage the computers networking, voice over, USB and other long running processes.

We can see a list of everything `launchctl` is running by issuing the command:

```bash
launchctl list
```

When a user signs in, `launchctl` reads all the `.plist` files in the directory `~/Library/LaunchAgents`. It will see the symbolic link from the `ln` command and read postgres' `.plist` file. It will use this data to start the postgres server as a daemon in the background.

The command, `launchctl load` loads the `.plist` file and starts the daemon immediately, this way the user doesn't have to logout and back in.

Since the server is running as a daemon we can now connect to it via our application or the `psql` shell:

```bash
psql
```

(Remember if you want to exit `psql` you can quit by typing `\q` and then enter or just press `ctrl + d`)

#### Stopping Postgres from Automatically Launching

If you configured the postgres server to auto launch and you don't want it to, it only takes a couple of steps.

First, unload the daemon, this will stop the process in the background as well:

```bash
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

Then remove the symbolic link that was made with the `ln` command. This way, `launchctl` doesn't start the postgres server the next time the user logs in.

```bash
unlink ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

### Manually Run The Postgres Server as a Daemon

You can manually start Postgres server as a daemon with the `launchctl` command. However, it is recommended to use `pg_ctl` instead,

```bash
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```

or stop it:

```bash
pg_ctl -D /usr/local/var/postgres stop -s -m fast
```

These commands are hard to remember, looks like a great opportunity to turn into a script:

```bash
#create startpostgres.sh
echo "#!/bin/bash" > startpostgres.sh
echo "g_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start" >> startpostgres.sh

#create stoppostgres.sh
echo "#!/bin/bash" > stoppostgres.sh
echo "pg_ctl -D /usr/local/var/postgres stop -s -m fast" >> stoppostgres.sh

#set them as executable
chmod 744 ./startpostgres.sh
chmod 744 ./stoppostgres.sh
```

Finally, run the scripts and open up a shell to the server:

```bash
./startposgres.#!/bin/sh
psql
```

(Remember if you want to exit `psql` you can quit by typing `\q` and then enter or just press `ctrl + d`)
