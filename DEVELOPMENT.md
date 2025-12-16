# PROPER Development Workflow for Homebridge Plugins

## The Problem We Had

We were:

-   Manually cloning git repos into node_modules ❌
-   Pulling git updates inside node_modules ❌
-   Fighting cache issues at multiple levels ❌
-   No visibility into which code was actually running ❌

This is NOT how Node.js or Homebridge development works.

## The Blessed Way: npm link

This is how ALL Homebridge plugins are developed:

### 1. Set Up Development Environment on Pi

```bash
ssh admin@192.168.1.174

# Uninstall any existing installations
sudo /opt/homebridge/bin/npm uninstall -g @mkellsy/homebridge-lutron

# Create a development workspace
cd /home/admin
mkdir dev
cd dev

# Clone YOUR forks
git clone https://github.com/byule/leap-client.git
git clone https://github.com/byule/homebridge-lutron.git

# Set up leap-client
cd leap-client
/opt/homebridge/bin/npm install
/opt/homebridge/bin/npm run build
sudo /opt/homebridge/bin/npm link

# Set up homebridge-lutron
cd ../homebridge-lutron
/opt/homebridge/bin/npm install
/opt/homebridge/bin/npm link @mkellsy/leap-client  # Link to your local leap-client
/opt/homebridge/bin/node ./build  # Build it
sudo /opt/homebridge/bin/npm link  # Link it globally

# Restart Homebridge
sudo systemctl restart homebridge
```

### 2. Making Changes

Now when you make changes:

```bash
# Update leap-client
cd /home/admin/dev/leap-client
git pull origin main
/opt/homebridge/bin/npm run build

# Rebuild homebridge-lutron (to pick up leap-client changes)
cd /home/admin/dev/homebridge-lutron
/opt/homebridge/bin/node ./build

# Restart Homebridge
sudo systemctl restart homebridge
```

## Why This Works

1. **npm link** creates symlinks - Homebridge loads from `/home/admin/dev/`
2. **No node_modules hacking** - Everything uses proper Node.js module resolution
3. **No cache confusion** - You're editing the actual source that's being loaded
4. **Easy to verify** - Just `ls -la /opt/homebridge/lib/node_modules/@mkellsy/homebridge-lutron`

## Alternative: Install from GitHub (Production-like)

If you want to test as if installing from npm:

```bash
ssh admin@192.168.1.174

# Install from your GitHub
sudo PATH=/opt/homebridge/bin:$PATH /opt/homebridge/bin/npm install -g --force \\
  git+https://github.com/byule/homebridge-lutron.git

# This will automatically install leap-client from GitHub too
# (because package.json points to your fork)

# Restart
sudo systemctl restart homebridge
```

## What We Learned

-   ❌ Don't manually clone into node_modules
-   ❌ Don't git pull inside node_modules
-   ✅ Use `npm link` for development
-   ✅ Use `npm install -g git+https://...` for testing prod-like installs
-   ✅ Always rebuild homebridge-lutron after leap-client changes (esbuild bundling)

## Quick Reference

```bash
# Where things live with npm link:
/home/admin/dev/leap-client/          # Your source code
/home/admin/dev/homebridge-lutron/    # Your source code
/opt/homebridge/lib/node_modules/@mkellsy/leap-client -> /home/admin/dev/leap-client
/opt/homebridge/lib/node_modules/@mkellsy/homebridge-lutron -> /home/admin/dev/homebridge-lutron

# Where Homebridge loads from:
/opt/homebridge/lib/node_modules/@mkellsy/homebridge-lutron/lib/index.js
```

## Why We Had Cache Issues

1. **Git timestamps**: Git pull doesn't update file mtimes by default
2. **Node module cache**: require() caches modules
3. **esbuild bundling**: Homebridge bundles leap-client, so changes require rebuild
4. **Homebridge restart**: Node process needs restart to clear caches

With `npm link`, you're editing the ACTUAL source files that are loaded, so cache issues are minimal.
