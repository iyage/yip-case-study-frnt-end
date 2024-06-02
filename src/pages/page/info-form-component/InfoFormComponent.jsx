import { useEffect } from "react";
import "./info-form-component.scss";
import { useForm } from "react-hook-form";
import {
  FaRegUser,
  FaEnvelopeSquare,
  FaAddressBook,
  FaPhoneAlt,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";
function InfoFormComponent({ onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: { address: "", userName: "", phoneNum: "", email: "" },
  });
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ address: "", userName: "", phoneNum: "", email: "" });
    }
  }, [isSubmitSuccessful, reset, formState]);
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="info-form">
          <div className="form-input">
            <div className="inputs">
              <label htmlFor="user-name">Name</label>
              <div className="input-container" id="user-name">
                <div className="icon">
                  <FaRegUser />
                </div>
                <input
                  name="userName"
                  {...register("userName", { required: true })}
                  type="text"
                  placeholder="Enter full name"
                />
              </div>
            </div>

            {errors.email?.type === "required" && <p>This field is Required</p>}
          </div>
          <div className="form-input">
            <div className="inputs">
              <label htmlFor="address">Address</label>
              <div className="input-container" id="address">
                <div className="icon">
                  <FaAddressBook />
                </div>
                <input
                  name="address"
                  type="text"
                  placeholder="Enter address "
                  {...register("address", {
                    required: true,
                  })}
                />
              </div>
            </div>

            {errors.address?.type === "required" && (
              <p>This field is Required</p>
            )}
          </div>
          <div className="form-input">
            <div className="inputs">
              <label htmlFor="email">Email</label>
              <div className="input-container" id="email">
                <div className="icon">
                  <FaEnvelopeSquare />
                </div>
                <input
                  name="email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  type="text"
                  placeholder="Enter email-address "
                />
              </div>
            </div>
            {errors.email?.type === "required" && <p>This field is required</p>}
            {errors.email?.type === "pattern" && (
              <p>A valid email address is required</p>
            )}
          </div>
          <div className="form-input">
            <div className="inputs">
              <label htmlFor="phone-nos">Phone</label>
              <div className="input-container" id="phone-nos">
                <div className="icon">
                  <FaPhoneAlt />
                </div>
                <input
                  name="phoneNum"
                  {...register("phoneNum", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Enter phone-number "
                />
              </div>
            </div>

            {errors.phoneNum?.type === "required" && (
              <p>This field is required</p>
            )}
          </div>
          <div className="btn-container">
            <button disabled={isLoading}>
              {isLoading ? <ClipLoader color="#fff" size={14} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default InfoFormComponent;
