document.addEventListener('DOMContentLoaded', () => {
    const helpIcon = document.querySelector('.help-icon');
    const tooltip = document.querySelector('.tooltip');
  
    if (helpIcon && tooltip) {
      helpIcon.addEventListener('mouseover', () => {
        (tooltip as HTMLElement).style.display = 'block';
      });
  
      helpIcon.addEventListener('mouseout', () => {
        (tooltip as HTMLElement).style.display = 'none';
      });
    }
  });
  