import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(result.user.displayName);
    } catch (error) {
      console.error('Erro during sign in:', error);
    }
    navigate('/');
  };
  return (
    <div>
      <p>Sign In With Google To Continue.</p>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
  );
};
