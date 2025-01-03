# User Stories for Salary Calculator

## 1. User Story: Calculate Monthly, Annual, and Hourly Salaries

**As a** user,  
**I want to** input a monthly salary, annual salary, or hourly rate,  
**so that** I can calculate the other two salary formats (monthly, annual, hourly).

### Acceptance Criteria

- The form allows input for either monthly, annual, or hourly salary.
- The system calculates and displays the other two salary formats based on the input.
- All salary values are displayed in USD.

## 2. User Story: Convert Salary Values to Different Currencies

**As a** user,  
**I want to** select a currency for input and output,  
**so that** I can view the equivalent salary in a different currency based on real-time exchange rates.

### Acceptance Criteria

- There is a dropdown to select the "from" and "to" currencies.
- The system fetches the exchange rate using an API and updates the calculated salary values.
- The converted values are displayed alongside the original USD values.

## 3. User Story: Responsive and User-friendly Interface

**As a** user,  
**I want to** have a clean, intuitive UI,  
**so that** I can easily input salary data and view results without confusion.

### Acceptance Criteria

- The form layout is responsive and works well on mobile and desktop.
- The interface is simple and easy to navigate.
- Salary results are displayed clearly with proper formatting (e.g., USD currency).

## 4. User Story: Input Validation and Error Handling

**As a** user,  
**I want to** receive feedback when I input invalid or incomplete data,  
**so that** I can correct my input and get accurate results.

### Acceptance Criteria

- Input fields validate data (e.g., number input for salaries, currency selection).
- Error messages are displayed when invalid data is entered.
- Users are prompted to correct any errors before submitting the form.

## 5. User Story: Display Results in USD and Selected Currency

**As a** user,  
**I want to** see the salary values in USD and the selected currency,  
**so that** I can compare the values in my preferred currency.

### Acceptance Criteria

- Both USD and selected currency values are displayed for the monthly, annual, and hourly salaries.
