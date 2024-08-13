document.getElementById('questionnaire-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Helper function to get selected values from checkboxes
    function getCheckboxValues(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value);
    }

    // Gather responses
    const responses = {
        publicServicesSatisfaction: getCheckboxValues('publicServicesSatisfaction'),
        delaysIssues: getCheckboxValues('delaysIssues'),
        infrastructureCondition: getCheckboxValues('infrastructureCondition'),
        infrastructureProjects: getCheckboxValues('infrastructureProjects'),
        safetySecurity: getCheckboxValues('safetySecurity'),
        nationalDefenseSatisfaction: getCheckboxValues('nationalDefenseSatisfaction'),
        legalSystem: getCheckboxValues('legalSystem'),
        lawEnforcementSatisfaction: getCheckboxValues('lawEnforcementSatisfaction'),
        socialWelfareSupport: getCheckboxValues('socialWelfareSupport'),
        socialWelfareEffectiveness: getCheckboxValues('socialWelfareEffectiveness'),
        economicPolicies: getCheckboxValues('economicPolicies'),
        economicHardship: getCheckboxValues('economicHardship'),
        transparency: getCheckboxValues('transparency'),
        accountability: getCheckboxValues('accountability'),
        additionalComments: document.getElementById('additionalComments').value
    };

    // Analyze results to determine if the government has done a justifiable job
    let positiveResponses = 0;
    let negativeResponses = 0;

    // Count positive and negative responses based on checkboxes
    for (const [question, answer] of Object.entries(responses)) {
        if (Array.isArray(answer)) {
            answer.forEach(value => {
                if (value === 'Yes' || value === 'Good' || value === 'Satisfied') {
                    positiveResponses++;
                } else if (value === 'No' || value === 'Bad' || value === 'Dissatisfied') {
                    negativeResponses++;
                }
            });
        }
    }

    // Determine the result based on the analysis
    let suggestionText = '';

    if (positiveResponses >= negativeResponses) {
        suggestionText = `
            <div class="suggestion positive p-3 mb-3 bg-success text-white rounded">
                <h2>Good Governance Observed!</h2>
                <p>Based on your responses, it seems that the government has largely fulfilled its responsibilities.</p>
                <p>Paying taxes is an important civic duty that helps fund essential public services and infrastructure. We encourage you to continue fulfilling this obligation, as it contributes to the further development and welfare of the nation.</p>
            </div>
        `;
    } else {
        suggestionText = `
            <div class="suggestion negative p-3 mb-3 bg-warning text-dark rounded">
                <h2>Concerns About Governance and Corruption</h2>
                <p>Your responses suggest that there are serious areas where the government has not effectively met its responsibilities, possibly due to issues such as mismanagement or corruption.</p>
                <p>While paying taxes is a civic duty, it's reasonable to question whether your contributions are being used wisely and transparently. In situations where there is clear evidence of corruption or misallocation of funds, it’s important to raise these issues through proper channels, such as contacting your representatives, supporting anti-corruption initiatives, or joining advocacy groups.</p>
                <p>Considering the importance of transparency and accountability in governance, you may want to weigh your decision carefully regarding your tax contributions until these issues are addressed.</p>
            </div>
        `;
    }

    // Add buttons for navigation
    suggestionText += `
        <div class="text-center mt-4">
            <button class="btn btn-primary mr-2" onclick="window.location.href='index.html'">Go Back</button>
            <button class="btn btn-secondary" onclick="window.location.reload()">Back to Form</button>
        </div>
    `;

    // Clear the form contents and replace with the suggestion
    const formContainer = document.getElementById('questionnaire-form').parentNode;
    formContainer.innerHTML = suggestionText;
});
