export const formatDate = (dateString?: Date) => (dateString ? new Date(dateString).toLocaleDateString() : 'N/A');
