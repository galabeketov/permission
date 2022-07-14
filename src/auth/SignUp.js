import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    navigate("/");
  };
  return (
    <div className="container w-100 auth-wrapper d-flex align-items-center justify-content-center py-5">
      <div>
        <h1 className="text-center">Sign Up</h1>
        <form className="row mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-lg-12 col-md-10 col-sm-8 col-xs-6">
            <div>
              <div className="d-flex align-items-center flex-column gap-1">
                <div className="position-relative mb-3 d-flex">
                  <span className="input-group-text">
                    <HiOutlineUser />
                  </span>
                  <input
                    name="name"
                    id="name-sign-up"
                    type="text"
                    className="form-control auth-input"
                    placeholder="Enter your name*"
                    required
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="position-relative mb-3 d-flex">
                  <span className="input-group-text">
                    <HiOutlineUser />
                  </span>
                  <input
                    name="surrname"
                    id="surname-sign-up"
                    type="text"
                    className="form-control auth-input"
                    placeholder="Enter your surname*"
                    required
                    {...register("surname", { required: true })}
                  />
                </div>
                <div className="position-relative mb-3 d-flex">
                  <span className="input-group-text">
                    <AiOutlineMail />
                  </span>
                  <input
                    name="email"
                    id="email-sign-up"
                    type="email"
                    className="form-control auth-input"
                    placeholder="Enter your email*"
                    required
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="position-relative mb-3 d-flex">
                  <span className="input-group-text">
                    <RiLockPasswordLine />
                  </span>
                  <input
                    name="password"
                    id="password-sign-up"
                    type="password"
                    className="form-control auth-input"
                    placeholder="Enter your password*"
                    required
                    {...register("password", { required: true })}
                  />
                </div>
                <div className="position-relative mb-3 d-flex">
                  <div className="d-flex">
                    <button
                      type="submit"
                      href="javascript:void(0)"
                      className="btn btn-outline-dark auth-btn"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                <div className="position-relative mb-3 d-flex gap-2">
                  <p>Already have account? </p>{" "}
                  <p
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate("/sign-in")}
                  >
                    {" "}
                    Sign In
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
