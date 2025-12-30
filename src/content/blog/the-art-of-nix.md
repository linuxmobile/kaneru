---
title: 'NixOS: A Developer-First Linux System'
description: 'How Nix and NixOS could change the future of Linux. All the benefits for a developer and much more.'
draft: false
tags: [Linux]
published: 2024-01-26
---

## Introduction to Nix and NixOS

**Nix** is a powerful declarative package manager that enables users to define their system's desired state through configuration files. The declarative approach means you specify _what_ you want rather than _how_ to achieve it. We'll explore Nix's capabilities in detail throughout this guide.

**NixOS** is a Linux-based operating system built on the Nix package manager. It embraces three core principles: declarative configuration, system reproducibility, and reliable system management.

## NixOS Core Features

### Declarative System Configuration

- NixOS implements a "configuration as code" approach, allowing you to define your entire system state in version-controlled configuration files. This enables tracking, managing, and restoring your system to any previous state, provided you maintain your configuration history.

- **Nix Flakes**, a modern feature of the ecosystem, enhances reproducibility by introducing a deterministic dependency management system. Similar to `package-lock.json` in the Node.js ecosystem, the `flake.lock` file captures precise versions, source information, cryptographic hashes, and dependency relationships, ensuring consistent system builds across different environments.

### System Customization and Component Management

NixOS offers seamless system component management through its declarative configuration system:

- System components can be modified, replaced, or reconfigured through straightforward configuration changes, eliminating traditional package management complexity.
- Desktop environment switching (between KDE, GNOME, Hyprland, LeftWM, etc.) is handled cleanly and predictably, with automatic dependency management.

Unlike traditional Linux distributions, where changing desktop environments often leads to dependency conflicts and leftover packages, NixOS manages these transitions cleanly. The system automatically handles:

- Dependency resolution
- Package removal
- Configuration management
- System integration

For example, switching desktop environments requires only a simple configuration change:

```nix title="configuration.nix" del={4} ins={5}
# replace plasma5 with gnome
xserver = {
  enable = true;
  desktopManager.plasma5 = {
  desktopManager.gnome = {
    enable = true;
  };
}
```

### System Rollback Capabilities

NixOS implements a robust system versioning mechanism that enables reliable system state restoration. During boot, GRUB presents a chronological list of system configurations, allowing you to:

- Boot into any previous system state
- Verify system changes safely
- Recover from unsuccessful configurations

Example GRUB menu:

```bash title="GRUB Menu"
# GNU GRUB VERSION 2.02
*NixOS - Configuration 129 (2024-01-23)
*NixOS - Configuration 128 (2024-01-16)
*NixOS - Configuration 127 (2023-11-28)
```

### Dependency Resolution

Traditional package managers often struggle with dependency conflicts, where package installations or removals can break existing system components. Nix eliminates these conflicts through its unique architecture:

- Each package receives a cryptographic hash-based installation path
- Multiple versions of the same package can coexist safely
- Dependencies are isolated and explicitly managed
- System stability is maintained across package changes

### Active Community Ecosystem

The Nix ecosystem benefits from a vibrant and growing community:

- **nixpkgs**: The official package repository maintains comprehensive package coverage through active community contribution
- **Configuration Sharing**: Users frequently share and collaborate on configurations, creating a rich knowledge base
- **Community Platforms**:
  - GitHub repositories
  - Discord channels
  - Telegram groups
  - Forum discussions
  - Documentation contributions

## Development Environments with Nix

The Nix ecosystem (Nix, NixOS, and nixpkgs) provides powerful tools for creating isolated, reproducible development environments. These environments ensure consistent development setups across teams and projects.

### Key Benefits

- Project-specific dependency management
- Reproducible development environments
- Isolated toolchains
- Version-controlled configurations

### Creating Development Environments

Development environments in Nix are typically defined using Nix Flakes, which provide:

- Deterministic builds
- Lock file functionality
- Dependency isolation
- Shareable configurations

Let's explore how to create a development environment using a Flake:

```nix title="flake.nix"
{
  description = "Example JavaScript development environment";

  # Flake inputs
  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2305.491812.tar.gz";
  };

  # Flake outputs
  outputs = { self, nixpkgs }:
    let
      # Systems supported
      allSystems = [
        "x86_64-linux" # 64-bit Intel/AMD Linux
        "aarch64-linux" # 64-bit ARM Linux
        "x86_64-darwin" # 64-bit Intel macOS
        "aarch64-darwin" # 64-bit ARM macOS
      ];

      # Helper to provide system-specific attributes
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
      });
    in
    {
      # Development environment output
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShell {
          # The Nix packages provided in the environment
          packages = with pkgs; [
            nodejs_18 # Node.js 18, plus npm, npx, and corepack
          ];
        };
      });
    };
}
```

### Practical Example: Using Development Environments

Let's demonstrate how to use a Nix development environment from a GitHub repository:

```bash
# Initialize a JavaScript development environment from a GitHub repository
nix develop "github:linuxmobile/dotfiles#javascript"
```

Upon execution, you'll enter a dedicated development shell:

```bash
(nix:linuxmobile-env) bash-5.1$
```

Verifying the isolated environment:

```bash
# Check Node.js installation path
type node

# Output shows isolated installation
node is /nix/store/i88kh2fd03f5fsd3a948s19gliggd2wd-nodejs-18.12.1/bin/node
```

### Language-Specific Environments

This approach extends to multiple programming languages and tools:

- Create isolated environments for:
  - Rust development
  - Go projects
  - Haskell applications
  - Python workflows
  - And more

### Version Management

Nix enables concurrent use of different versions:

- Run Node.js 18 for legacy projects
- Use Node.js 22 for modern applications
- Maintain multiple versions without conflicts
- Switch between environments seamlessly

### Modern Development: Flutter and Godot Examples

The Nix ecosystem continues to evolve, now supporting cutting-edge development frameworks like **Flutter** and **Godot**.

#### Flutter Development Environment

For mobile development with Flutter, Nix provides a complete Android development environment:

```nix title="flake.nix"
{
  description = "Flutter development environment with Android Emulator";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default-linux";
    flake-parts.url = "github:hercules-ci/flake-parts";
    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
  };

  outputs = {flake-parts, ...} @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = import inputs.systems;
      perSystem = {
        pkgs,
        system,
        ...
      }: let
        emulatorScripts = with pkgs; {
          startEmulator = writeShellScriptBin "start-emulator" ''
            export QT_QPA_PLATFORM=xcb
            export QT_WAYLAND_DISABLE_WINDOWDECORATION=1
            export ANDROID_EMULATOR_USE_SYSTEM_LIBS=1
            export LIBGL_ALWAYS_SOFTWARE=1

            GPU_MODE=''${1:-swiftshader_indirect}
            echo "Starting emulator with GPU mode: $GPU_MODE"

            pkill -9 emulator-x86_64 2>/dev/null

            $ANDROID_HOME/emulator/emulator -avd flutter_emulator \
              -gpu $GPU_MODE \
              -accel on \
              -memory 8192 \
              -cores 4 \
              -no-boot-anim \
              -qemu -smp 4,threads=1 \
              -enable-kvm
          '';
        };
        pkgs = import inputs.nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
            android_sdk.accept_license = true;
          };
        };

        androidComposition = pkgs.androidenv.composeAndroidPackages {
          cmdLineToolsVersion = "9.0";
          platformToolsVersion = "34.0.4";
          buildToolsVersions = ["34.0.0"];
          platformVersions = ["34"];
          abiVersions = ["x86_64"];
          systemImageTypes = ["google_apis"];
          includeEmulator = true;
          includeSystemImages = true;
          includeNDK = false;
        };
        androidSdk = androidComposition.androidsdk;
      in {
        devShells.default = pkgs.mkShell {
          name = "flutter-android-env";

          shellHook = ''
            export ANDROID_HOME="${androidSdk}/libexec/android-sdk"
            export ANDROID_SDK_ROOT="${androidSdk}/libexec/android-sdk"
            export ANDROID_AVD_HOME="$HOME/.android/avd"
            export JAVA_HOME="${pkgs.jdk17.home}"
            export PATH="$PATH:$ANDROID_HOME/emulator"
            export PATH="$PATH:$ANDROID_HOME/platform-tools"
            export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
            export PATH="$PATH:$HOME/.pub-cache/bin"
            export GRADLE_OPTS="-Dorg.gradle.project.android.aapt2FromMavenOverride=$ANDROID_HOME/build-tools/34.0.0/aapt2"

            # Create emulator if it doesn't exist
            if ! avdmanager list avd | grep -q "flutter_emulator"; then
              echo "Creating new emulator..."
              avdmanager create avd \
                -n flutter_emulator \
                -k 'system-images;android-34;google_apis;x86_64' \
                -d pixel_6
            else
              echo "Emulator 'flutter_emulator' already exists"
            fi

            echo "Flutter environment ready!"
            echo "Commands available:"
            echo "  start-emulator [gpu_mode] - Start the Android emulator (default: swiftshader_indirect)"
            echo "  start-scrcpy - Start scrcpy to display and control the emulator"
          '';

          buildInputs = with pkgs;
            [
              flutter
              androidSdk
              gradle
              jdk17
              scrcpy
            ]
            ++ (with emulatorScripts; [
              startEmulator
            ]);
        };
      };
    };
}
```

This environment provides:

- **Flutter SDK** with all necessary tools
- **Android SDK** with emulator support
- **Hardware-accelerated emulator** with GPU support
- **Pre-configured Android Virtual Device**
- **Scrcpy integration** for screen mirroring and control

#### Godot Game Development Environment

For game development, Nix supports **Godot**, the popular open-source game engine:

```nix title="flake.nix"
{
  description = "Godot game development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default-linux";
    flake-parts.url = "github:hercules-ci/flake-parts";
    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
  };

  outputs = {flake-parts, ...} @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = import inputs.systems;
      perSystem = {
        pkgs,
        system,
        ...
      }: let
        godotEnv = pkgs.mkShell {
          name = "godot-dev-env";

          shellHook = ''
            echo "Godot development environment ready!"
            echo "Available tools:"
            echo "  godot - Launch the Godot editor"
            echo "  godot --headless -e <script> - Run scripts in headless mode"
          '';

          buildInputs = with pkgs; [
            godot
            godot-mono # For C# development
            git
            make
            gcc
          ];
        };
      in {
        devShells.default = godotEnv;
      };
    };
}
```

This environment includes:

- **Godot Engine** (latest stable version)
- **Godot Mono** for C# scripting
- **Build tools** for native modules
- **Git** for version control
- **Headless mode** support for CI/CD pipelines

### Advanced Development Scenarios

Nix enables sophisticated development workflows:

- **Multi-platform builds**: Target different architectures from a single environment
- **CI/CD integration**: Reproducible builds for automated testing and deployment
- **Team synchronization**: Share exact development environments across teams
- **Legacy project support**: Maintain old toolchain versions alongside modern ones

These modern examples demonstrate how Nix continues to evolve with the development landscape, supporting everything from mobile app development with Flutter to game creation with Godot, all while maintaining the core principles of reproducibility and isolation.
