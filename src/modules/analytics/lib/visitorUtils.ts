export function generateVisitorId(): string {
  if (typeof window === 'undefined') {
    return 'server-' + Date.now();
  }

  // Try to get existing visitor ID from localStorage
  const existingId = localStorage.getItem('visitor_id');
  if (existingId) {
    return existingId;
  }

  // Generate new visitor ID
  const visitorId = 'visitor-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('visitor_id', visitorId);
  
  return visitorId;
}


