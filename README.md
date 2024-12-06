# Next Commerce

## Live link - [Next Commerce](https://next-commerce-client-theta.vercel.app/)

## 🔗 Server side repository - [next-commerce-backend](https://github.com/sakibsarkar/next-commerce-backend)

## Introduction

Next Commerce is a comprehensive e-commerce platform designed to deliver a seamless experience for customers, vendors, and administrators. Built with Next.js, Node.js, and PostgreSQL , it ensures high performance, scalability, and security.

Administrators have full control over the platform, including managing users, vendors, and product categories. Suspended accounts are automatically deleted after 30 days. Vendors can create and manage their shops, add and edit products, track inventory, and view order histories. Customers can explore products using advanced filters, compare similar items, follow shops, and leave reviews after purchases.

The platform supports responsive design for mobile and desktop users, integrates cloud storage for images, and provides a secure payment system via Stripe. With features like paginated listings, single-vendor cart restrictions, and personalized browsing, Next Commerce delivers a modern, user-friendly e-commerce experience.

## Features

- Site administrators can suspend user/vendor, after 30days of suspension the suspended account will be automatically deleted
- Infinite scrolling
- Users can follow unfollow shop. and get product suggedsion based on their following shops
- Order manage for both vendor and users

## Technology Stack

- Next JS
- Typescript
- Shadcn
- tailwind CSS
- Readux toolkit & query
- Stripe

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
git clone https://github.com/sakibsarkar/next-commerce-frontend.git

```

### Installing Dependencies

Open the project file in terminal and run `yarn install`

```
yarn install

```

### Setting Up Environment Variables

Create a .env file in the root directory of the project and add your MongoDB credentials:

```
NEXT_PUBLIC_API_API=BACKEND_URL
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=STRIPE_PUBLIC_KEY
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
