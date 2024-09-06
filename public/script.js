const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const paymentSection = document.getElementById('payment-section');
const ticketSection = document.getElementById('ticket-section');

async function getChatbotResponse(userText) {
  try {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: userText })
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error fetching response from backend:', error);
    return 'Sorry, I could not process your request.';
  }
}

async function sendMessage() {
  const userText = userInput.value;
  if (!userText) return;
  addMessage(userText, 'user-message');

  userInput.value = '';

  // Call OpenAI API to get the response
  const response = await getChatbotResponse(userText);
  addMessage(response, 'bot-message');

  // Example handling for different topics
  if (response.includes('booking')) {
    showPaymentOptions();
  }
}

function addMessage(text, className) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', className);
  messageDiv.textContent = text;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

function showPaymentOptions() {
  paymentSection.innerHTML = `
    <h3>Select Payment Method</h3>
    <button onclick="showUPI()">UPI</button>
    <button onclick="showCreditCard()">Credit Card</button>
  `;
  paymentSection.classList.remove('hidden');
}

function showUPI() {
  paymentSection.innerHTML = `
    <h3>UPI Payment</h3>
    <p>Scan this QR code to pay:</p>
    <img src="upi-qrcode-placeholder.png" alt="UPI QR Code" />
    <p>UPI ID: admin@upi</p>
  `;
}

function showCreditCard() {
  paymentSection.innerHTML = `
    <h3>Credit Card Payment</h3>
    <form id="credit-card-form">
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" required>
      <label for="expiryDate">Expiry Date:</label>
      <input type="text" id="expiryDate" required>
      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" required>
      <button type="submit">Pay</button>
    </form>
  `;
  document.getElementById('credit-card-form').addEventListener('submit', handleCreditCardPayment);
}

function handleCreditCardPayment(event) {
  event.preventDefault();
  // Process credit card payment (placeholder)
  alert('Payment processed.');
  showTicket();
}

function showTicket() {
  ticketSection.innerHTML = `
    <h3>Your Booking Ticket</h3>
    <p>Thank you for your booking! Your ticket details are as follows:</p>
    <img src="ticket-placeholder.png" alt="Booking Ticket">
  `;
  ticketSection.classList.remove('hidden');
}
