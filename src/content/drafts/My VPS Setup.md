---
title: My VPS Setup
description: Personal production VPS setup
published: true
publishedAt: 2024-10-04
---
## Create non-root user

First, Create new user with `adduser` and follow the instruction:
```bash
adduser user_name_here
```
Give newly created user a sudo permission
```bash
usermod -aG sudo user_name_here
```
We can then test this out by log into newly created user & run some sudo command
```bash
su - user_name_here
sudo ls /
```

## Setting up Domain Name

To do this, we can go to our domain DNS settings. This will be different depending on the domain registrar. For example here we use Cloudflare.

In your domain DNS settings, create new `A` record that point to our VPS IP address. We need to wait for some minutes-hours for the DNS to be updated.
![[assets/dns-a-server.png]]

When the DNS is already updated, you can SSH to your server by using it's domain name instead of IP Address.
```bash
ssh user_name_here@domain.com
```

## Update SSH Server Config
We want to do few things here:
- Make sure new non-root user has access to SSH public key
- Disable password authentication & root login 

To give copy of our SSH public key to the new non-root user, we can use `ssh-copy-i` command from our local machine. Unfortunately, this command only available on Linux & MacOS. If you use windows you can try other option, or even better do all of this inside WSL.
```bash
ssh-copy-id user_name_here@100.100.10.10
```
![[assets/ssh-copy-id-usage.png]]

Then we can test it by SSH directly with non-root user.

Next, we want to disable password auth & root login. We can do that by making change in the OpenSSH server config.
```bash
sudo nano /etc/ssh/sshd_config
```

Here, we need to make these few change:
- Set `PasswordAuthentication` to `no`
- Set `PermitRootLogin` to `no`
- Set `UsePAM` to `no`

Also, check for files in the `/etc/ssh/sshd_config.d/` directory. If there any files here, we need to also update it accordingly with the same change.

We can then apply the changes
```bash
sudo systemctl reload ssh
```

## Setup Docker
For detailed instruction, follow steps-by-steps presented in the official documentation. If you use Ubuntu or other Debian based distro, you can see the instruction [here](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).

## Others
That's it for the standard steps. From this point onward, it should be project-specific setup. Like installing Node.js, running the container, etc.

Also, if you need a local Indonesia VPS for testing & learning, you can try [Nevacloud](https://nevacloud.com/?ref=rulasfia) (affiliate link) which offer a lot of server option in a competitive price. 