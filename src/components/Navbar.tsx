import "../styles/navbar.css"
import {Link} from "react-router-dom"
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"

export const Navbar = () => {
  const [User] = useAuthState(auth)

  const signUserOut = async () => {
    await signOut(auth)
  }
  return (
    <nav className="nav">
      <div className="links">
        <Link to="/">Home</Link>
        {!User ? <Link to="/login">Login</Link>:
        <Link to="/createpost">Create Post</Link>}
      </div>

      {User && 
      (
        <div className="details">
          <button onClick={signUserOut}>Sign Out</button>
          <div className="userDetails">
            {User?.displayName}
            <img 
              src={User?.photoURL || ""} 
              width="50" 
              height="50"
            />
          </div>
        </div>
      )}
    </nav>
  )
}