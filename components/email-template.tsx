import * as React from "react";

interface EmailTemplateProps {
  imageURl: string;
}

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  imageURl,
}) => (
  <div>
    <h1>Here is your image</h1>
    <img src={imageURl} alt="image" />
  </div>
);

export const ContactEmailTemplate: React.FC<
  Readonly<ContactEmailTemplateProps>
> = ({ name, email, message }) => (
  <div
    style={{
      border: "2px solid #4CAF50",
      padding: "20px",
      borderRadius: "10px",
      maxWidth: "600px",
      margin: "auto",
      backgroundColor: "#f0f8ff",
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <img src="https://ik.imagekit.io/hbzknb1hm/new-email.png?updatedAt=1720184652387" width={100} height={100} alt="email" style={{ display: "block", margin: "auto" }} />
    <h1 style={{ color: "#4CAF50", textAlign: "center" }}>
      You got a message from Contact Form
    </h1>
    <div style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#333" }}>Name: {name}</h2>
      <h2 style={{ color: "#333" }}>Email: {email}</h2>
      <h2 style={{ color: "#333" }}>Message: {message}</h2>
    </div>
  </div>
);