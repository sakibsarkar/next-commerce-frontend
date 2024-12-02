# On The Go

## Live link - [On the go](https://onthego-frontend.vercel.app/?searchTerm=&page=1)

## 🔗 Server side repository - [on_the_go_backend](https://github.com/sakibsarkar/on_the_go_backend)

## Introduction

The "Travel Tips & Destination Guides" platform is a Next.js-based community hub tailored for travel enthusiasts, allowing users to connect, share, and explore global travel insights. The platform fosters a social environment where users can contribute personal travel stories, exchange tips, and engage in discussions with fellow travelers. Through user authentication and profile customization, individuals can follow others, save favorite posts, and build a personalized travel experience.

Additionally, the platform offers premium content access with payment integration, unlocking exclusive travel guides, tips, and insider knowledge. By blending user-generated content with rich travel information, the project helps users make well-informed travel decisions, discover hidden gems around the world, and enhance their travel adventures. Whether it's about exploring new destinations or connecting with like-minded travelers, this platform aims to make every trip a memorable experience.

This README file will guide you through the steps required to set up and run the project on your local computer.

## Features

- Api debouncing for the search functionality to reduce the number of API calls
- Service comparison
- Upcoming booking countdown

## Technology Stack

- Next JS
- Typescript
- Shadcn
- tailwind CSS
- Readux toolkit & query

## Getting Started

To get started with the project, follow the instructions below:

### Prerequisites

Make sure you have the following software installed on your machine:

- Git
- Node.js (v20.9.0 recommended)
- Yarn or any package installer

### Cloning the Repository

First, clone the repository using the following command:

```
git clone https://github.com/sakibsarkar/on_the_go_frontend.git

```

### Installing Dependencies

Open the project file in terminal and run `yarn install`

```
yarn install

```

### Setting Up Environment Variables

Create a .env file in the root directory of the project and add your MongoDB credentials:

```
VITE_BASE_API=https://onthego-backend.vercel.app/
```

### Running the Project

Once you have set up the environment variables, you can run the project locally.

```
yarn dev

```

### Accessing the Project

```
http://localhost:5173
```
