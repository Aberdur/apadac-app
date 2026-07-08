export const calculateAge = (dateString: string | null | undefined): string => {
  if (!dateString) return "Edad no especificada";

  const birthDate = new Date(dateString);
  
  // Vérification si la date est valide
  if (isNaN(birthDate.getTime())) return "Edad no especificada";

  const today = new Date();
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    years--;
    months += 12;
  }

  if (years === 0) return `${months} meses`;
  return `${years} años y ${months} meses`;
};