#!/bin/bash

# Run adb devices command and filter the output to get the connected devices
devices=$(adb devices | awk '$2 == "device" {print $1}')


# Check if any devices are connected
if [ -z "$devices" ]; then
    echo "No devices found."
    exit 1
fi

# Check the number of connected devices
device_count=$(echo "$devices" | wc -l)

# If there is only one device, automatically select it
if [ "$device_count" -eq 1 ]; then
    device="$devices"
else
    # Prompt the user to select a device
    echo "Connected devices:"
    select device in $devices; do
        if [ "$device" ]; then
            break
        else
            echo "Invalid selection. Please try again."
        fi
    done
fi

echo "Selected device: $device"

yarn android device:$device
