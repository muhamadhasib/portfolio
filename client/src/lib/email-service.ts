// Email service that sends data to backend API for proper email handling
export interface EmailData {
  name?: string;
  email: string;
  message?: string;
  type: 'contact' | 'newsletter';
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    const endpoint = data.type === 'contact' ? '/api/contact' : '/api/newsletter';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.type === 'contact' 
        ? { name: data.name, email: data.email, message: data.message }
        : { email: data.email }
      ),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Log the successful submission for demonstration
    console.log('📧 Form submitted successfully to backend');
    console.log('📋 Data saved to database:', {
      type: data.type,
      email: data.email,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: true,
      message: data.type === 'contact' 
        ? 'Your message has been sent successfully! I\'ll get back to you soon.' 
        : 'Successfully subscribed to the newsletter! Welcome aboard.'
    };
  } catch (error) {
    console.error('Email service error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to send message. Please try again.'
    );
  }
}

// Utility to validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}