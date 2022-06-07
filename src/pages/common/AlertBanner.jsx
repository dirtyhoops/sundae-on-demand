import Alert from 'react-bootstrap/Alert';

export default function AlertBanner({ message, variant }) {
  const alertMessage =
    message || 'An unexpected error occured. Please try again.';
  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ background: 'red' }}>
      {alertMessage}
    </Alert>
  );
}
