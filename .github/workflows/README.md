# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD automation.

## 📋 Available Workflows

### 1. **CI/CD Pipeline** (`ci.yml`)

**Triggers:**
- Push to `main` or `dev` branches
- Pull requests to `main` or `dev` branches

**Jobs:**

#### Test Job
- Runs on Node.js 18.x and 20.x (matrix)
- Installs dependencies
- Runs ESLint
- Runs unit tests
- Generates coverage report
- Uploads coverage to Codecov (optional)

#### Build Job
- Runs after tests pass
- Builds the production bundle
- Uploads build artifacts (retained for 7 days)

#### Deploy Preview Job
- Runs only on pull requests
- Downloads build artifacts
- Deploys preview to Netlify (if configured)

**Status Badge:**
```markdown
![CI/CD Pipeline](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/ci.yml/badge.svg)
```

---

### 2. **Code Quality** (`code-quality.yml`)

**Triggers:**
- Push to `main` or `dev` branches
- Pull requests to `main` or `dev` branches

**Jobs:**

#### Lint Job
- Runs ESLint
- Checks TypeScript compilation (no emit)

#### Dependency Review Job
- Runs only on pull requests
- Reviews dependency changes for security vulnerabilities

**Status Badge:**
```markdown
![Code Quality](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/code-quality.yml/badge.svg)
```

---

## 🔧 Setup Instructions

### Required Secrets (Optional)

For Netlify deployment preview, add these secrets to your repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `NETLIFY_AUTH_TOKEN` - Your Netlify personal access token
   - `NETLIFY_SITE_ID` - Your Netlify site ID

### Codecov Integration (Optional)

1. Sign up at [codecov.io](https://codecov.io)
2. Connect your GitHub repository
3. No additional secrets needed (uses `GITHUB_TOKEN`)

---

## 📊 Workflow Status

You can view the status of all workflows at:
https://github.com/mhdirfanpn/panadol-platform-client/actions

---

## 🚀 Local Testing

Before pushing, you can run the same checks locally:

```bash
# Run linter
npm run lint

# Run tests
npm run test:run

# Generate coverage
npm run test:coverage

# Build project
npm run build

# Type check
npx tsc --noEmit
```

---

## 📝 Adding Status Badges to README

Add these badges to your main `README.md`:

```markdown
[![CI/CD Pipeline](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/ci.yml/badge.svg)](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/ci.yml)
[![Code Quality](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/code-quality.yml/badge.svg)](https://github.com/mhdirfanpn/panadol-platform-client/actions/workflows/code-quality.yml)
```

---

## 🔄 Workflow Customization

### Changing Node.js Versions

Edit the matrix in `ci.yml`:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Add or remove versions
```

### Disabling Netlify Deploy

Remove or comment out the `deploy-preview` job in `ci.yml`.

### Adding More Checks

You can add additional jobs like:
- Security scanning (Snyk, npm audit)
- Performance testing
- E2E tests (Playwright, Cypress)
- Docker image building

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Codecov GitHub Action](https://github.com/codecov/codecov-action)
- [Netlify Deploy Action](https://github.com/nwtgck/actions-netlify)

