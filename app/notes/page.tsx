export default function Notes() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-black rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-zinc-50">
          GitHub Actions Workflows for the Job Concurrency Next.js App
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">Introduction</h2>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 mb-4">
            The Job Concurrency app is a Next.js-based web application designed to manage and visualize job concurrency in distributed systems. Built with TypeScript, Tailwind CSS, and ESLint, it provides real-time insights and controls for optimizing parallel job execution. This documentation outlines how to integrate GitHub Actions for automated CI/CD pipelines, ensuring efficient builds, tests, and deployments.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">How GitHub Actions Works with Next.js</h2>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 mb-4">
            GitHub Actions is a powerful CI/CD platform that integrates seamlessly with Next.js projects hosted on GitHub. It allows you to automate workflows triggered by events like pushes, pull requests, or releases. For Next.js, this means running builds, linting, testing, and deployments directly from your repository.
          </p>
          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
            <li>Automation: Eliminate manual steps for building and deploying your app.</li>
            <li>Integration: Use pre-built actions for Node.js, caching, and deployment platforms like Vercel.</li>
            <li>Scalability: Handle complex pipelines with matrix builds for multiple Node versions or environments.</li>
            <li>Security: Run workflows in isolated environments, reducing risks.</li>
          </ul>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 mt-4">
            Workflows are defined in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.github/workflows/</code> as YAML files, executing on GitHub's runners or self-hosted machines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">Workflow Examples</h2>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400 mb-4">
            Below are annotated examples of GitHub Actions workflows tailored for the Job Concurrency app. Place these in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.github/workflows/</code> (create the directory if needed). Each example includes YAML code with inline comments explaining key parts.
          </p>

          <h3 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">1. Basic Build and Lint Workflow (CI)</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
{`name: CI - Build and Lint

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-lint:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4  # Pulls the latest code from the repository

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'  # Matches Next.js requirements; adjust if needed
        cache: 'npm'  # Caches npm dependencies for faster runs

    - name: Install dependencies
      run: npm ci  # Clean install to ensure reproducible builds

    - name: Run ESLint
      run: npm run lint  # Checks code for style and potential errors

    - name: Build the app
      run: npm run build  # Compiles the Next.js app for production`}
          </pre>

          <h3 className="text-xl font-semibold mb-2 mt-6 text-black dark:text-zinc-50">2. Test Workflow with Caching</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
{`name: CI - Test with Caching

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Cache Node modules
      uses: actions/cache@v3
      with:
        path: ~/.npm  # Cache npm packages globally
        key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          \${{ runner.os }}-node-

    - name: Cache Next.js build
      uses: actions/cache@v3
      with:
        path: .next/cache  # Cache Next.js internal cache for faster builds
        key: \${{ runner.os }}-nextjs-\${{ hashFiles('**/package-lock.json') }}-\${{ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }}
        restore-keys: |
          \${{ runner.os }}-nextjs-\${{ hashFiles('**/package-lock.json') }}-

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test  # Add this script to package.json if not present`}
          </pre>

          <h3 className="text-xl font-semibold mb-2 mt-6 text-black dark:text-zinc-50">3. Deploy to Vercel</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
{`name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build the app
      run: npm run build

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25  # Official Vercel action for deployment
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}  # Store token in GitHub secrets
        vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'  # Deploys to production`}
          </pre>

          <h3 className="text-xl font-semibold mb-2 mt-6 text-black dark:text-zinc-50">4. Build and Upload Artifacts</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
{`name: Build and Upload Artifacts

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build the app
      run: npm run build

    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: nextjs-build  # Name of the artifact
        path: .next/  # Path to the build output
        retention-days: 30  # Keep artifacts for 30 days`}
          </pre>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">Best Practices for Caching, Artifact Management, and CI/CD Optimization</h2>

          <h3 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">Caching</h3>
          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 mb-4">
            <li>Cache Node modules and Next.js build cache to reduce install and build times.</li>
            <li>Use hash-based keys (e.g., based on <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">package-lock.json</code>) to invalidate caches on dependency changes.</li>
            <li>Avoid caching <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.next</code> directory entirely if builds are fast; focus on internal cache.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">Artifact Management</h3>
          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 mb-4">
            <li>Upload artifacts for builds, test reports, or coverage data.</li>
            <li>Set retention policies to manage storage costs.</li>
            <li>Use artifacts for multi-job workflows, e.g., build in one job and deploy in another.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 text-black dark:text-zinc-50">CI/CD Optimization</h3>
          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
            <li>Use matrix builds for testing across multiple Node versions or OSes.</li>
            <li>Run jobs in parallel where possible (e.g., lint and build separately).</li>
            <li>Secure secrets for deployments; never hardcode tokens.</li>
            <li>Monitor workflow performance and adjust runners (e.g., larger instances for heavy builds).</li>
            <li>Add status checks to PRs to prevent merges on failures.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">Attribution</h2>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This app was developed by Kahaf Samee, showcasing modern web development practices with Next.js and automated CI/CD via GitHub Actions.
          </p>
        </section>
      </div>
    </div>
  );
}
