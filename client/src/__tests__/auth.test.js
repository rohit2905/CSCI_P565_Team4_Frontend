import { login, logout, register, resetpassword, newpassword } from '../api/user'; 
import { fetchItems } from '../pages/Services';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocking
fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks(); // Reset mocks for each test
});

describe('API utility functions', () => {

    // Customer
    it('successfully logs in a customer', async () => {
        const mockUserDetails = {
            userType: 10,
            email: 'test@example.com',
            password: 'password',
            otp: '123456',
        };

        const mockApiResponse = {
            success: true,
            message: 'Login successful',
        };

        // Mock the fetch call within the login function
        fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

        const response = await login(mockUserDetails);

        // Check that the fetch was called with the correct URL and options
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockUserDetails),
        });

        // Verify the response matches the mock API response
        expect(response).toEqual(mockApiResponse);
    });

    // Delivery Driver
    it('successfully logs in a driver', async () => {
        const mockUserDetails = {
            userType: 20,
            email: 'test@example.com',
            password: 'password',
            otp: '123456',
        };

        const mockApiResponse = {
            success: true,
            message: 'Login successful',
        };

        // Mock the fetch call within the login function
        fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

        const response = await login(mockUserDetails);

        // Check that the fetch was called with the correct URL and options
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockUserDetails),
        });

        // Verify the response matches the mock API response
        expect(response).toEqual(mockApiResponse);
    });


    // Admin
    it('successfully logs in a admin', async () => {
        const mockUserDetails = {
            userType: 30,
            email: 'test@example.com',
            password: 'password',
            otp: '123456',
        };

        const mockApiResponse = {
            success: true,
            message: 'Login successful',
        };

        // Mock the fetch call within the login function
        fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

        const response = await login(mockUserDetails);

        // Check that the fetch was called with the correct URL and options
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockUserDetails),
        });

        // Verify the response matches the mock API response
        expect(response).toEqual(mockApiResponse);
    });

    
});


describe('logout function', () => {
    it('successfully logs out the user', async () => {
        const mockApiResponse = {
            message: 'Logout successful',
        };

        // Mock the fetch call within the logout function
        fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

        const response = await logout();

        // Check that fetch was called with the correct URL and options
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/logout?id=undefined`, {
            method: "GET",
            credentials: "include",
        });

        // Verify the response matches the mock API response
        expect(response).toEqual(mockApiResponse);
    });

});

describe('register function', () => {
    it('successfully registers a new user', async () => {
        const mockUserDetails = {
            userType: 'customer',
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123',
        };

        const mockApiResponse = {
            success: true,
            message: 'Registration successful',
        };

        // Mock the fetch call within the register function
        fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

        const response = await register(mockUserDetails);

        // Check that fetch was called with the correct URL and options
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockUserDetails),
        });

        // Verify the response matches the mock API response
        expect(response).toEqual(mockApiResponse);
    });

    it('handles registration error', async () => {
        const mockUserDetails = {
            userType: 'customer',
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123',
        };

        // Mock a fetch failure
        const errorResponse = { message: "Cannot register at this time." };
        fetch.mockRejectOnce(new Error(errorResponse.message));

        await expect(register(mockUserDetails)).rejects.toThrow(errorResponse.message);

    });
});


describe('Password management functions', () => {
    describe('resetpassword function', () => {
        it('successfully requests a password reset', async () => {
            const mockUserDetails = {
                userType: 'customer',
                email: 'user@example.com',
            };

            const mockApiResponse = { message: 'Reset password link sent.' };

            fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

            const response = await resetpassword(mockUserDetails);

            expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/resetpassword`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mockUserDetails),
            });

            expect(response).toEqual(mockApiResponse);
        });

        
    });

    describe('newpassword function', () => {
        it('successfully sets a new password', async () => {
            const mockNewPasswordDetails = {
                password: 'newSecurePassword123',
                token_rs: 'resetToken',
            };

            const mockApiResponse = { message: 'Password updated successfully.' };

            fetch.mockResponseOnce(JSON.stringify(mockApiResponse));

            const response = await newpassword(mockNewPasswordDetails);

            expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/newpassword`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mockNewPasswordDetails),
            });

            expect(response).toEqual(mockApiResponse);
        });

        
    });
});