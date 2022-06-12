import React from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@mui/material";
import { auth } from "../../config/firebase";

export default function MailService(formType) {
  const serviceID = "service_cxg36ro";
  const templateID = "template_6qy6ocr";
  const templateParams = {
    to_name: "",
    type: "",
    date: "",
    to_email: "",
  };
  const publicKey = "gEXC8iaHasOvrv8PV";

  var date = new Date();

  auth.onAuthStateChanged((user) => {
    if (user) {
      templateParams.to_name = user.displayName;
      templateParams.to_email = user.email;

      switch (formType) {
        case "day":
          templateParams.type = "diarios";
          templateParams.date = date.toLocaleDateString();
          break;
        case "week":
          templateParams.type = "semanales";
          date.setDate(date.getDate() + 7);
          templateParams.date = date.toLocaleDateString();
          break;
        case "month":
          templateParams.type = "mensuales";
          date.setDate(date.getDate() + 30);
          templateParams.date = date.toLocaleDateString();
          break;
      }
      setTimeout(mailHelper(), 2000);
    }
  });

  function mailHelper() {
    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (result) => {
        console.log("success", result.text);
      },
      (error) => {
        console.log("error", error.text);
      }
    );
  }
}
