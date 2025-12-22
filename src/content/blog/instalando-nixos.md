---
title: 'NixOS Installation & Configuration Guide'
description: 'Installing NixOS, Home-Manager, Flakes. And how to understand a reproducible configuration'
draft: false
tags: [Linux]
published: 2024-01-26
---

# Understanding Kaku: A NixOS Configuration Guide

![NixOS Configuration Banner](https://i.imgur.com/FmGUopQ.png)

## Overview

This guide explains my personal NixOS configuration, [Kaku](https://github.com/linuxmobile/kaku), designed for a modern desktop environment. Before diving in, you can preview the configuration structure using:

```bash
› nix flake show github:linuxmobile/kaku
github:linuxmobile/kaku/8394cdcfd946c9620d202fec46f5eb625812c826
├───devShells
│   └───x86_64-linux
│       └───default: development environment 'nixland'
├───formatter
│   └───x86_64-linux: package 'alejandra-3.0.0'
├───homeConfiguration: unknown
├───nixosConfigurations
│   └───aesthetic: NixOS configuration
├───nixosModules
│   └───theme: NixOS module
└───packages
    └───x86_64-linux
        ├───biome: package 'biome-1.5.3'
        ├───repl: package 'repl'
        └───wezterm: package 'wezterm-unstable-e3cd2e93d0ee5f3af7f3fe0af86ffad0cf8c7ea8'
```

## Configuration Structure

The configuration is organized into six main directories, each with a specific purpose:

### 1. Directory Layout

```bash filename="Directory Structure"
├── home
│   ├── editors
│   ├── profiles
│   ├── services
│   ├── software
│   ├── terminal
│   ├── default.nix
│   └── specialization.nix
├── hosts
│   ├── aesthetic
│   └── default.nix
├── lib
│   ├── theme
│   ├── default.nix
│   └── repl.nix
├── modules
│   ├── theme
│   └── default.nix
├── pkgs
│   ├── biome
│   ├── repl
│   ├── wezterm
│   └── default.nix
├── system
│   ├── core
│   ├── hardware
│   ├── network
│   ├── nix
│   ├── programs
│   ├── services
│   └── default.nix
├── .envrc
├── flake.lock
└── flake.nix
```

### 2. Home Directory (`home/`)

The `home/` directory manages user-specific configurations using Home Manager:

### Home

```text filename="home/"
| Name                | Description                                             |
| ------------------- | ------------------------------------------------------- |
| default.nix         | Special Home-Manager configuration                      |
| editors             | Helix & VSCode                                          |
| profiles            | Device profiles, configuration entry point              |
| programs            | Programs, media, etc.                                   |
| services            | Services like ags, etc                                  |
| terminal            | Terminal programs, shells, etc                          |
| specialisations.nix | Special Light/Dark configuration                        |
```

- **Editors**: Logically contains the text editors you need.
- **Profiles**: It's recommended to create your own profile and add it to
  `default.nix`. Later you'll link it to the `Host` configuration.
- **Programs/Software**: This section contains general software.
- **Services**: Logically contains services or programs that act as services.
- **Terminal**: Zsh, CLI tools and more.

💡 **Tip**: Create your profile in `profiles/` and link it to your host configuration.

### 3. Host Configuration (`hosts/`)

Each machine gets its own configuration:

```text filename="hosts/"
| Name      | Description                    |
| --------- | ------------------------------ |
| aesthetic | LinuDev's Main Computer        |
```

All hosts share common settings through `modules/core.nix`, with machine-specific configurations in their respective directories.

### 4. Custom Libraries (`lib/`)

Contains utility functions and theme management:

```text filename="lib/"
| Name        | Description                                  |
| ----------- | -------------------------------------------- |
| colors      | Function to handle system colors             |
| default.nix | Module for flake-parts                       |
| repl.nix    | Cool Nix REPL wrapper                        |
| theme       | Program that I reference later               |
```

### 5. Custom Packages (`pkgs/`)

Self-maintained packages:

```text filename="pkgs/"
| Name    | Description                                          |
| ------- | ---------------------------------------------------- |
| biome   | Biome.js, nixpkgs updates too slowly                 |
| repl    | auto-loads system flake in current dir               |
| wezterm | There was a Wayland issue, I fix it here             |
```

### 6. System Configuration (`system/`)

Core system settings:

```text filename="system/"
| Name     | Description              |
| -------- | ------------------------ |
| Core     | Shared configuration     |
| Hardware | Hardware config          |
| Network  | Network config           |
| Nix      | Nix-related              |
| Programs | System software          |
| Services | System services          |
```

- In `core` we find the user configuration, boot configuration (shared across
  all PCs)
- In `hardware` you can change GPU drivers
- In `network` you'll find network-related settings
- In `nix` contains configuration for nh, nixpkgs and more
- In `programs` contains system fonts, home-manager, xdg and more
- In `services` contains system services, localization, pipewire, etc.

Highly recommended: review each folder and see what is necessary and what isn't.

## Fresh Installation Guide

### Prerequisites

- A USB drive with NixOS
- UEFI-capable system
- Basic command line knowledge

### Step-by-Step Installation

1. **Partition the Disk**

   Create three partitions using `gdisk`:
   - EFI (512MB)
   - Root (50GB+)
   - Home (remaining space)

   ```bash
   gdisk /dev/nvme0n1
   # 'o' - create new partition table
   # 'n' - new partition (EFI: type ef00)
   ```

2. **Format Partitions**

   ```bash
   # Format EFI partition
   mkfs.fat -F 32 /dev/nvme0n1p1

   # Format root partition (XFS)
   mkfs.xfs /dev/nvme0n1p2

   # Format home partition
   mkfs.xfs /dev/nvme0n1p3
   ```

3. **Mount Filesystems**

   ```bash
   mount /dev/disk/by-label/NIXOS /mnt
   mkdir -p /mnt/boot
   mount /dev/disk/by-label/EFI /mnt/boot
   ```

4. **Enable Required Tools**

   ```bash
   nix-shell -p nixFlakes git
   ```

5. **Clone Configuration**

   ```bash
   git clone --depth 1 https://github.com/linuxmobile/kaku /mnt/etc/nixos
   ```

6. **Generate Hardware Configuration**

   ```bash
   sudo nixos-generate-config --dir --force /mnt/etc/nixos/hosts/aesthetic
   ```

7. **Install System**

   ```bash
   cd /mnt/etc/nixos
   nixos-install --flake .#aesthetic
   ```

### Post-Installation

After installation:

1. Review the configuration files
2. Customize user settings
3. Rebuild the system to apply changes

## Troubleshooting

If you encounter issues:

- Verify all partitions are mounted correctly
- Check the hardware configuration
- Ensure flake.nix is properly configured
