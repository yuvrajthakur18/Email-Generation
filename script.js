async function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get input values
    const lead_name = document.getElementById('leadName').value;
    const lead_company = document.getElementById('companyName').value;

    // Show loader and message
    const loaderContainer = document.getElementById('loaderContainer');
    loaderContainer.classList.remove('hidden');

    try {
        // // Step 1: Call the first API to get JSON data
        // const api1Response = await fetch('http://172.190.96.197:5000/api/leads/create', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ leadName, companyName }),
        // });

        // if (!api1Response.ok) throw new Error('Error fetching data from API 1');
        // const api1Data = await api1Response.json();

        // // Display the JSON data in the output section
        // document.getElementById('jsonOutput').textContent = JSON.stringify(api1Data, null, 2);

        // Step 2: Call the second API to generate the email using the data from API 1
        const api2Response = await fetch('/api/emails/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'lead_name': lead_name, 'lead_company': lead_company})
        });

        if (!api2Response.ok) throw new Error('Error fetching data from API 2');
        const api2Data = await api2Response.json();

        // Hide loader and display results
        loaderContainer.classList.add('hidden');

        // Display the generated email in the output section
        console.log(document.getElementById('emailOutput').textContent = api2Data.email);
        console.log(document.getElementById('jsonOutput').textContent = JSON.stringify(api2Data.lead_profile));
    } catch (error) {
        // Hide loader and show error
        loaderContainer.classList.add('hidden');
        // Handle errors gracefully
        console.error(error); 
        alert('An error occurred: ' + error.message);
    }
}
