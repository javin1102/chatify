import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDUO-8_q7RgmrpxZZyvCKoOLFwL7mpyyqs",
  authDomain: "chatify-b880c.firebaseapp.com",
  projectId: "chatify-b880c",
  storageBucket: "chatify-b880c.appspot.com",
  messagingSenderId: "1028625458836",
  appId: "1:1028625458836:web:fecbd2be876b386ed43681",
  measurementId: "G-ZQ0NHNCRNZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const jwtkey1 =
  "-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIXe+HHY7OmqowDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAxMmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjEx\nMTI0MDkzODM2WhcNMjExMjEwMjE1MzM2WjAxMS8wLQYDVQQDEyZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBAKN6OpsW4EQT8d/d6b6BqfDiyBGuYOmrNrnmuV8cPJ4XS8gx\nLNA4MEUERR8QUBmziDhywwwcbi+MwVhdXPjPMtcl8/ek4jBdXW9t3/ut6Ykli3mj\nXbA0Nbgh8pzmEn7GeG3F7z53MUNbdGuA0GstcZ+0SmSWn5oX3zgpFcMz5WKNW6y8\nonT8PIhhpfTkKyDwI3MzXzhrbu//7ly8bNUT9z3hSen1jc9F9L844yOVtbx9j9pD\n/4rxm7Ae6JXTetpVbIbQ5kIpJnxRmAlvu2VcrjO7QPDNh4IQ3WQXKkG9Dw/z+7uX\nEJjwhOUnGbeJ2hX28VwtB5RzUoIvd2Qe13i2pmsCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAAg6rYvMKWLFp0GxM/dvW2Uclz274cOL6k8S3NQ/FAzw\nBdXU4VfxLGfjSOtnDXD5axMidLwPnIZ7k3e+oZOozcq+Q6JK3HLuPc/rbao/xfWi\nxcRdX3GfCf4pzVIoCsW9vPbEzrnfvZj8cQVpkxokFQDRyJIMd6KK+7RTgQYP52fw\njIGqsKBp65MExmYCIMiD7mEvgFoVCR/xT/A+Tbq8gNTy8ZdEc0EkI5Yl0VKka8Uo\nTfFDWblJ0p89a2IVEsPt65MKmtmjghGzGu5tHeXPiVtezApR52BhQnzu0Jg49b0H\nyoqssYP4iaXExTiAbuitfGaIxj9epWsm6b1MYoyiHJY=\n-----END CERTIFICATE-----\n";
