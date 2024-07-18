import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostEvent from './PostEvent';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PostEvent', () => {
  beforeEach(() => {
    // Mocking the window alert
    window.alert = jest.fn();
  });

  it('submits the form successfully', async () => {
    render(
      <BrowserRouter>
        <PostEvent />
      </BrowserRouter>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByTestId('event-title-input').querySelector('input'), { target: { value: 'NUS Open House' } });
    fireEvent.mouseDown(screen.getByTestId('event-type-select').querySelector('[role="button"]'));
    fireEvent.click(screen.getByText('Academic'));
    fireEvent.click(screen.getByTestId('is-free-switch-input').querySelector('input'));
    
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(screen.getByTestId('image-upload-input'), {
      target: { files: [file] },
    });
    expect(window.alert).toHaveBeenCalledWith('Image uploaded successfully!');

    fireEvent.change(screen.getByTestId('date-picker').querySelector('input'), { target: { value: '2023-12-01' } });
    fireEvent.change(screen.getByTestId('start-time-picker').querySelector('input'), { target: { value: '10:00 AM' } });
    fireEvent.change(screen.getByTestId('end-time-picker').querySelector('input'), { target: { value: '12:00 PM' } });
    fireEvent.change(screen.getByTestId('registration-link-input').querySelector('input'), { target: { value: 'http://nus.edu.sg/openhouse' } });
    fireEvent.change(screen.getByTestId('organiser-input').querySelector('input'), { target: { value: 'NUS' } });
    fireEvent.change(screen.getByTestId('location-input').querySelector('input'), { target: { value: 'NUS Campus' } });
    fireEvent.change(screen.getByTestId('event-description-input').querySelector('textarea'), { target: { value: 'Join us for the NUS Open House to explore our campus and learn more about our programs.' } });

    // Mock the axios post response
    axios.post.mockResolvedValue({ data: {} });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.any(FormData));
      expect(mockNavigate).toHaveBeenCalledWith('../');
    });
  });
});
