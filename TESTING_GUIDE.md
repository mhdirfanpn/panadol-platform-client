# 🧪 Testing Guide - Panadol Platform Client

## Overview
This project uses **Vitest** and **React Testing Library** for unit and integration testing.

---

## 📦 Testing Stack

- **Vitest** - Fast unit test framework (Vite-native)
- **React Testing Library** - Testing utilities for React components
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM implementation for Node.js

---

## 🚀 Running Tests

### Run all tests in watch mode
```bash
npm test
```

### Run tests once (CI mode)
```bash
npm run test:run
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

---

## 📁 Test File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── StatusBadge.tsx
│   │   └── __tests__/
│   │       └── StatusBadge.test.tsx
│   ├── users/
│   │   ├── DeleteConfirmDialog.tsx
│   │   └── __tests__/
│   │       └── DeleteConfirmDialog.test.tsx
├── services/
│   ├── userService.ts
│   └── __tests__/
│       └── userService.test.ts
└── test/
    └── setup.ts
```

**Convention:** Place test files in `__tests__` folder next to the component/service being tested.

---

## ✍️ Writing Tests

### Example 1: Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../StatusBadge';
import { UserStatus } from '../../../types';

describe('StatusBadge Component', () => {
  it('should render ACTIVE status with success color', () => {
    render(<StatusBadge status={UserStatus.ACTIVE} />);
    const badge = screen.getByText('Active');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('MuiChip-colorSuccess');
  });
});
```

### Example 2: User Interaction Test

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteConfirmDialog from '../DeleteConfirmDialog';

describe('DeleteConfirmDialog', () => {
  it('should call onConfirm when Delete button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirmMock = vi.fn();

    render(
      <DeleteConfirmDialog
        open={true}
        user={mockUser}
        onClose={vi.fn()}
        onConfirm={onConfirmMock}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
```

### Example 3: Service/API Test

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '../userService';
import apiClient from '../apiClient';

vi.mock('../apiClient');

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all users successfully', async () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockUsers });

    const result = await userService.getAllUsers();

    expect(apiClient.get).toHaveBeenCalledWith('/users');
    expect(result).toEqual(mockUsers);
  });
});
```

---

## 🎯 Testing Best Practices

### 1. **Test User Behavior, Not Implementation**
```typescript
// ❌ Bad - Testing implementation details
expect(component.state.isOpen).toBe(true);

// ✅ Good - Testing user-visible behavior
expect(screen.getByRole('dialog')).toBeInTheDocument();
```

### 2. **Use Accessible Queries**
Priority order:
1. `getByRole` - Most accessible
2. `getByLabelText` - Form elements
3. `getByPlaceholderText` - Inputs
4. `getByText` - Non-interactive elements
5. `getByTestId` - Last resort

```typescript
// ✅ Best
screen.getByRole('button', { name: /submit/i });

// ✅ Good
screen.getByLabelText('Email');

// ⚠️ Avoid
screen.getByTestId('submit-button');
```

### 3. **Mock External Dependencies**
```typescript
vi.mock('../apiClient');
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));
```

### 4. **Clean Up After Each Test**
```typescript
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

### 5. **Use Descriptive Test Names**
```typescript
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('should display error message when API call fails', () => { ... });
```

---

## 📊 Coverage Goals

- **Statements:** > 80%
- **Branches:** > 75%
- **Functions:** > 80%
- **Lines:** > 80%

View coverage report:
```bash
npm run test:coverage
```

Coverage report will be generated in `coverage/` folder.

---

## 🔍 Common Testing Patterns

### Testing Async Operations
```typescript
it('should load users on mount', async () => {
  render(<UserList />);
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

### Testing Forms
```typescript
it('should submit form with valid data', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  
  render(<CreateUserForm onSubmit={onSubmit} />);
  
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'password123');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(onSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});
```

---

## 🐛 Debugging Tests

### 1. Use `screen.debug()`
```typescript
it('should render component', () => {
  render(<MyComponent />);
  screen.debug(); // Prints DOM to console
});
```

### 2. Use Vitest UI
```bash
npm run test:ui
```
Opens interactive UI at http://localhost:51204/__vitest__/

### 3. Run Single Test File
```bash
npm test StatusBadge.test.tsx
```

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Happy Testing! 🎉**

