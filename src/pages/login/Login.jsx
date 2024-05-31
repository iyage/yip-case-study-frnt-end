import React, { useEffect, useState } from "react";
import "./login.scss";
import { FaLock, FaRegEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { authenticate } from "../../utils/apis/api";
import { ClipLoader } from "react-spinners";
import { Navigate } from "react-router-dom";

function Login() {
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: "", password: "" });
    }
  }, [isSubmitSuccessful, reset, formState]);

  async function onsubmit(data) {
    setIsloading(true);
    try {
      const resp = await authenticate(data);
      sessionStorage.setItem("auth", true);
      sessionStorage.setItem("user", JSON.stringify(resp.data.user));
      sessionStorage.setItem("token", resp.data.accessToken);
      setIsloading(false);
      setErrMsg("");
    } catch (error) {
      setIsloading(false);
      console.log(error);
      if (error.code !== "ERR_NETWORK") {
        console.log(error.response);
        setErrMsg(`Error: ${error.response.data}`);
      } else {
        setErrMsg("Please Check Your Network");
      }
    }
  }

  return !sessionStorage.getItem("auth") ? (
    <div className="login-container">
      <div className="login-wrapper">
        <form onSubmit={handleSubmit(onsubmit)}>
          <p className="err-msg">{errMsg}</p>
          <div className="form-input">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <span className="icon">
                <FaRegEnvelope />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter registered email address"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            {errors.email?.type === "required" && <p>This field is required</p>}
            {errors.email?.type === "pattern" && (
              <p>A valid email address is required</p>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <span className="icon">
                <FaLock />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password?.type === "required" && (
              <p>This field is required</p>
            )}
          </div>
          <div className="form-input">
            <button disabled={isLoading}>
              {isLoading ? <ClipLoader color="#fff" size={14} /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to={"/page"} />
  );
}

export default Login;
