import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import {About} from "../landing/About";
import {Contact} from "../landing/Contact";
import { Work } from "../landing/Work";
import userEvent from '@testing-library/user-event';
import { Home1 } from '../landing/Home1'; 

// Landing Page Tests - About Section
test('should render about component of landing page - title', () => {
    render(<About />);
    const about = screen.getByTestId('about');
    expect(about).toBeInTheDocument();
})

test('should render about component of landing page - text', () => {
    render(<About />);
    const about = screen.getByTestId('ptext');
    expect(about).toBeInTheDocument();
})

test('should render about component of landing page - heading', () => {
    render(<About />);
    const about = screen.getByTestId('pheading');
    expect(about).toBeInTheDocument();
})

// Landing Page Tests - Contact Section
test('should render contact component of landing page - heading', () => {
    render(<Contact />);
    const about = screen.getByTestId('pheading');
    expect(about).toBeInTheDocument();
})

test('should render contact component of landing page - button', () => {
    render(<Contact />);
    const about = screen.getByTestId('wbutton');
    expect(about).toBeInTheDocument();
})

// Landing Page Tests - Work Section
test('should render work component of landing page - text', () => {
    render(<Work />);
    const about = screen.getByTestId('ptext');
    expect(about).toBeInTheDocument();
})

describe('Work Component', () => {
    beforeEach(() => {
        render(<Work />);
    });

    it('renders the primary headings', () => {
        expect(screen.getByText(/What We Offer/i)).toBeInTheDocument();
        expect(screen.getByText(/Discover Our Features: Streamlined, Efficient, Reliable/i)).toBeInTheDocument();
    });

    it('renders all the work sections based on workInfoData length', () => {
        const workSections = screen.getAllByRole('heading', { level: 2 });
        expect(workSections).toHaveLength(3); // As there are three items in workInfoData
    });

    it('displays the correct title and text for each work section', () => {
        // Check for the first item
        expect(screen.getByText('Available Globally')).toBeInTheDocument();
        expect(screen.getByText(/DeliverWise aims for a worldwide reach/i)).toBeInTheDocument();

        // Check for the second item
        expect(screen.getByText('Seamless Deliveries')).toBeInTheDocument();
        expect(screen.getByText(/With Endless options/i)).toBeInTheDocument();

        // Check for the third item
        expect(screen.getByText('Simple and Adaptable')).toBeInTheDocument();
        expect(screen.getByText(/Empower recipients to steer their delivery journey/i)).toBeInTheDocument();
    });

    // Optional: Check if images are loaded (using their alt attributes as placeholders for this example)
    it('loads images correctly', () => {
        // Assuming the alt attributes are set for accessibility
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(3); // Matches the number of workInfoData items
    });
});




describe('Home1 Component', () => {
    beforeEach(() => {
        render(<Home1 />);
    });

    it('renders the primary heading correctly', () => {
        const primaryHeading = screen.getByText(/Your Trusted Delivery Partner/i);
        expect(primaryHeading).toBeInTheDocument();
    });

    it('renders the primary text correctly', () => {
        const primaryText = screen.getByText(/Experience Seamless Global Deliveries With Our One-Stop-Shop Delivery Management System, Where Every Package Finds Its Perfect Journey!/i);
        expect(primaryText).toBeInTheDocument();
    });

    it('renders the "Get Started" button with an icon', () => {
        const getStartedButton = screen.getByRole('button', { name: /get started/i });
        expect(getStartedButton).toBeInTheDocument();
    });

    it('loads the banner background image correctly', () => {
        const bannerBackgroundImages = screen.getAllByRole('img', { hidden: true }); // Assuming alt text is not provided and images are decorative
        const bannerBackgroundImage = bannerBackgroundImages.find((img) => img.src.includes('home-banner-background.png'));
        expect(bannerBackgroundImage).toBeInTheDocument();
    });

    it('loads the main banner image correctly', () => {
        const bannerImages = screen.getAllByRole('img', { hidden: true }); // Assuming alt text is not provided and images are decorative
        const mainBannerImage = bannerImages.find((img) => img.src.includes('main.svg'));
        expect(mainBannerImage).toBeInTheDocument();
    });

    // Optionally, if you want to test the interaction with the button:
    it('handles button click', async () => {
        const getStartedButton = screen.getByRole('button', { name: /get started/i });
        userEvent.click(getStartedButton);
    });
});