// Email service simulation - In production, this would integrate with a real email service
export interface EmailData {
  name?: string;
  email: string;
  message?: string;
  type: 'contact' | 'newsletter';
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Log the email data for demonstration
  console.log('📧 Email would be sent to: muhammadhasib.me@gmail.com');
  console.log('📋 Email Data:', {
    to: 'muhammadhasib.me@gmail.com',
    subject: data.type === 'contact' 
      ? `Portfolio Contact: ${data.name}` 
      : 'New Newsletter Subscription',
    from: data.email,
    content: data.type === 'contact' 
      ? `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
      : `New newsletter subscription from: ${data.email}`,
    timestamp: new Date().toISOString()
  });
  
  // Simulate successful response
  return {
    success: true,
    message: data.type === 'contact' 
      ? 'Message sent successfully! You\'ll hear back soon.'
      : 'Successfully subscribed to the newsletter!'
  };
}

// Utility to validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}