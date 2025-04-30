# BudgetChain-Frontend

Welcome to the BudgetChain Frontend! This project is built using Next.js and serves as the user interface for the BudgetChain application. It allows users to manage their budgets efficiently and provides a seamless experience for interacting with the backend services.

## Table of Contents
- [Features](#features)
- [Setup](#setup)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Settings Page Implementation](#settings-page-implementation)

## Features
- **User Authentication**: Secure login and registration for users.
- **Budget Management**: Create, edit, and delete budgets.
- **Analytics Dashboard**: Visual representation of spending and saving trends.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Updates**: Instant updates to the UI as changes are made.

## Setup
To get started with the BudgetChain Frontend, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/BudgetChain-Frontend.git
   cd BudgetChain-Frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create Environment Variables**:
   Create a `.env.local` file in the root of the project and add the required environment variables. Use `.env.local.template` as a reference.

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Scripts
The following scripts are available to manage the project:

- `npm run dev`: Start the development server with hot reloading.
- `npm run build`: Build the project for production, optimizing assets and code.
- `npm run start`: Start the production server after building the project.
- `npm run lint`: Run ESLint to check for code quality and style issues.

## Environment Variables
The following environment variables are required for the project to run:

- `NEXT_PUBLIC_API_URL`: The base URL for the API.
- `NEXT_PUBLIC_ANALYTICS_ID`: Google Analytics tracking ID.
- `DATABASE_URL`: The connection URL for the database.
- `SECRET_KEY`: A secret key for encryption.

Make sure to fill in these variables in your `.env.local` file.

## Folder Structure
The project follows a standard Next.js folder structure:

```
/pages          # Contains the application routes
/components     # Reusable React components
/styles         # Global styles and CSS modules
/public         # Static assets like images and fonts
/utils          # Utility functions and helpers
/hooks          # Custom React hooks
```

## Contributing
We welcome contributions to the BudgetChain Frontend! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
For any questions or inquiries, please reach out to the project maintainers:

- **Your Name** - [musaeleazar090@gmail.com](mailto:musaeleazar090@gmail.com)
- **GitHub** - [anonfedora](https://github.com/anonfedora)

Thank you for your interest in BudgetChain! We hope you find this project useful and enjoyable to work with. Happy coding!

## Settings Page Implementation

### Overview
Implemented a new settings page for the dashboard that allows users to manage their preferences and notification settings. The page follows the existing dashboard design language and provides a seamless user experience.

### Features

#### User Interface
- Modern, responsive design using Shadcn UI components
- Dark theme consistent with the dashboard
- Tab-based navigation for different settings sections
- Form validation and error handling
- Loading states and feedback notifications

#### Functionality
- **Preferences Management**
  - Language selection
  - Timezone configuration
  - Theme preferences
- **Notification Settings**
  - Email notifications toggle
  - Push notifications toggle
  - Project updates notifications toggle

#### Technical Implementation
- Built with React and Next.js
- Form handling using react-hook-form
- Validation using Zod schema
- State persistence using localStorage
- Toast notifications using react-hot-toast
- Responsive design with Tailwind CSS

### Technical Details

#### Form Validation
```typescript
const settingsSchema = z.object({
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
  theme: z.string().min(1, "Theme is required"),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  projectUpdates: z.boolean(),
});
```

#### State Management
- Form state managed by react-hook-form
- Settings persisted in localStorage
- Real-time validation feedback
- Loading states for async operations

#### UI Components
- Tabs for section navigation
- Cards for content organization
- Input fields with validation
- Checkboxes for toggle options
- Buttons with loading states

### Accessibility
- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Color contrast compliance
- Responsive design for all screen sizes

### Future Improvements
- Integration with backend API
- Additional settings sections
- Theme customization options
- User profile management
- Advanced notification settings