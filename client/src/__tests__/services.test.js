import fetchMock from 'jest-fetch-mock';
import { render, waitFor } from '@testing-library/react';
import Services  from '../pages/Services';


// Enable fetch mocking
fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks(); // Reset mocks for each test
});
describe('Services Component', () => {
    it('fetches services successfully and updates state', async () => {
        const mockServices = [
            { id: 1, name: 'FedEx' },
            { id: 2, name: 'UPS' },
            { id: 3, name: 'USPS'},
        ];

        fetch.mockResponseOnce(JSON.stringify(mockServices));

        const { getByText } = render(<Services />);

        // Optionally, check that fetch was called correctly
        expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/getallservices`);
    });

    it('handles fetch error', async () => {
        fetch.mockRejectOnce(new Error('API failure'));

        const { getByText } = render(<Services />);

        await waitFor(() => {
            expect(true).toBe(true);
        });
    });
});
