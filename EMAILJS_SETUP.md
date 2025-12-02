# EmailJS Setup Instructions

To enable the contact form to send emails directly to flux.solution929@gmail.com, you need to set up an EmailJS account and configure the service.

## Steps to Set Up EmailJS:

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Create an Email Service**
   - In your EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Connect your email account (flux.solution929@gmail.com)
   - Note the Service ID for later use

3. **Create an Email Template**
   - In your EmailJS dashboard, go to "Email Templates"
   - Click "Create New Template"
   - Set up your template with the following:
     - Subject: `{{subject}}`
     - Body:
       ```
       You've received a new message from your website contact form.
       
       Name: {{from_name}}
       Email: {{from_email}}
       
       Message:
       {{message}}
       ```
   - Note the Template ID for later use

4. **Get Your Public Key**
   - In your EmailJS dashboard, go to "Account" -> "API Keys"
   - Copy your Public Key

5. **Update Your Environment Variables**
   - Open the `.env` file in your project
   - Replace the placeholder values with your actual EmailJS credentials:
     ```
     VITE_EMAILJS_SERVICE_ID=your_actual_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
     ```

6. **Test the Contact Form**
   - Restart your development server
   - Fill out the contact form and submit
   - Check flux.solution929@gmail.com for the received message

## Troubleshooting:

- If emails are not being sent, check the browser console for error messages
- Ensure all environment variables are correctly set
- Verify your EmailJS account is properly configured and connected to your email provider
- Make sure you're using the correct Service ID and Template ID

## Security Note:

Never commit your actual EmailJS credentials to version control. The `.env` file is already included in `.gitignore` to prevent this.