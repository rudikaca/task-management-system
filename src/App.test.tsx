import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as useAuthState from '@/hooks/useAuthState';
import { AuthState } from '@/models/types';

// Mock the router
jest.mock('react-router-dom', () => ({
    RouterProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the ThemeProvider
jest.mock('./contexts/ThemeContext', () => ({
    ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the router
jest.mock('./Router', () => ({
    router: {},
}));

describe('App', () => {
    it('renders loading state', () => {
        jest.spyOn(useAuthState, 'default').mockImplementation((): AuthState => ({
            loading: true,
            loggedIn: false,
            user: null
        }));

        render(<App />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders main content when not loading', () => {
        jest.spyOn(useAuthState, 'default').mockImplementation((): AuthState => ({
            loading: false,
            loggedIn: true,
            user: {
                id: '1',
                email: 'test@example.com',
                role: 'USER'
            }
        }));

        render(<App />);
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
});