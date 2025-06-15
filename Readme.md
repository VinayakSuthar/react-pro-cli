# Awesome React CLI

A lightweight, modern CLI tool to scaffold React projects quickly and efficiently. Built with simplicity in mind, ```@kuldep7/awesome-react``` helps developers kickstart React applications with pre-configured templates. Hosted on GitHub Packages for seamless integration with the GitHub ecosystem.

## Features

- **Quick Setup**: Generate a React project with a single command.
- **Customizable Templates**: Includes a ```template-main``` starter (expandable in future releases).
- **Modern Tooling**: Leverages ES Modules and dependencies like ```prompts``` for an interactive experience.
- **Cross-Platform**: Works on macOS, Linux, and Windows via ```cross-spawn```.

## Prerequisites
- **Node.js**: Version 20 or higher.

- **npm**: Version 8 or higher (bundled with Node.js). 
## Installation 
```@kuldep7/awesome-react``` is published to GitHub Packages. Follow these steps to install it globally:

### Step-by-Step

1. **Configure npm for GitHub Packages** Set the registry for the ```@kuldep7``` <br/> ``` npm config set @kuldep7:registry https://npm.pkg.github.com/```

- **Note**: If you encounter a 401 Unauthorized error, add a GitHub Personal Access Token (PAT). See [Authentication](#authentication) below.

2.  **Install the CLI**  
    Install globally to use from anywhere:

    ```npm install -g @kuldep7/awesome-react```

3.  **Verify Installation**  
    Check it’s installed:

    ```create-app --version```

    Expected output: 1.0.0 (or the latest version).

### Quick Install (One-Liner)

Run this to configure and install in one go:

```npm config set @kuldep7:registry https://npm.pkg.github.com/ && npm install -g @kuldep7/awesome-react```

- If a 401 error occurs, configure a PAT as described in [Authentication](#authentication).

## Usage

Once installed, use the create-app command to scaffold a new React project:

```create-app```

- Follow the prompts to customize your project (e.g., project name, template selection).
- The CLI will generate a directory with the React project structure based on template-main.

### Example

create-app \
 * Prompt: Project name? my-react-app  
 * Creates ./my-react-app/ with React files 
 * cd my-react-app && npm install && npm start

## Authentication

GitHub Packages may require authentication for scoped packages, even from a public repository. 
- If you see a 401 Unauthorized error during installation, you’ll need a GitHub PAT with the read:packages scope.

### Creating a GitHub PAT

1.  **Log in to GitHub**  
    Visit [github.com](https://github.com) and sign in as kuldep7 (or your GitHub account).
2.  **Access Token Settings**
    - Click your profile picture (top-right) > **Settings**.
    - Sidebar: **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
3.  **Generate Token**
    - Click **Generate new token (classic)**.
    - **Name**: e.g., npm-github-packages.
    - **Expiration**: Choose 30 days (or adjust as needed).
    - **Scopes**: Select read:packages.
    - Click **Generate token** and copy it (e.g., ghp_abc123...).

### Adding the PAT to npm

Update your ~/.npmrc:

```npm config set //npm.pkg.github.com/:_authToken=ghp_abc123...```

- Replace ghp_abc123... with your actual token.
- Verify:

  ```cat ~/.npmrc```

  Expected:

  - ```@kuldep7:registry=https://npm.pkg.github.com/```
  -  ``` //npm.pkg.github.com/:_authToken=ghp_abc123...```

Retry installation:

```npm install -g @kuldep7/awesome-react```

## Development

### Setup

Clone the repo and install dependencies:

```git clone https://github.com/kuldep7/awesome-react.git && cd awesome-react && npm install```

### Build

Compile src/ into dist/:

```npm run build```

- Uses unbuild to generate dist/index.mjs.

### Test Locally

Pack and install locally:

```npm run pack npm install -g ./kuldep7-awesome-react-0.0.4.tgz create-app```

### Publish (Manual)

For maintainers:

```npm publish --registry=https://npm.pkg.github.com/```

- Requires a PAT with write:packages scope in ~/.npmrc.

## Roadmap

Future enhancements to make @kuldep7/awesome-react a go-to tool for React developers:

- **React-Query Integration**: Add a template with react-query for seamless data fetching and caching.
- **Zustand Support**: Include a lightweight state management option with zustand.
- **Essential React Tools**:
  - **React Router**: Pre-configured routing setup.
  - **Tailwind CSS**: Optional styling with Tailwind integration.
  - **Vite**: Switch to Vite for faster builds and development.
- **Template Customization**: Allow users to select from multiple templates via prompts.
- **TypeScript Support**: Add TypeScript-ready templates.

Have ideas? Suggest them in the [Issues](https://github.com/kuldep7/awesome-react/issues) tab!

## Project Structure

awesome-react/ \
├── dist/&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;# Built CLI (generated)  
├── src/&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;# Source code \
├── template-main/&emsp;&emsp;&emsp;&emsp; # Default project template  \
├── package.json&emsp;&emsp;&emsp;&emsp;&emsp; # Dependencies and config <br/> 
└── README.md  &emsp;&emsp;&emsp;&emsp;&emsp; # This file

## Contributing

We welcome contributions! Here’s how:

1.  Fork the repo.
2.  Create a branch (git checkout -b feature/your-feature).
3.  Commit changes (git commit -m "Add your feature").
4.  Push to your fork (git push origin feature/your-feature).
5.  Open a Pull Request.

### Issues

Report bugs or suggest features in the [Issues](https://github.com/kuldep7/awesome-react/issues) tab.

## References

- Inspired by: [reactjs-vite-tailwindcss-boilerplate](https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate)

## License

MIT License. See [LICENSE](LICENSE) for details.
