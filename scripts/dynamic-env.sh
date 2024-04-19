#!/bin/bash

IP_ADDRESS=$(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}')
HOSTNAME="http://$IP_ADDRESS:3000"

echo "Setting the local ip as $HOSTNAME...\n"
export EXPO_PUBLIC_GATEWAY_HOST=$HOSTNAME

# npx expo start
expo run:ios --device