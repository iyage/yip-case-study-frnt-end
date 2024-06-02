import "./custom-info-window.scss";
import {
  FaRegUser,
  FaEnvelopeSquare,
  FaAddressBook,
  FaPhoneAlt,
  FaRoute,
} from "react-icons/fa";
function CustomInfoWindow({ info }) {
  return (
    <>
      <div className="info-window-container">
        <table>
          <tbody>
            <tr>
              <td>
                <span className="info-icon">
                  <span className="icon">
                    <FaRegUser />
                  </span>
                  <span className="desp">Name</span>
                </span>
              </td>
              <td className="info">{info.userName}</td>
            </tr>
            <tr>
              <td>
                <span className="info-icon">
                  <span className="icon">
                    <FaAddressBook />
                  </span>
                  <span className="desp">Address</span>
                </span>
              </td>
              <td className="info">{info.address}</td>
            </tr>
            <tr>
              <td>
                <span className="info-icon">
                  <span className="icon">
                    <FaEnvelopeSquare />
                  </span>
                  <span className="desp">Email</span>
                </span>
              </td>
              <td className="info">{info.email}</td>
            </tr>
            <tr>
              <td>
                <span className="info-icon">
                  <span className="icon">
                    <FaPhoneAlt />
                  </span>
                  <span className="desp">Pnone-number</span>
                </span>
              </td>
              <td className="info">{info.phoneNum}</td>
            </tr>
            <tr>
              <td>
                <span className="info-icon">
                  <span className="icon">
                    <FaRoute />
                  </span>
                  <span className="desp">Travel Distance</span>
                </span>
              </td>
              <td className="info">{info.distance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomInfoWindow;
