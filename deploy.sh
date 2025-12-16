#!/bin/bash
set -e

echo "🔨 Building homebridge-lutron..."
npm run build:prod

echo "📦 Creating package tarball..."
npm pack

TARBALL=$(ls -t *.tgz | head -1)
echo "📦 Created: $TARBALL"

echo "🚀 Deploying to homebridge..."
scp "$TARBALL" admin@homebridge:/tmp/

echo "📥 Installing on homebridge..."
ssh admin@homebridge "sudo systemctl stop homebridge && \
    cd /var/lib/homebridge && \
    sudo /opt/homebridge/bin/npm install --no-save /tmp/$TARBALL && \
    sudo systemctl start homebridge"

echo "🧹 Cleaning up..."
rm "$TARBALL"
ssh admin@homebridge "rm /tmp/$TARBALL"

echo "✅ Deployment complete!"
echo "📋 Check logs: ssh admin@homebridge 'tail -f /var/lib/homebridge/homebridge.log'"
