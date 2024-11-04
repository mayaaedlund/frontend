import { render, screen } from '@testing-library/react';
import TextEditor from './TextEditor';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('renders Titel label', () => {
  render(<TextEditor />);
  const LabelElement = screen.getByText(/titel/i);
  expect(LabelElement).toBeInTheDocument();
});

test('renders Innehåll label', () => {
    render(<TextEditor />);
    const LabelElement = screen.getByText("Innehåll");
    expect(LabelElement).toBeInTheDocument();
});

test("title variable gets value when text is entered", async () => {
    const inputValue = 'Hej';
    render(<TextEditor />);

    const user = userEvent.setup()

    const titleInput = screen.getByLabelText("Titel");

    console.log(titleInput);

    await user.type(titleInput, inputValue);

    expect(titleInput).toHaveValue(inputValue);
    const textContainers = screen.getAllByText(inputValue);

    console.log(textContainers);
})

test("content variable gets value when text is entered", async () => {
    const inputValue = 'Hopp';
    render(<TextEditor />);

    const user = userEvent.setup()

    const contentInput = screen.getByLabelText("Innehåll");

    console.log(contentInput);

    await user.type(contentInput, inputValue);

    expect(contentInput).toHaveValue(inputValue);
    
    const textContainers = screen.getAllByText(inputValue);

    console.log(textContainers);
})
