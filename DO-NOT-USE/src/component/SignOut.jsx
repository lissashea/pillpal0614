import { useNavigate } from 'react-router-dom';

function SignOut({ onSignOut }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    onSignOut();
    navigate('/');
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;
