import { useState, useEffect } from "react";
import { FaSignInAlt} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../Features/Auth/AuthSlice";
import Spinnner from "./Spinnner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, navigate,dispatch]);

  if(isLoading) return <Spinnner/>

  const handleOnChange = (e) => {
    setFormData((prev)=>({
      ...prev,[e.target.name]:e.target.value
    }))
  };
  const onSubmit = (e) =>{
    e.preventDefault()
    const userData={email,password}
    dispatch(login(userData))
  };
  
  return (
    <>
      <section className="heading">
        <h1 className="flex justify-center items-center gap-2">
          <FaSignInAlt />
          Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              name="email"
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              name="password"
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
         
          <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
