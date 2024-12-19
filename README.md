# Ousadia Store Web Application

Welcome to the Ousadia Store web application! This project is an e-commerce platform designed to sell T-shirts, Shorts, and Caps (Bonés) with free delivery within Maputo, Mozambique. Built with modern web technologies, the application includes features for both customers and administrators.

## Features

### For Customers:

- Product Categories: Browse through T-shirts, Shorts, and Caps.

- Product Pages: View detailed information about each product.

- Checkout: Complete purchases with free delivery in Maputo.

- Payment Integration: Pay via Mpesa and credit/debit cards (using Stripe).

### For Administrators:

- Dashboard: Monitor store performance (sales, popular products, etc.).

- Product Management:

  - Add new products.

  - Edit existing products.

  - Delete products.

- Reports: Access analytics about sales and customer activity.

## Tech Stack

### Frontend

- Framework: Next.js (App Router)

- Styling: TailwindCSS

### Backend

- Database: Prisma with PostgreSQL

- APIs: Built using Next.js API Routes

### Deployment

- Hosting: AWS (Elastic Beanstalk or Amplify)

- Storage: AWS S3 for product images

### Payment Integration

- Mpesa: Local payment system for Mozambique

- Stripe: For credit/debit card transactions

Project Structure

```bash

src/
└── app/
├── admin/
│ ├── layout.tsx # Admin layout
│ ├── page.tsx # Admin dashboard
│ ├── produtos/
│ │ ├── page.tsx # Product list
│ │ ├── criar/page.tsx # Add product
│ │ ├── [id]/editar.tsx # Edit product
│ ├── relatorios/
│ └── page.tsx # Reports and analytics
├── categorias/
│ ├── page.tsx # Categories overview
│ ├── [categoria]/page.tsx # Category products
├── produtos/
│ └── [id]/page.tsx # Product details
├── carrinho/
│ └── page.tsx # Shopping cart
├── checkout/
│ └── page.tsx # Checkout page

```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ousadia-store.git
   cd ousadia-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:

   - Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string.

   - Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the app at http://localhost:3000.

## Setup Database

### 1. Install Prisma and Its Dependencies

Install Prisma and the necessary database driver:

```bash
Copy code
npm install prisma --save-dev
npm install @prisma/client
```

### 2. Initialize Prisma

Run the following command to initialize Prisma in your project. This will create a prisma folder and a schema.prisma file.

```bash
Copy code
npx prisma init
```

### 3. Configure the `schema.prisma` File

Edit the `schema.prisma` file to define your database connection and models. For example:

```postgresql
generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql" // Change this based on your database (e.g., "mysql" or "sqlite")
url      = env("DATABASE_URL")
}

model User {
id    Int     @id @default(autoincrement())
name  String
email String  @unique
}
```

### 4. Set Up the Database Connection

1.  Add the `DATABASE_URL` environment variable to your `.env` file:

    ```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
    ```

    Replace `postgresql://user:password@localhost:5432/mydb` with your actual database connection string.

2.  Set up your database (if it isn’t already running).

### 5. Generate Prisma Client

Run the following command to generate the Prisma Client:

```bash
npx prisma generate
```

### 6. Migrate the Database

To apply your schema changes to the database, create and run migrations:

```bash
npx prisma migrate dev --name init
```

## Deployment

1. Configure AWS services:

   - Set up RDS for the database.

   - Use S3 for storing product images.

2. Deploy the application using AWS Amplify or Elastic Beanstalk.

3. Update environment variables for production in AWS.

## Future Improvements

- Add multi-language support (e.g., Portuguese and English).

- Cart Management: Add, edit, and remove items from the cart.

- Implement customer accounts for better user experience.

- Enable order tracking for customers.

## License

This project is licensed under the MIT License.

```

```
