// Function to check phishing URL
async function checkPhishingUrl() {
    const url = document.getElementById('url').value;
    const resultMessage = document.getElementById('resultMessage');
    const resultDiv = document.getElementById('result');

    if (!url) {
        resultMessage.textContent = 'Please enter a URL.';
        resultDiv.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('/api/check-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        if (data.isPhishing) {
            resultMessage.textContent = 'Warning: This is a phishing site!';
            resultDiv.style.backgroundColor = '#ffebee'; // light red
            resultMessage.style.color = '#f44336';
        } else {
            resultMessage.textContent = 'Safe: This is a legitimate site.';
            resultDiv.style.backgroundColor = '#e8f5e9'; // light green
            resultMessage.style.color = '#4CAF50';
        }
        resultDiv.style.display = 'block';
    } catch (error) {
        resultMessage.textContent = 'Error checking URL. Please try again later.';
        resultDiv.style.display = 'block';
    }
}

// Function to redirect to the report page
function redirectToReportPage() {
    // Adjust the path if the report.html is in a different folder
    window.location.href = 'report.html';
}
