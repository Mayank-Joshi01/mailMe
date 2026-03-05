/**
 * Generates a clean HTML table from a dynamic object
 */
const formatDataToHTML = (data) => {
    return Object.entries(data)
        .map(([key, value]) => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #666; font-weight: bold; text-transform: capitalize; width: 30%;">
                    ${key.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">
                    ${value}
                </td>
            </tr>
        `).join('');
};

/**
 * Returns the full styled Email Template
 */
const getSubmissionEmailTemplate = (projectName, formData) => {
    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
        <div style="background: #4F46E5; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">New Submission: ${projectName}</h2>
        </div>
        <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
                ${formatDataToHTML(formData)}
            </table>
        </div>
        <div style="background: #f9fafb; padding: 10px; text-align: center; color: #999; font-size: 12px;">
            Sent on ${new Date().toLocaleDateString()}
        </div>
    </div>`;
};

module.exports = { getSubmissionEmailTemplate };