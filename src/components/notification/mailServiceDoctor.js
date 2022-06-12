import React from "react";
import emailjs from "@emailjs/browser";
import { auth } from "../../config/firebase";

export default function MailServiceDoctor(docEmail, docName) {
  const serviceID = "service_cxg36ro";
  const templateID = "template_3tphqhr";
  const templateParams = {
    to_name: "",
    to_email: "",
  };
  const publicKey = "gEXC8iaHasOvrv8PV";

  templateParams.to_name = docName;
  templateParams.to_email = docEmail;
  setTimeout(mailHelper(), 2000);

  function mailHelper() {
    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (result) => {
        console.log("success", result.text);
        console.log(docName, docEmail);
      },
      (error) => {
        console.log("error", error.text);
      }
    );
  }
}
