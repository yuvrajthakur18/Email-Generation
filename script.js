async function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get input values
    const lead_name = document.getElementById('leadName').value;
    const lead_company = document.getElementById('companyName').value;

    // Show loader and message
    const loaderContainer = document.getElementById('loaderContainer');
    loaderContainer.classList.remove('hidden');

    try {
        const api2Response = await fetch('/api/emails/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'lead_name': lead_name, 'lead_company': lead_company})
        });
    
        if (!api2Response.ok) {
            const errorText = await api2Response.text();  // Capture the error response body
            throw new Error(`Error fetching data from API 2: ${errorText}`);
        }
        const api2Data = await api2Response.json();
    
        // Hide loader and display results
        loaderContainer.classList.add('hidden');
    
        // Display the generated email in the output section
        document.getElementById('emailOutput').textContent = api2Data.email;
        document.getElementById('jsonOutput').textContent = JSON.stringify(api2Data.lead_profile);
    
    } catch (error) {
        console.error(error);  // Log the error for debugging
        loaderContainer.classList.add('hidden');  // Hide loader in case of error
    }
    
}
